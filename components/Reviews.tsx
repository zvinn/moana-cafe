"use client";

import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import Image from "next/image";
import { reviews, reviewsAr, type Review } from "@/content/reviews";

const fallbackAvatar = "/images/reviews/review-1.webp";

const reviewImages = [
  "/images/reviews/review-1.webp",
  "/images/reviews/review-2.webp",
  "/images/reviews/review-3.webp",
];

export function Reviews() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const reviewsData: Review[] = lang === "ar" ? reviewsAr : reviews;

  return (
    <section className="py-15 md:py-19" id="reviews">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {t("reviews.title")}
          </h2>
          <p className="text-lg text-muted font-medium">
            {t("reviews.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review, index) => (
            <div
              key={review.name}
              className="bg-background/60 rounded-3xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-primary-5"
            >
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={reviewImages[index] ?? fallbackAvatar}
                  alt={review.name}
                  width={64}
                  height={64}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = fallbackAvatar;
                  }}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/10"
                />
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {review.name}
                  </h3>
                  <div className="flex gap-1 text-primary-dark">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={16} fill="gold" stroke="gold" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted leading-relaxed">
                &quot;{review.text}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
