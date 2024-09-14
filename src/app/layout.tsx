import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import icon from "../../public/favicon.ico"

const jost = Jost({
  weight: ['300', '500'],
  subsets: ['latin']
})


export const metadata: Metadata = {
  title: "Glance",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
  },
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
