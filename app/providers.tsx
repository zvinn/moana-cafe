"use client";

import React, { useEffect, useState } from "react";
import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import arTranslation from "../public/locales/ar/translation.json";
import enTranslation from "../public/locales/en/translation.json";

export type Lang = "en" | "ar";

function createI18n(initialLanguage: Lang) {
  const instance = createInstance();
  instance.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
    },
    lng: initialLanguage,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: {
      escapeValue: false,
    },
    ns: ["translation"],
    defaultNS: "translation",
    initAsync: false,
    react: {
      useSuspense: false,
    },
  });
  return instance;
}

export function I18nProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: Lang;
}) {
  const [i18n] = useState(() => createI18n(initialLanguage));

  useEffect(() => {
    const applyDocumentLang = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = i18n.dir(lng);
    };
    applyDocumentLang(i18n.language);
    i18n.on("languageChanged", applyDocumentLang);
    return () => {
      i18n.off("languageChanged", applyDocumentLang);
    };
  }, [i18n]);

  useEffect(() => {
    const saved = sessionStorage.getItem("moana-scroll");

    if (saved !== null) {
      sessionStorage.removeItem("moana-scroll");
    }

    const hash = window.location.hash;
    const target = hash
      ? document.getElementById(decodeURIComponent(hash.slice(1)))
      : null;
    const savedY = saved === null ? Number.NaN : Number(saved);

    if (!target && !Number.isFinite(savedY)) return;

    const apply = () => {
      if (target) {
        target.scrollIntoView();
      } else {
        window.scrollTo(0, savedY);
      }
    };

    requestAnimationFrame(() => requestAnimationFrame(apply));
    const retry = setTimeout(apply, 250);

    return () => clearTimeout(retry);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
