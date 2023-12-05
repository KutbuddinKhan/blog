import Stripe from "stripe";
import { headers } from "next/headers";
import { buffer } from "node:stream/consumers";
import { createSupabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SK_KEY!);

const endpointSecret = process.env.ENDPOINT_SECRET!;

export async function POST(req: any) {
  const rawBody = await buffer(req.body);
  let event;

  try {
    const sig = headers().get("stripe-signature");

    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err: any) {
    return Response.json({ error: "webhook error" + err?.message });
  }

  switch (event.type) {
    case "customer.updated":
      const customer = event.data.object;
      const subscription = await stripe.subscriptions.list({
        customer: customer.id,
      });
      if (subscription.data.length) {
        const sub = subscription.data[0];
        // call to supabase to user table
        const { error } = await onSuccessSubscription(
          sub.status === "active",
          sub.id,
          customer.id,
          customer.email!
        );

        if (error?.message) {
          return Response.json({ error:"Unable to subscription" + error.message });
        }
      }
      break;

    case "customer.subscription.deleted":
      const deletedSub = event.data.object;
      const {error } = await onCancelSubscription(false, deletedSub.id)

      if (error?.message) {
        return Response.json({ error: "Fail to cancel subsciription" +error.message });
      }

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return Response.json({});
}

const onCancelSubscription = async (
  subscription_status: boolean,
  sub_id: string
) => {
  const supabaseAdmin = await createSupabaseAdmin();
  return await supabaseAdmin
    .from("users")
    .update({
      stripe_subscription_id: null,
      stripe_customer_id: null,
      subscription_status,
    })
    .eq("stripe_subscription_id", sub_id);
};

const onSuccessSubscription = async (
  subscription_status: boolean,
  stripe_subscription_id: string,
  stripe_customer_id: string,
  email: string
) => {
  const supabaseAdmin = await createSupabaseAdmin();

  return supabaseAdmin
    .from("users")
    .update({
      subscription_status,
      stripe_subscription_id,
      stripe_customer_id,
    })
    .eq("email", email);
};
