"use client";

import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export function HeroSection() {
  const { t, i18n } = useTranslation();
  function scrollToSectionById(id: string) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <section
      className="relative min-h-screen w-full flex items-center pt-28 md:pt-24 pb-20 md:pb-12 overflow-hidden bg-[url('/BGs/hero-bg.webp')] bg-no-repeat bg-right-bottom bg-cover"
      id="home"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-[#FAF8F3] to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-5 animate-pulse" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-deco rounded-full mix-blend-multiply filter blur-[128px] opacity-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-strong/75 border border-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide uppercase text-primary">
                {t("hero.crafted_with_freshness")}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl/[90px] font-bold text-primary leading-[1.1] tracking-tight">
              {t("hero.taste_the")} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                {t("hero.waves_of_flavor")}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-secondary max-w-lg leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <button
                className="group relative px-8 py-4 bg-primary text-background rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                onClick={() => scrollToSectionById("menu")}
              >
                <span className="relative z-10 flex items-center gap-2 text-background">
                  {t("hero.view_menu")}

                  <ArrowRight
                    size={18}
                    className={`transition-transform group-hover:-translate-x-1 ${
                      (typeof i18n.dir === "function" ? i18n.dir() === "rtl" : i18n.language?.startsWith("ar"))
                        ? "rotate-180 group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    } `}
                  />
                </span>
                <div className="absolute inset-0 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </button>

              <button
                className="group px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-full font-medium transition-all duration-300 hover:bg-primary-5 hover:-translate-y-1 flex items-center justify-center gap-2"
                onClick={() => scrollToSectionById("location")}
              >
                <MapPin size={18} />
                <span>{t("hero.contact_location")}</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 flex items-center gap-4 text-primary/80 text-sm font-medium">
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-surface bg-deco overflow-hidden ${
                      i > 1 ? "-ms-3" : ""
                    }`}
                  >
                    <Image
                      src={`/images/avatars/avatar-${i}.webp`}
                      alt="User"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p>{t("hero.loved_by_locals")}</p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-175 w-full flex items-center justify-center lg:justify-end group">
            <div className="relative w-full max-w-md  mx-auto aspect-4/5 lg:aspect-auto  transition-transform duration-500 hover:scale-[1.02]">
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0  z-10" />
              <div className="lg:h-full w-full mx-auto rounded-2xl">
                <Image
                  src="/blue-hero-drink.webp"
                  alt="Blue Redbull"
                  width={400}
                  height={500}
                  priority
                  className="w-full h-full object-cover transform transition-transform duration-2000 animate-tada animate-duration-2000 animate-iteration-count-infinite scale-85 md:rotate-12 rounded-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -left-3 -bottom-6  md:-bottom-6 md:-left-8  z-20 bg-background/50 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-63 transform transition-all duration-500 hover:-translate-y-2">
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                  {t("hero.featured")}
                </p>
                <p className="text-lg font-bold text-primary">
                  {t("hero.blue_redbull")}
                </p>
                <p className="text-sm text-secondary mt-1">
                  {t("hero.blue_redbull_description")}
                </p>
              </div>
            </div>

            {/* Decorative Circle behind image */}
            <div className="absolute -z-10 top-1/2 right-1/2 lg:right-12 transform -translate-y-1/2 translate-x-1/2 lg:translate-x-0 w-[120%] h-[80%] border border-[#3E2723]/10 rounded-full" />
            <div className="absolute -z-10 top-1/2 right-1/2 lg:right-12 transform -translate-y-1/2 translate-x-1/2 lg:translate-x-0 w-[110%] h-[70%] border border-[#3E2723]/5 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
