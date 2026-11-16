import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Outfit, Cairo, Inter } from "next/font/google";
import { I18nProvider } from "../providers";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Moanas } from "../fonts";
import { getMessages } from "@/lib/i18n-server";
import { isLocale, locales } from "@/lib/locales";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});
const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://moanacafes.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const meta = getMessages(locale).meta;
  const ogLocale = locale === "ar" ? "ar_EG" : "en_US";
  const alternateLocale = locale === "ar" ? "en_US" : "ar_EG";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.title,
      template: "%s | Moana Café",
    },
    description: meta.description,
    keywords: meta.keywords.split(/[,،]/).map((keyword) => keyword.trim()),
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
      locale: ogLocale,
      alternateLocale,
      url: `${siteUrl}/${locale}`,
      siteName: "Moana Café",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: "Moana Café",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${siteUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
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
}

export const viewport: Viewport = {
  themeColor: "#3E2723",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(
        Moanas.variable,
        outfit.variable,
        cairo.variable,
        "font-sans",
        inter.variable,
      )}
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
          <I18nProvider initialLanguage={locale}>{children}</I18nProvider>
        </main>
      </body>
    </html>
  );
}
