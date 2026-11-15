"use client";

import { useTranslation } from "react-i18next";
import { Coffee, Users, Star } from "lucide-react";

type Point = {
  title: string;
  description: string;
  icon: string;
};

const iconMap: { [key: string]: React.ReactNode } = {
  Coffee: <Coffee size={25} />,
  Users: <Users size={25} />,
  Star: <Star size={25} />,
};

export function WhyUs() {
  const { t } = useTranslation();

  return (
    <>
      <section id="why-us" className="py-20 md:py-28 ">

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              {t("why_us.title")}
            </h2>
            <p className="text-lg text-muted max-w-3xl mx-auto mt-4 font-medium">
              {t("why_us.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-video object-cover rounded-xl shadow-lg overflow-hidden">
              <img
                src={`/media/images/FD41B063-038F-42B9-91CC-A287BDB9029F.webp`}
                className="scale-120 object-cover w-full h-full"
                alt="Moana"
                loading="lazy"
              />
            </div>
            <div className=" bg-background/60 p-4 md:p-8 rounded-2xl">
              <div className="space-y-8 ">
                {(Array.isArray(t("why_us.points", { returnObjects: true }))
                  ? (t("why_us.points", { returnObjects: true }) as Point[])
                  : []
                ).map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center text-center md:text-start md:items-start gap-x-5 gap-y-2 flex-col md:flex-row"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                        {iconMap[point.icon]}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {point.title}
                      </h3>
                      <p className="text-muted leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
