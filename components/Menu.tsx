"use client";

import { ChevronDown, FileText, Share2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
export function Menu() {
  const { t } = useTranslation();
  const categories = t("menu.categories", { returnObjects: true }) as Array<{
    title: string;
    note?: string;
    items: Array<{ name: string; price: string; description?: string }>;
  }>;
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  if (!categories || !Array.isArray(categories)) {
    return null;
  }
  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Moana Café",
        text: "Check out Moana Café menu 🌊☕",
        url: `${window.location.origin}/media/files/Moana_Menu.pdf`,
      });
    } catch (error) {
      // User cancelled sharing
    }
  };
  return (
    <section
      className="py-20 md:py-28 bg-surface bg-[url('/BGs/menu-bg.webp')] bg-no-repeat bg-bottom-left bg-cover"
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
        <div className="flex gap-6 justify-center items-center ">
          <Link href="/media/files/Moana_Menu.pdf" target="_blank">
            <button className="cursor-pointer text-background group relative flex gap-3 px-8 py-4 bg-primary bg-opacity-90 text-bg rounded-full hover:bg-opacity-80 transition font-semibold shadow-md">
              <FileText />
              {t("menu.view_menu_file")}
            </button>
          </Link>
          <button onClick={handleShare}><Share2 className="text-primary" /></button>
          {/* <Tabs defaultValue="account" className="max-w-screen bg-card/75 border-primary border p-6 rounded-3xl w-full">
            <TabsList className={"flex-wrap bg-transparent"}>
              {categories.map((category, index) => (
                <TabsTrigger key={index} value={`category-${category.title}`} className="px-4 py-1">
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="w-full h-0.5 bg-primary rounded-full mt-4" />
            {categories.map((category, index) => (
              <TabsContent key={index} value={`category-${category.title}`} className="max-h-100 overflow-auto scrollbar-thumb-primary scrollbar-track-transparent scrollbar-thin">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-base p-6 rounded-xl border-b-2 border-b-primary flex justify-between items-baseline gap-5">
                      <h4 className="text-xl font-bold">{item.name}</h4>
                      <p className="text-primary font-bold text-xl">{item.price}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs> */}
          {/* <div
            className={` border-secondary/75 border rounded-3xl px-10 py-6  overflow-hidden  ${
              isMenuOpened ? "max-h-auto" : "max-h-20"
            }  duration-1000 ease-in-out`}
          >
            <button
              className="text-2xl font-semibold mb-12 w-full text-primary flex justify-between"
              onClick={() => {
                setIsMenuOpened((prev) => !prev);
              }}
            >
              <span>{t("menu.view_menu")}</span>
              <span>
                <ChevronDown
                  size={30}
                  className={`${isMenuOpened ? "rotate-180" : ""} transition-all`}
                />
              </span>
            </button>
            {/* <hr className="border border-secondary/75 w-full mb-8" /> 
            <div className="space-y-16">
              {categories.map((category, index) => (
                <div key={index}>
                  <div className="flex flex-col gap-4 mb-8 border-b-2 border-deco pb-4">
                    <h3 className="text-3xl font-bold text-primary-dark ">
                      {category.title}
                    </h3>
                    {category.note && <p className="ms-2">{category.note}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.items.map(
                      (
                        item: {
                          name: string;
                          price: string;
                          description?: string;
                        },
                        itemIndex: number,
                      ) => (
                        <div
                          key={itemIndex}
                          className="bg-base p-6 rounded-2xl"
                        >
                          <div className="flex justify-between gap-5 items-baseline">
                            <h4 className="text-xl font-bold text-primary">
                              {item.name}
                            </h4>
                            <p className="text-xl font-medium text-primary-dark whitespace-nowrap">
                              {item.price}
                            </p>
                          </div>
                          <p className="text-muted">{item.description}</p>
                        </div>
                      ),
                    )}
                  
                  </div>
                </div>
              ))}
            </div> 
          </div>*/}
        </div>
      </div>
    </section>
  );
}
