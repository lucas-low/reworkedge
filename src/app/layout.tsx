import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import DarkModeToggle from "@/components/DarkModeToggle";
import SearchBar from "@/components/SearchBar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "My Rubber Duck Blog",
    template: "%s | My Rubber Duck Blog",
  },
  description: "A place for ducking",
  openGraph: {
    title: "My Rubber Duck Blog",
    description: "A place for ducking",
    url: "https://reworkedge.com",
    siteName: "My Rubber Duck Blog",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "My Rubber Duck Blog",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="bg-neutral-50 dark:bg-gray-900 flex-grow">
            <header className="bg-neutral-100 dark:bg-gray-800 shadow">
              <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16">
                  <div className="flex items-center w-full sm:w-auto">
                    <Link
                      href="/"
                      className="flex-shrink-0 text-2xl font-bold text-gray-700 dark:text-white mr-4"
                    >
                      My Rubber Duck Blog
                    </Link>
                    <div className="ml-auto sm:ml-0">
                      <DarkModeToggle />
                    </div>
                  </div>
                  <div className="w-full sm:w-64 mt-4 sm:mt-0">
                    <SearchBar />
                  </div>
                </div>
              </nav>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-gray-700 dark:text-gray-100">
              {children}
            </main>
          </div>
          <footer className="bg-neutral-100 dark:bg-gray-800 shadow mt-auto">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                © 2024 My Rubber Duck Blog. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
