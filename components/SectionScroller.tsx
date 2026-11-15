"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function SectionScroller() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  useEffect(() => {
    if (!section) return;

    const timeout = setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [section]);

  return null;
}
