import { NextResponse, type NextRequest } from "next/server";
import { isLocale, locales } from "./lib/locales";

const LOCALE_COOKIE = "lang";
const ONE_YEAR = 60 * 60 * 24 * 365;

function detectLocale(request: NextRequest) {
  const cookieLang = request.cookies.get(LOCALE_COOKIE)?.value;

  if (isLocale(cookieLang)) {
    return cookieLang;
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";

  return /^\s*ar\b/i.test(acceptLanguage) ? "ar" : "en";
}

function withLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
  });

  return response;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/") {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    url.search = search;

    return withLocaleCookie(NextResponse.redirect(url, 307), locale);
  }

  const locale = locales.find((candidate) => pathname === `/${candidate}`);

  if (locale && request.cookies.get(LOCALE_COOKIE)?.value !== locale) {
    return withLocaleCookie(NextResponse.next(), locale);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/en", "/ar"],
};
