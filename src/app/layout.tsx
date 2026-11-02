import type { Metadata } from "next";
import { Bricolage_Grotesque, Hind_Siliguri } from "next/font/google";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import WelcomeToast from "@/components/WelcomeToast";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
});

const body = Hind_Siliguri({
  variable: "--font-body",
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Parabondhu | Community events near you",
  description: "Create, join and track social service events in your neighbourhood.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Suspense fallback={null}>
            <WelcomeToast />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
