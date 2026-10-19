import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Variable names match the ones used in globals.css
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novair.example"), // TODO: your real domain
  title: {
    default: "NOVAIR Aura | Fresh. Modern. Yours.",
    template: "%s | NOVAIR",
  },
  description:
    "NOVAIR Aura: a fragrance of bergamot, mandarin, jasmine, musk and cedar. Explore the full NOVAIR collection and order on WhatsApp.",
  openGraph: {
    title: "NOVAIR Aura | Fresh. Modern. Yours.",
    description:
      "Bergamot, mandarin, jasmine, musk and cedar. Explore the NOVAIR collection.",
    siteName: "NOVAIR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVAIR Aura | Fresh. Modern. Yours.",
    description: "Explore the NOVAIR fragrance collection.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf6ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}