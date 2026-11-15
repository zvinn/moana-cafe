"use client";

import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import WaveSepparator from "./Wave";

type Drink = {
  name: string;
  price: string;
  description: string;
};

const drinkImages = [
  "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
];

export function FeaturedDrinks() {
  const { t } = useTranslation();
  const drinks = t("featured_drinks.drinks", {
    returnObjects: true,
  }) as Drink[];

  return (
    <>
      <WaveSepparator />
      <section
        className="py-20 md:py-28 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto bg-base"
        id="featured-drinks"
      >
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {t("featured_drinks.title")}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto font-medium">
            {t("featured_drinks.subtitle")}
          </p>
        </div>

        {/* Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {drinks.map((drink, index) => (
            <div
              key={index}
              className="group relative flex flex-col bg-surface rounded-3xl p-4 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Glowing Border Effect (Pseudo-element) */}
              <div className="absolute inset-0 rounded-3xl border border-primary-5 transition-colors duration-500 group-hover:border-primary pointer-events-none" />

              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-base">
                <img
                  src={drinkImages[index]}
                  alt={drink.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay Gradient on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-strong)]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Floating Add Button */}
                <button
                  className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-surface backdrop-blur-sm flex items-center justify-center text-primary opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary hover:text-on-primary"
                  aria-label={`Add ${drink.name} to order`}
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="pt-6 pb-2 px-2 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-xl font-bold text-primary leading-tight group-hover:text-primary-dark transition-colors">
                    {drink.name}
                  </h3>
                  <span className="text-lg font-semibold text-primary-dark whitespace-nowrap">
                    {drink.price}
                  </span>
                </div>
                <p className="text-sm text-muted line-clamp-2">
                  {drink.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
