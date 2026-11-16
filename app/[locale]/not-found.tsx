"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function NotFound() {
  const { t } = useTranslation();
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale === "ar" ? "ar" : "en";

  return (
    <>
      <main className="w-screen h-screen grid place-content-center">
        <div className="text-center p-4">
          <Image
            src="https://pub-c97c93ec20e446cb8a9390261b5ff4d1.r2.dev/images/404%20Error-rafiki.png"
            alt="Not Found"
            width={400}
            height={300}
            className="mx-auto mb-4 w-1/2 md:w-1/4"
            priority
          />
          <h1 className="text-6xl font-bold mb-4">{t("notFound.title")}</h1>
          <p className="text-lg mb-8">{t("notFound.description")}</p>
          <Link
            href={`/${locale}`}
            className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark transition inline-block"
          >
            {t("notFound.go_home")}
          </Link>
        </div>
      </main>
    </>
  );
}
