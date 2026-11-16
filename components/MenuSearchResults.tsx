"use client";

import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { highlightRanges, type MenuSearchGroup } from "@/lib/menu-search";

interface MenuSearchResultsProps {
  groups: MenuSearchGroup[];
  total: number;
  query: string;
  currency: string;
  onSelect: (catIndex: number, itemIndex: number) => void;
}

function Highlighted({ text, query }: { text: string; query: string }) {
  const ranges = highlightRanges(text, query);
  if (ranges.length === 0) return <>{text}</>;

  const parts: ReactNode[] = [];
  let cursor = 0;

  ranges.forEach(([start, end], index) => {
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <mark key={index} className="rounded-sm bg-secondary/25 px-0.5 text-inherit">
        {text.slice(start, end)}
      </mark>
    );
    cursor = end;
  });

  if (cursor < text.length) parts.push(text.slice(cursor));

  return <>{parts}</>;
}

export function MenuSearchResults({
  groups,
  total,
  query,
  currency,
  onSelect,
}: MenuSearchResultsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 rounded-2xl bg-background/55 p-3 backdrop-blur-[2px] md:p-4">
      <p aria-live="polite" className="text-sm text-muted">
        {t("menu.results_count", { count: total })}
      </p>

      {total === 0 ? (
        <div className="py-8 text-center">
          <p className="font-medium text-primary">
            {t("menu.no_results", { query })}
          </p>
          <p className="mt-1 text-sm text-muted">{t("menu.no_results_hint")}</p>
        </div>
      ) : (
        groups.map((group) => (
          <div key={group.catIndex} className="space-y-1">
            <h4 className="text-xs font-semibold tracking-wide text-muted uppercase">
              {group.title}
            </h4>
            <ul className="divide-y divide-primary/10">
              {group.items.map((item) => (
                <li key={`${group.catIndex}-${item.itemIndex}`}>
                  <button
                    type="button"
                    onClick={() => onSelect(group.catIndex, item.itemIndex)}
                    className="flex w-full items-baseline gap-2 rounded-lg px-2 py-2.5 text-start transition-colors hover:bg-background/70"
                  >
                    <span className="text-[15px] font-medium text-primary">
                      <Highlighted text={item.name} query={query} />
                    </span>
                    <span
                      aria-hidden
                      className="mb-0.5 min-w-3 flex-1 border-b border-dotted border-primary/25"
                    />
                    <span className="whitespace-nowrap text-sm font-semibold text-secondary">
                      {item.price} {currency}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
