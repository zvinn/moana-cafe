"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";

import {
  Menu,
  X,
  Home,
  BookText,
  GalleryVertical,
  Users,
  MapPin,
  Star,
  Mail,
  ChevronRight,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

function persistLocaleAndNavigate(langCode: "en" | "ar") {
  document.cookie = `lang=${langCode}; path=/; max-age=31536000; samesite=lax`;
  const hash = window.location.hash;

  if (!hash) {
    sessionStorage.setItem("moana-scroll", String(window.scrollY));
  }

  window.location.assign(`/${langCode}${hash}`);
}

export function Navigation() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    {
      name: t("nav.home"),
      href: "home",
      icon: <Home size={20} strokeWidth={1.75} />,
    },
    {
      name: t("nav.why_us"),
      href: "why-us",
      icon: <Users size={20} strokeWidth={1.75} />,
    },
    {
      name: t("nav.menu"),
      href: "menu",
      icon: <BookText size={20} strokeWidth={1.75} />,
    },
    {
      name: t("nav.gallery"),
      href: "gallery",
      icon: <GalleryVertical size={20} strokeWidth={1.75} />,
    },
    {
      name: t("nav.reviews"),
      href: "reviews",
      icon: <Star size={20} strokeWidth={1.75} />,
    },
    {
      name: t("nav.location"),
      href: "location",
      icon: <MapPin size={20} strokeWidth={1.75} />,
    },
    {
      name: t("nav.contact"),
      href: "contact",
      icon: <Mail size={20} strokeWidth={1.75} />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const linksClassName = `text-sm font-semibold text-primary hover:text-primary-dark transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:start-0 after:w-0 after:h-[1px] after:bg-primary after:rounded-e-full after:transition-all after:duration-300 hover:after:w-full`;

  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const switchLanguage = (langCode: "en" | "ar") => {
    persistLocaleAndNavigate(langCode);
  };

  const renderLangToggle = (isMobile = false) => {
    const langCode = i18n.language === "ar" ? "en" : "ar";
    const label = i18n.language === "ar" ? "English" : "العربية";

    if (isMobile) {
      return (
        <button
          type="button"
          onClick={() => switchLanguage(langCode)}
          lang={langCode}
          className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/80 px-5 py-2.5 text-sm font-semibold text-primary shadow-sm backdrop-blur transition-colors hover:bg-card"
        >
          <Globe size={16} strokeWidth={1.75} />
          {label}
        </button>
      );
    }

    return (
      <div className="flex items-center gap-1 rounded-full border border-primary/15 bg-primary/5 p-1">
        <button
          type="button"
          onClick={() => switchLanguage(langCode)}
          lang={langCode}
          className="rounded-full px-4 py-1 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          {label}
        </button>
      </div>
    );
  };

  const handleNavClick = (section: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav
      className={cn(
        `fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out backdrop-blur-md`,
        scrolled
          ? "border-b border-primary/10 bg-background/85 shadow-sm py-2"
          : "bg-transparent py-3 lg:py-4",
      )}
    >
      <div className="max-w-full px-6 md:px-12 flex lg:grid lg:grid-cols-[1fr_auto_1fr] items-center justify-center relative">
        {/* Desktop Navigation - Left Links */}
        <div className="hidden lg:flex items-center gap-8 mx-auto">
          {navLinks.slice(0, Math.round(navLinks.length / 2)).map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className={linksClassName}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Center Logo */}
        <Link
          href={`/${currentLang}`}
          className="flex items-center gap-2 group cursor-pointer "
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            src={`/media/images/sea_logo.webp`}
            alt="Logo"
            className="mx-auto h-16 w-auto lg:h-19 lg:w-38"
            loading="lazy"
            width={400}
            height={200}
          />
        </Link>

        {/* Desktop Navigation - Right Links */}
        <div className="hidden lg:flex items-center gap-8 mx-auto">
          {navLinks.slice(Math.round(navLinks.length / 2)).map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className={linksClassName}
            >
              {link.name}
            </button>
          ))}
          {renderLangToggle()}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-primary hover:bg-primary/10 rounded-full transition-colors absolute end-4"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t("nav.close_menu") : t("nav.open_menu")}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.menu")}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={cn(
          "fixed left-0 top-0 z-40 flex h-dvh w-full flex-col overflow-hidden bg-background bg-[url('/BGs/hero-bg.webp')] bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out lg:hidden",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <div className="flex h-full flex-col bg-linear-to-b from-background/75 via-background/65 to-background/90">
          <div className="flex items-center justify-between px-6 pb-3 pt-5">
            <Image
              src="/media/images/sea_logo.webp"
              alt="Moana Café"
              width={400}
              height={200}
              className="h-12 w-auto"
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t("nav.close_menu")}
              className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-card/80 text-primary backdrop-blur transition-colors hover:bg-card"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-4">
            <div className="my-auto w-full">
              <ul className="mx-auto flex w-full max-w-sm flex-col gap-2">
                {navLinks.map((link, index) => (
                  <li
                    key={link.name}
                    style={{
                      transitionDelay: isOpen ? `${90 + index * 45}ms` : "0ms",
                    }}
                    className={cn(
                      "transition-all duration-300 ease-out",
                      isOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.href)}
                      className="group flex w-full items-center gap-3 rounded-2xl border border-primary/10 bg-card/70 px-4 py-2.5 text-start shadow-sm backdrop-blur transition-all hover:border-primary/25 hover:bg-card hover:shadow-md"
                    >
                      <span className="flex size-9 flex-none items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/10">
                        {link.icon}
                      </span>
                      <span className="flex-1 text-[17px] font-semibold text-primary">
                        {link.name}
                      </span>
                      <ChevronRight className="size-4 text-primary/35 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex justify-center">
                {renderLangToggle(true)}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
}
