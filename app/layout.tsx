import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/nav/Navbar'
import { Toaster } from '@/components/ui/toaster'
import SessisonProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL!),
  title: {
    template: "%s | Daily Blog",
    default: "Daily Blog",
  },
  description: 'Explore a world of captivating stories and insightful articles on our blog. From the latest trends to in-depth analyses, our blog covers a wide range of topics to keep you informed and entertained. Join our community of readers and discover thought-provoking content that sparks curiosity and fosters discussion. Stay updated with our diverse collection of blog posts, written by passionate contributors who share their expertise and unique perspectives. Engage with a platform that goes beyond the ordinary, providing you with enriching content that resonates with your interests.',
  openGraph: {
    title: "Daily blog",
    url: process.env.SITE_URL,
    siteName: "Daily blog",
    images: "/og.png",
    type: "website"
  },
  keywords: ["Daily blog", "Daily coding"]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className='max-w-7xl mx-auto p-10 space-y-10'>
          <Navbar />
          {children}
          </main>

          <Toaster />
        </ThemeProvider>
        <SessisonProvider />
      </body>
    </html>
  )
}
