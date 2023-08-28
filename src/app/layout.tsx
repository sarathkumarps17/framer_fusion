import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import Providers from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";

const lato = Lato({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "FrameFusion",
  description:
    "We are an online store specializing in premium wall paintings and frames that are meticulously curated to elevate your home or office décor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
