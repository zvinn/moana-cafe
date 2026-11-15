"use client";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { WhyUs } from "@/components/WhyUs";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Location } from "@/components/Location";
import { Contact } from "@/components/Contact";
import Footer from "@/components/Footer";
import WaterSound from "@/components/WaterSound";

export default function Home() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  useEffect(() => {
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [section]);

  useEffect(() => {
    const defaultTitle = t("meta.title");
    const defaultDescription = t("meta.description");

    const sectionKey = section?.toLowerCase();
    const title = sectionKey
      ? t(`meta.${sectionKey}.title`, { defaultValue: defaultTitle })
      : defaultTitle;

    const description = sectionKey
      ? t(`meta.${sectionKey}.description`, {
          defaultValue: defaultDescription,
        })
      : defaultDescription;

    if (typeof window !== "undefined") {
      document.title = title;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
    }
  }, [section, t]);

  return (
    <div>
      <WaterSound />
      <Navigation />
      <HeroSection />
      <WhyUs />
      <Menu />
      <Gallery />
      <Reviews />
      <Location />
      <Contact />
      <Footer />
    </div>
  );
}
