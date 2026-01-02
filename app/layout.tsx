import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedback Form",
  description: "We value your feedback. Please share your thoughts with us.",
  icons: {
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    apple: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
