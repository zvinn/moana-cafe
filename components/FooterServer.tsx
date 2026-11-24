import type { Lang } from "@/lib/i18n-server";

export function FooterServer({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";

  return (
    <footer className="bg-primary text-white">
      <p className="border-t border-white/10 px-6 pt-3 pb-20 text-center text-xs text-white/70 sm:pb-3">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://wasalat.org"
          target="_blank"
          rel="noopener noreferrer"
          className="uppercase underline hover:text-white"
        >
          wasalat
        </a>
        . {isAr ? "جميع الحقوق محفوظة" : "All rights reserved."}
      </p>
    </footer>
  );
}
