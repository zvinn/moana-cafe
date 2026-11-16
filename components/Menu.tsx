"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FileText, Search, Share2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  menuCategories,
  menuCategoriesAr,
  MENU_PDF_PATH,
  type MenuCategory,
} from "@/content/menu";
import { searchMenu } from "@/lib/menu-search";
import { cn } from "@/lib/utils";
import { MenuSearchResults } from "@/components/MenuSearchResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Menu() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const categories: MenuCategory[] = lang === "ar" ? menuCategoriesAr : menuCategories;

  const [activeCategory, setActiveCategory] = useState("0");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [flashId, setFlashId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trimmedQuery = query.trim();
  const searching = trimmedQuery.length > 0;
  const results = useMemo(
    () => searchMenu(categories, trimmedQuery),
    [categories, trimmedQuery]
  );
  const totalResults = results.reduce((sum, group) => sum + group.items.length, 0);

  useEffect(() => {
    if (!searchOpen) return;
    const frame = requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    const frame = requestAnimationFrame(() => searchTriggerRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [searchOpen]);

  useEffect(() => {
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, []);

  const closeSearch = (restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setSearchOpen(false);
    setQuery("");
  };

  const selectResult = (catIndex: number, itemIndex: number) => {
    closeSearch(false);
    setActiveCategory(String(catIndex));

    const itemId = `menu-item-${catIndex}-${itemIndex}`;
    setFlashId(itemId);

    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => setFlashId(null), 2200);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(itemId)
          ?.scrollIntoView({ block: "center", behavior: "smooth" });
      });
    });
  };

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
      className="py-14 md:py-28 bg-surface bg-[url('/BGs/menu-bg.webp')] bg-no-repeat bg-left-bottom bg-cover"
      id="menu"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 md:mb-12 md:flex-col md:flex-nowrap md:justify-start md:gap-0 md:text-center">
          <h2 className="order-1 text-3xl md:text-5xl font-bold text-primary tracking-tight">
            {t("menu.title")}
          </h2>
          <div className="order-2 flex items-center gap-2 md:order-3 md:mt-12 md:justify-center">
            <Link
              href={MENU_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background group flex items-center gap-2 px-4 py-2 text-sm md:gap-3 md:px-8 md:py-4 md:text-base bg-primary/90 rounded-full hover:bg-primary/80 transition font-semibold shadow-md"
            >
              <FileText className="size-4 md:size-6" />
              {t("menu.view_menu_file")}
            </Link>
            <button
              type="button"
              onClick={handleShare}
              aria-label={t("menu.share_menu")}
              title={t("menu.share_menu")}
              className="p-2 rounded-full text-primary hover:bg-primary/10 transition-colors"
            >
              <Share2 className="size-5 md:size-6" />
            </button>
          </div>
          <p className="order-3 mt-2 w-full text-base md:order-2 md:mt-4 md:w-auto text-muted md:max-w-3xl md:mx-auto md:text-lg font-medium">
            {t("menu.subtitle")}
          </p>
        </div>

        <Tabs
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(String(value))}
        >
          <div className="sticky top-[92px] z-30 -mx-6 md:-mx-12 mb-6 md:mb-8 border-y border-primary/10 bg-surface/95 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6 md:px-12 py-2">
              <div className={cn("flex items-center gap-2", searchOpen && "hidden")}>
                <button
                  ref={searchTriggerRef}
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label={t("menu.search_label")}
                  aria-expanded={searchOpen}
                  className="flex size-9 flex-none items-center justify-center rounded-full border border-primary/20 bg-background/70 text-primary transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <Search className="size-4" />
                </button>
                <TabsList
                  aria-label={t("menu.title")}
                  className="w-full min-w-0 flex-1 flex-nowrap justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

              {searchOpen && (
                <div role="search" className="flex items-center gap-2">
                  <div className="relative flex-1 md:max-w-xl">
                    <Search
                      aria-hidden
                      className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted"
                    />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          event.preventDefault();
                          closeSearch();
                        }
                      }}
                      placeholder={t("menu.search_placeholder")}
                      aria-label={t("menu.search_label")}
                      className="h-[38px] w-full rounded-full border border-primary/20 bg-background/80 ps-9 pe-9 text-base text-primary outline-none transition-colors placeholder:text-muted focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20 md:text-sm [&::-webkit-search-cancel-button]:appearance-none"
                    />
                    {query.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          searchInputRef.current?.focus();
                        }}
                        aria-label={t("menu.clear_search")}
                        className="absolute end-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => closeSearch()}
                    aria-label={t("menu.close_search")}
                    className="flex size-9 flex-none items-center justify-center rounded-full border border-primary/20 bg-background/70 text-primary transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {searching && (
            <div className="mb-6 md:mb-8">
              <MenuSearchResults
                groups={results}
                total={totalResults}
                query={trimmedQuery}
                currency={currency}
                onSelect={selectResult}
              />
            </div>
          )}

          <div className={cn(searching && "hidden")}>
            {categories.map((category, index) => (
              <TabsContent key={category.title} value={String(index)} keepMounted>
                <div className="space-y-3 rounded-2xl bg-background/55 p-3 backdrop-blur-[2px] md:space-y-5 md:rounded-none md:bg-transparent md:p-0 md:backdrop-blur-none">
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-3xl font-bold text-primary border-b border-primary/20 pb-2">
                      {category.title}
                    </h3>
                    {category.note && (
                      <p className="text-xs md:text-sm text-muted italic pt-1 md:pt-2">
                        {category.note}
                      </p>
                    )}
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-0.5 md:gap-4">
                    {category.items.map((item, itemIndex) => {
                      const itemId = `menu-item-${index}-${itemIndex}`;
                      return (
                        <li
                          key={itemIndex}
                          id={itemId}
                          className={cn(
                            "flex items-baseline gap-2 scroll-mt-44 rounded-lg -mx-2 px-2 py-2 transition-colors md:mx-0 md:gap-3 md:rounded-xl md:border md:border-primary/10 md:bg-background/60 md:px-4 md:py-3 md:hover:border-primary/30 md:hover:shadow-md",
                            flashId === itemId &&
                              "bg-secondary/15 ring-1 ring-secondary/40 md:border-secondary/50"
                          )}
                        >
                          <span className="text-[15px] md:text-sm font-medium text-primary leading-snug md:leading-5">
                            {item.name}
                          </span>
                          <span
                            aria-hidden
                            className="flex-1 min-w-3 mb-0.5 border-b border-dotted border-primary/30 md:hidden"
                          />
                          <span className="text-sm font-semibold text-secondary whitespace-nowrap">
                            {item.price} {currency}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
