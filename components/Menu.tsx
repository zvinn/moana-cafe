"use client";

import { FileText, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { menuCategories, menuCategoriesAr, type MenuCategory } from "@/content/menu";

export function Menu() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const categories: MenuCategory[] = lang === "ar" ? menuCategoriesAr : menuCategories;

  const handleShare = async () => {
    const url = `${window.location.origin}/media/files/Moana_Menu.pdf`;

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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {t("menu.title")}
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto mt-4 font-medium">
            {t("menu.subtitle")}
          </p>
        </div>
        <div className="flex gap-6 justify-center items-center mb-12">
          <Link
            href="/media/files/Moana_Menu.pdf"
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

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <div key={catIndex} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-primary border-b border-primary/20 pb-2">
                {category.title}
              </h3>
              {category.note && (
                <p className="text-sm text-muted italic">{category.note}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between py-3 px-4 bg-background/60 rounded-xl border border-primary/10 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <span className="text-primary font-medium">{item.name}</span>
                    <span className="text-secondary font-semibold whitespace-nowrap">
                      {item.price} {currency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
