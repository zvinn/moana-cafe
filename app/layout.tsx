import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Outfit, Cairo, Inter } from "next/font/google";
import { I18nProvider } from "./providers";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Moanas } from "./fonts";
import Image from "next/image";
const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Moana Café",
  description: "Experience authentic flavors at Moana Café",
  openGraph:{
    title: "Moana Café",
    description: "Experience authentic flavors at Moana Café",
    url: "https://moanacafes.com",
    siteName: "Moana Café",
    images: [{
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    }],
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value === "ar" ? "ar" : "en";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={cn(Moanas.variable, outfit.variable, cairo.variable, "font-sans", inter.variable )}
    >
      <body className="">
      <Image src={"/BGs/main.webp"} alt="Moana main background" className="fixed w-full h-full bottom-0 top-0 right-0 left-0 object-cover object-center -z-1" width={1920} height={1080}/>
        <main className="bg-background/20"><I18nProvider initialLanguage={lang}>{children}</I18nProvider></main>
      </body>
    </html>
  );
}
