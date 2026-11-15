"use client";

import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";

const reviewImages = [
  "https://lh3.googleusercontent.com/a-/ALV-UjVx5P6athT3Enmc6fTkn-XeHti3t6L5cyEyC1hyuRPom1GFl-3atw=w90-h90-p-rp-mo-br100",
  "https://lh3.googleusercontent.com/a/ACg8ocIJLaIM2EVRKXk1pPBMe96ObBdcfOlFCccXLJHG5VUBOoLXdQ=w90-h90-p-rp-mo-br100",
  "https://lh3.googleusercontent.com/a-/ALV-UjWLGXzJvXXEMJluncryZIfdht6VCupbOQR4s2Tsl6my4e6be77r=w90-h90-p-rp-mo-br100",
];

export function Reviews() {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reviewsRaw = t("reviews.review_list", { returnObjects: true }) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reviews: any[] = Array.isArray(reviewsRaw) ? reviewsRaw : [];

  return (
    <section className=" py-15 md:py-19" id="reviews">

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
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-background/60 rounded-3xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-primary-5"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={reviewImages[index]}
                  alt={review.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/media/images/0BF3CE9C-37A5-4696-87F9-F1278E266A06.webp";
                  }}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/10"
                />
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {review.name}
                  </h3>
                  <div className="flex gap-1 text-primary-dark">
                    {[...Array(5)].map((_, i) => (
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
