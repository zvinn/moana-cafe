import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Outfit, Cairo, Inter } from "next/font/google";
import { I18nProvider } from "./providers";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Moanas } from "./fonts";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moana-cafe-master.vercel.app";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Moana Café",
    template: "%s | Moana Café",
  },
  description: "Experience authentic flavors at Moana Café",
  keywords: [
    "Moana",
    "Café",
    "Coffee",
    "Seaside",
    "Ocean",
    "Relax",
    "Pastries",
    "Bianchi",
    "moana",
    "agami",
    "hidden gem",
    "spot",
    "caffe",
  ],
  authors: [{ name: "Moana Café" }],
  creator: "Moana Café",
  publisher: "Moana Café",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_EG",
    url: siteUrl,
    siteName: "Moana Café",
    title: "Moana Café",
    description: "Experience authentic flavors at Moana Café",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1898,
        height: 1078,
        alt: "Moana Café",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moana Café",
    description: "Experience authentic flavors at Moana Café",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#3E2723",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang");
  const lang = langCookie?.value === "ar" ? "ar" : "en";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={cn(Moanas.variable, outfit.variable, cairo.variable, "font-sans", inter.variable )}
    >
      <body className="">
        <div
          className="fixed inset-0 -z-10"
          aria-hidden="true"
          style={{
            backgroundImage: "url('/BGs/main.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <main className="bg-background/20 relative z-0">
          <I18nProvider initialLanguage={lang}>{children}</I18nProvider>
        </main>
      </body>
    </html>
  );
}
