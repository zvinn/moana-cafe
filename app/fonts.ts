import localFont from "next/font/local";

export const Moanas = localFont({
  src: [
    {
      path: "../public/fonts/moanas.ttf",
      style: "normal",
    },
  ],
  variable: "--font-moanas",
  display: "swap",
});