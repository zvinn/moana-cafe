import type { MenuCategory } from "@/content/menu";

export interface MenuSearchHit {
  catIndex: number;
  itemIndex: number;
  name: string;
  price: number;
}

export interface MenuSearchGroup {
  catIndex: number;
  title: string;
  items: MenuSearchHit[];
}

const DIACRITIC = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/;
const CHAR_MAP: Record<string, string> = {
  "أ": "ا",
  "إ": "ا",
  "آ": "ا",
  "ٱ": "ا",
  "ى": "ي",
  "ئ": "ي",
  "ؤ": "و",
  "ة": "ه",
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
};

function normalizeChar(char: string): string {
  const lower = char.toLowerCase();
  return CHAR_MAP[lower] ?? lower;
}

export function normalize(input: string): string {
  let out = "";
  for (const char of input) {
    if (DIACRITIC.test(char)) continue;
    out += normalizeChar(char);
  }
  return out.replace(/\s+/g, " ").trim();
}

function tokenize(query: string): string[] {
  return normalize(query).split(" ").filter(Boolean);
}

export function searchMenu(
  categories: MenuCategory[],
  query: string
): MenuSearchGroup[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const groups: MenuSearchGroup[] = [];

  categories.forEach((category, catIndex) => {
    const categoryTitle = normalize(category.title);
    const items: MenuSearchHit[] = [];

    category.items.forEach((item, itemIndex) => {
      const haystack = `${normalize(item.name)} ${categoryTitle}`;
      if (tokens.every((token) => haystack.includes(token))) {
        items.push({ catIndex, itemIndex, name: item.name, price: item.price });
      }
    });

    if (items.length > 0) {
      groups.push({ catIndex, title: category.title, items });
    }
  });

  return groups;
}

export function highlightRanges(text: string, query: string): [number, number][] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  let normalized = "";
  const originIndex: number[] = [];

  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (DIACRITIC.test(char)) continue;
    const mapped = normalizeChar(char);
    normalized += mapped;
    for (let i = 0; i < mapped.length; i++) originIndex.push(index);
  }

  const ranges: [number, number][] = [];

  for (const token of tokens) {
    let from = 0;
    while (from <= normalized.length - token.length) {
      const at = normalized.indexOf(token, from);
      if (at === -1) break;
      const end = at + token.length;
      ranges.push([originIndex[at], originIndex[end - 1] + 1]);
      from = end;
    }
  }

  ranges.sort((a, b) => a[0] - b[0]);

  const merged: [number, number][] = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) {
      last[1] = Math.max(last[1], range[1]);
    } else {
      merged.push([range[0], range[1]]);
    }
  }

  return merged;
}
