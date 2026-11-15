"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const images = [
  `16493E06-EC8C-4BE0-9AEF-0530F4CBB23D.webp`,
  `265E9F1C-08BE-4BA4-8031-9BF0903F9C0A.webp`,
  `343F8FAF-BF06-4BFE-977D-DB8DB98EAFE2.webp`,
  `6758F493-5214-4921-901F-B07037B91CBE.webp`,
  `6BB67A9F-285B-4D8D-8E7F-C6FC1C544CCD.webp`,
  `77092065-7CD0-4D4D-9EDE-562E90FF1365.webp`,
  `8980869F-6A47-446C-B538-EE7341077118.webp`,
  `B93FE07F-A3A6-47B6-ADDF-5F63C1E99FDA.webp`,
  `BBAC8F75-DB9A-4656-9BED-B0F9E860ADDB.webp`,
  `C068E09C-294E-4D05-81E6-DD6A06EF5F45.webp`,
  `C5E3B43B-31FA-4DB7-BEF4-4929A6009985.webp`,
  `D9AAC080-9C0E-47D6-8052-026ABAD32AC0.webp`,
  `DE1EF3D9-4356-454C-9298-D5CFC04D970D.webp`,
  `E610F752-66B5-42C9-9279-A06E09144204.webp`,
  `FA9F67A6-635D-4487-9B67-A10C510A2665.webp`,
];

export function Gallery() {
  const { t, i18n } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mobileImagePreview, setMobileImagePreview] = useState<string | null>(
    `${images[0]}`,
  );
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-15 md:py-19 overflow-hidden" id="gallery">
      <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
              {t("gallery.title")}
            </h2>
            <p className="text-lg text-muted font-medium">
              {t("gallery.subtitle")}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div
            className={` gap-4 hidden md:flex ${
              (typeof i18n.dir === "function" ? i18n.dir() === "rtl" : i18n.language?.startsWith("ar")) ? "flex-row-reverse" : ""
            }`}
          >
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full border-2 border-secondary/50 bg-background/80 text-primary hover:bg-primary hover:text-background transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full border-2 border-secondary/50 bg-background/80 text-primary hover:bg-primary hover:text-background transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className={`hidden md:flex gap-6 overflow-x-auto snap-x snap-mandatory p-8 -mx-6 px-6 md:mx-0 scrollbar-hide bg-background/60 rounded-2xl`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-none w-[85vw] md:w-[300px] aspect-[3/4] snap-center"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src={`/media/images/${src}`}
                  alt={`Gallery image ${index + 1}`}
                  width={300}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 85vw, 300px"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="block md:hidden bg-background/60 rounded-xl p-4">
          <Image
            src={`/media/images/${mobileImagePreview}`}
            alt="Gallery image"
            width={300}
            height={400}
            className="w-full h-full object-cover rounded-2xl"
            sizes="100vw"
          />
          <div className="flex gap-4 mt-4 overflow-x-auto scrollbar-thumb-primary scrollbar-track-transparent scrollbar-thin scrollbar-gutter-auto pb-3">
            {images.map((src, index) => (
              <div
                key={index}
                className={`flex-none w-24 h-32 rounded-2xl overflow-hidden cursor-pointer border-2 ${mobileImagePreview === src ? "border-primary" : "border-transparent"} transition-all duration-300`}
                onClick={() => setMobileImagePreview(src)}
              >
                <Image
                  src={`/media/images/${src}`}
                  alt={`Gallery image ${index + 1}`}
                  width={96}
                  height={128}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  sizes="96px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
