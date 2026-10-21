import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://evap-onestop.vercel.app";
const TITLE = "Vape One Stop Distribution — Retail & Wholesale";
const DESCRIPTION =
  "Every shelf, stocked. One stop. Disposables, pods, devices and e-liquids — buy on Shopee or join our wholesale group. Nationwide delivery. 21+ only.";

// opengraph-image.jpg and twitter-image.jpg in this folder supply the share image.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Vape One Stop Distribution",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0c14",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("vosd-age21-ok")==="1")document.documentElement.dataset.age="ok"}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
