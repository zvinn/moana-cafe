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
} from "lucide-react";
import { cn } from "@/lib/utils";
export function Navigation() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    {
      name: t("nav.home"),
      href: "home",
      icon: <Home size={24} strokeWidth={1.5} />,
    },
    {
      name: t("nav.why_us"),
      href: "why-us",
      icon: <Users size={24} strokeWidth={1.5} />,
    },
    {
      name: t("nav.menu"),
      href: "menu",
      icon: <BookText size={24} strokeWidth={1.5} />,
    },
    {
      name: t("nav.gallery"),
      href: "gallery",
      icon: <GalleryVertical size={24} strokeWidth={1.5} />,
    },
    {
      name: t("nav.reviews"),
      href: "reviews",
      icon: <Star size={24} strokeWidth={1.5} />,
    },
    {
      name: t("nav.location"),
      href: "location",
      icon: <MapPin size={24} strokeWidth={1.5} />,
    },
    {
      name: t("nav.contact"),
      href: "contact",
      icon: <Mail size={24} strokeWidth={1.5} />,
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

  const linksClassName = `text-sm font-semibold text-primary hover:text-primary-dark transition-colors relative after:content-[''] after:absolute after:bottom-[-5px] after:start-0 after:w-0 after:h-[1px] after:bg-primary after:rounded-e-full after:transition-all after:duration-300 hover:after:w-full`;

  const renderLangToggle = (isMobile = false) => {
    const langButton = (langCode: string, text: string) => (
      <button
        onClick={() => {
          i18n.changeLanguage(langCode);
          document.cookie = `lang=${langCode}; path=/; max-age=31536000; samesite=lax`;
        }}
        lang={langCode}
        className={cn(
          `relative transition-all font-semibold px-4 py-1 rounded`,
          isMobile ? "text-lg bg-card" : "text-sm  ",
          i18n.language === langCode ? "text-primary" : "text-primary",
        )}
      >
        {text}
        {i18n.language === langCode && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></span>
        )}
      </button>
    );

    return (
      <div className={`flex items-center gap-1 rounded-md p-1 bg-primary/10`}>
        {langButton(
          i18n.language === "ar" ? "en" : "ar",
          i18n.language === "ar" ? "English" : "العربية",
        )}
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
        scrolled ? "bg-bg/75 shadow-sm py-2" : "bg-transparent py-4",
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
          href="/"
          className="flex items-center gap-2 group cursor-pointer "
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            src={`/media/images/sea_logo.webp`}
            alt="Logo"
            className="h-19 w-38 mx-auto"
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
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed bg-primary z-40  flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? "translate-y-0 " : "-translate-y-full opacity-0"
        } top-0 w-full h-screen  `}
      >
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleNavClick(link.href)}
            className="flex items-center gap-4 text-2xl font-medium text-background  hover:text-primary-dark transition-colors"
          >
            {link.icon}
            <span>{link.name}</span>
          </button>
        ))}
        {renderLangToggle(true)}
        <button
          className="absolute top-6 end-6 p-2 text-background hover:bg-primary/10 rounded-full transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
    </nav>
  );
}
