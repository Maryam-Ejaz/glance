import type { Metadata } from "next";
import localFont from "next/font/local";
import {Jost} from "next/font/google";
import "./globals.css";
import Header from "./header";

const jost = Jost({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Glance",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.style.fontFamily} antialiased`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
