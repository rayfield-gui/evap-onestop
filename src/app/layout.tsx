import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vape One Stop Distribution — Wholesale Catalog",
  description:
    "Wholesale vape distribution for retailers and smoke shops. Disposables, pod systems, e-liquids and hardware, shipped nationwide. Adults 21+ only.",
  openGraph: {
    title: "Vape One Stop Distribution",
    description: "Every shelf, stocked. One stop.",
    type: "website",
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
