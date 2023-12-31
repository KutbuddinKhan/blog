"use server";

import { createServerClient } from "@supabase/ssr";
import { BlogFormSchemaType } from "@/app/dashboard/schema";
import { cookies } from "next/headers";
import { Database } from "../types/supabase";
import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "../supabase";

const DASHBOARD = "/dashboard";

// const supabase = createServerClient<Database>(

//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   {
//     cookies: {
//       get(name: string) {
//         return cookieStore.get(name)?.value;
//       },
//     },
//   }
// );

export async function createBlog(data: BlogFormSchemaType) {
  const supabase = await createSupabaseServer();

  const { ["content"]: excludedKey, ...blog } = data;

  const resultBlog = await supabase
    .from("blog")
    .insert(blog)
    .select("id")
    .single();

  if (resultBlog.error) {
    return JSON.stringify(resultBlog);
  } else {
    const result = await supabase
      .from("blog_content")
      .insert({ blog_id: resultBlog.data.id!, content: data.content });

    revalidatePath(DASHBOARD)

    return JSON.stringify(result);
  }
}

export async function readBlog() {
  const supabase = await createSupabaseServer();

  return supabase
    .from("blog")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });
}

export async function readBlogAdmin() {
  const supabase = await createSupabaseServer();

  return supabase
    .from("blog")
    .select("*")
    .order("created_at", { ascending: true });
}

export async function deleteBlogById(blogId: string) {
  const supabase = await createSupabaseServer();

  const result = await supabase.from("blog").delete().eq("id", blogId);

  revalidatePath(DASHBOARD);

  return JSON.stringify(result);
}

export async function updateBlogById(blogId: string, data: BlogFormSchemaType) {
  const supabase = await createSupabaseServer();

  const result = await supabase.from("blog").update(data).eq("id", blogId);

  revalidatePath(DASHBOARD);
  revalidatePath("/blog/" + blogId)
  return JSON.stringify(result);
}

export async function readBlogContentById(blogId: string) {
  const supabase = await createSupabaseServer();

  return supabase
    .from("blog")
    .select("*, blog_content(*)")
    .eq("id", blogId)
    .single();
}

export async function updateBlogDetailById(
  blogId: string,
  data: BlogFormSchemaType
) {
  const supabase = await createSupabaseServer();
  const { ["content"]: excludedKey, ...blog} = data

  const resultBlog = await supabase
    .from("blog")
    .update(blog)
    .eq("id", blogId);
  if (resultBlog.error) {
    return JSON.stringify(resultBlog);
  } else {
    const result = await supabase
      .from("blog_content")
      .update({ content: data.content })
      .eq("blog_id", blogId);

    revalidatePath(DASHBOARD);
    revalidatePath("/blog/" + blogId);
    return JSON.stringify(result);
  }
}
