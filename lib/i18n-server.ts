import en from "@/public/locales/en/translation.json";
import ar from "@/public/locales/ar/translation.json";

export type Lang = "en" | "ar";

export function getMessages(lang: Lang) {
  return lang === "ar" ? ar : en;
}
