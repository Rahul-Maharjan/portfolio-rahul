import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { QueryProvider } from "@/lib/query-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Rahul Maharjan | Frontend Developer & UI/UX Designer",
    template: "%s | Rahul Maharjan",
  },

  description:
    "Rahul Maharjan is a Frontend Developer and UI/UX Designer from Nepal specializing in React, JavaScript, Tailwind CSS, responsive web development, and modern user experiences.",

  keywords: [
    "Rahul Maharjan",
    "Frontend Developer Nepal",
    "UI/UX Designer Nepal",
    "React Developer",
    "JavaScript Developer",
    "Next.js Developer",
    "Tailwind CSS",
    "Web Developer Nepal",
    "UI UX Designer",
    "Frontend Developer Portfolio",
  ],

  authors: [
    {
      name: "Rahul Maharjan",
    },
  ],

  creator: "Rahul Maharjan",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Rahul Maharjan | Frontend Developer & UI/UX Designer",
    description:
      "Explore Rahul Maharjan's portfolio featuring modern web development projects, React applications, UI/UX designs, and creative digital experiences.",
    siteName: "Rahul Maharjan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rahul Maharjan Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rahul Maharjan | Frontend Developer & UI/UX Designer",
    description:
      "Frontend Developer and UI/UX Designer specializing in React, Next.js, JavaScript, Tailwind CSS, and modern web experiences.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
