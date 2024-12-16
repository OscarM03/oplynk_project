import type { Metadata } from "next";
import Header from "@/components/navbar/Header";
import MobileNav from "@/components/navbar/MobileNav";
import { Poppins } from 'next/font/google'
import "./globals.css";
import SignUpModal from "@/components/modals/SignUpModal";
import LoginModal from "@/components/modals/LoginModal";
import Footer from "@/components/footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "Oplynk",
  description: "Connecting Ideas, Building Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        <Header />
        <MobileNav />
        <div className="min-h-[100vh]">
          {children}
        </div>
        <SignUpModal />
        <LoginModal />
        <Footer />
      </body>
    </html>
  );
}
