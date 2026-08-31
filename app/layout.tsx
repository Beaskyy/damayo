import type { Metadata } from "next";
import { Great_Vibes } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Wedding Oyindamola & Ayomide",
  description:
    "The families of Oyeyinka and Adams-Kilani invite you to the wedding ceremony of their children, Oyindamola & Ayomide.",
  other: {
    google: "notranslate",
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
      className="light"
      translate="no"
      style={{ colorScheme: "light only" }}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/xoc5iak.css" />
        <meta name="google" content="notranslate" />
      </head>
      <body className={`${greatVibes.variable} min-h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
