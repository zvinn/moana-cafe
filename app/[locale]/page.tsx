import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getMessages } from "@/lib/i18n-server";
import { isLocale } from "@/lib/locales";
import { JsonLd } from "@/components/JsonLd";
import { SectionScroller } from "@/components/SectionScroller";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { WhyUsServer } from "@/components/WhyUsServer";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { LocationServer } from "@/components/LocationServer";
import { ContactSection } from "@/components/ContactSection";
import { FooterServer } from "@/components/FooterServer";
import WaterSound from "@/components/WaterSound";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);

  return (
    <>
      <JsonLd lang={locale} />
      <Suspense fallback={null}>
        <SectionScroller />
      </Suspense>
      <WaterSound />
      <Navigation />
      <HeroSection />
      <WhyUsServer
        points={messages.why_us.points}
        title={messages.why_us.title}
        subtitle={messages.why_us.subtitle}
      />
      <Menu />
      <Gallery />
      <Reviews />
      <LocationServer
        title={messages.location.title}
        subtitle={messages.location.subtitle}
        contactInfoTitle={messages.location.contact_info_title}
        addressTitle={messages.location.address_title}
        address={messages.location.address}
        hoursTitle={messages.location.hours_title}
        hours={messages.location.hours}
        phoneTitle={messages.location.phone_title}
        emailTitle={messages.location.email_title}
      />
      <ContactSection
        title={messages.contact.title}
        subtitle={messages.contact.subtitle}
        letsConnect={messages.contact.lets_connect}
        connectP={messages.contact.connect_p}
        phoneTitle={messages.contact.phone_title}
        chatOnWhatsApp={messages.contact.chat_on_whatsapp}
        followUs={messages.contact.follow_us}
      />
      <FooterServer lang={locale} />
    </>
  );
}
