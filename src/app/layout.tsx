import type { Metadata } from "next";
import {Jost} from "next/font/google";
import "./globals.css";

const jost = Jost({ 
  weight: ['300','500'],
  subsets: ['latin'] })


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
        className={`${jost.className}`}
      >
        {children}
      </body>
    </html>
  );
}
