"use client";

import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <main className="w-screen h-screen grid place-content-center">
        <div className="text-center p-4">
            <img src="https://pub-c97c93ec20e446cb8a9390261b5ff4d1.r2.dev/images/404%20Error-rafiki.png" alt="Not Found" className="mx-auto mb-4 w-1/2 md:w-1/4" />
          <h1 className="text-6xl font-bold mb-4">{t("notFound.title")}</h1>
          <p className="text-lg mb-8">{t("notFound.description")}</p>
          <a
            href="/"
            className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark transition"
          >
            {t("notFound.go_home")}
          </a>
        </div>
      </main>
    </>
  );
}
