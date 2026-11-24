import type { Lang } from "@/lib/i18n-server";

export function FooterServer({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 pb-20 text-center text-xs sm:flex-row sm:pb-6 sm:pe-52 sm:text-sm">
        <p className="text-white/70">
          © {new Date().getFullYear()} {isAr ? "موانا كافيه" : "Moana Café"} ·{" "}
          {isAr ? "جميع الحقوق محفوظة" : "All rights reserved"}
        </p>

        <p className="flex items-center gap-2 text-white/60">
          <span>{isAr ? "صُنع بواسطة" : "Crafted by"}</span>
          <a
            href="https://zvinn.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isAr ? "زيارة موقع ZVINN" : "Visit ZVINN's website"}
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-medium tracking-wide text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <span>ZVINN</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
        </p>
      </div>
      <p className="border-t border-white/10 px-6 py-3 text-center text-xs text-white/70">
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
