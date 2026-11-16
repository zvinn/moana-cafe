import phoneNumbers from "@/utils/phoneNumbers";
import type { Lang } from "@/lib/i18n-server";
import { MENU_PDF_PATH } from "@/content/menu";

export function JsonLd({ lang }: { lang: Lang }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://moana-cafe-master.vercel.app";
  const phoneNumber = phoneNumbers[0] || "+201552277001";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Moana Café",
    url: `${siteUrl}/${lang}`,
    inLanguage: lang,
    telephone: phoneNumber,
    email: "hello@moanacafes.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Street 9 with 8, Bianchi, Al Bitash",
      addressLocality: "Agami",
      addressRegion: "Alexandria Governorate",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.1256434,
      longitude: 29.7748929,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      "https://www.instagram.com/moana_cafe_eg",
      "https://www.facebook.com/moanacafe.eg",
      "https://www.tiktok.com/@moana.cafe",
    ],
    servesCuisine: ["Coffee", "Desserts", "Beverages", "Middle Eastern"],
    priceRange: "$$",
    hasMenu: `${siteUrl}${MENU_PDF_PATH}`,
    image: `${siteUrl}/og-image.png`,
    description:
      lang === "ar"
        ? "مرحباً بكم في موانا كافيه، مكان هادئ على شاطئ البحر يقدم أجود أنواع القهوة والمخبوزات وإطلالات المحيط."
        : "Welcome to Moana Café, a serene seaside spot offering the finest coffee, pastries, and ocean views.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
