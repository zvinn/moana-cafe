"use client";

import { FileText, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  menuCategories,
  menuCategoriesAr,
  MENU_PDF_PATH,
  type MenuCategory,
} from "@/content/menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Menu() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const categories: MenuCategory[] = lang === "ar" ? menuCategoriesAr : menuCategories;

  const handleShare = async () => {
    const url = `${window.location.origin}${MENU_PDF_PATH}`;

    if (!navigator.share) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    try {
      await navigator.share({
        title: "Moana Café",
        text: "Check out Moana Café menu 🌊☕",
        url,
      });
    } catch {
      // User cancelled sharing
    }
  };

  const currency = lang === "ar" ? "جنيه مصري" : "EGP";

  return (
    <section
      className="py-20 md:py-28 bg-surface bg-[url('/BGs/menu-bg.webp')] bg-no-repeat bg-left-bottom bg-cover"
      id="menu"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {t("menu.title")}
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto mt-4 font-medium">
            {t("menu.subtitle")}
          </p>
        </div>
        <div className="flex gap-6 justify-center items-center mb-12">
          <Link
            href={MENU_PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="text-background group relative flex gap-3 px-8 py-4 bg-primary/90 rounded-full hover:bg-primary/80 transition font-semibold shadow-md"
          >
            <FileText />
            {t("menu.view_menu_file")}
          </Link>
          <button
            type="button"
            onClick={handleShare}
            aria-label={t("menu.share_menu")}
            title={t("menu.share_menu")}
            className="p-2 rounded-full text-primary hover:bg-primary/10 transition-colors"
          >
            <Share2 />
          </button>
        </div>

        <Tabs key={lang} defaultValue="0">
          <div className="sticky top-[92px] z-30 -mx-6 md:-mx-12 mb-8 border-y border-primary/10 bg-surface/95 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6 md:px-12 py-2">
              <TabsList
                aria-label={t("menu.title")}
                className="w-full flex-nowrap justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {categories.map((category, index) => (
                  <TabsTrigger
                    key={category.title}
                    value={String(index)}
                    className="flex-none border-primary/20 bg-background/70 px-4 py-2 hover:bg-background"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          {categories.map((category, index) => (
            <TabsContent key={category.title} value={String(index)} keepMounted>
              <div className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary border-b border-primary/20 pb-2">
                    {category.title}
                  </h3>
                  {category.note && (
                    <p className="text-sm text-muted italic pt-2">{category.note}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between gap-3 py-3 px-4 bg-background/60 rounded-xl border border-primary/10 transition-all hover:border-primary/30 hover:shadow-md"
                    >
                      <span className="text-primary font-medium">{item.name}</span>
                      <span className="text-secondary font-semibold whitespace-nowrap">
                        {item.price} {currency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
