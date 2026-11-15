"use client";
import { useTranslation } from "react-i18next";
import { Phone, MessageCircle } from "lucide-react";
import {SiFacebook, SiInstagram, SiTiktok} from "@icons-pack/react-simple-icons";
import ContactForm from "./ContactForm";
import phoneNumbers from "@/utils/phoneNumbers";

export function Contact() {
  const { t } = useTranslation();
  const whatsappNumber = phoneNumbers[0].replace("+",""); // Replace with your WhatsApp number in international format without '+' or dashes

  return (
    <section className="py-15 md:py-19" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted font-medium">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info Side */}
          <div className="bg-background/60 rounded-3xl p-8 md:p-12 shadow-lg border border-primary-5 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-6">
                {t("contact.lets_connect")}
              </h3>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                {t("contact.connect_p")}
              </p>

              <div className="flex flex-col gap-4 mb-12">
                 {phoneNumbers.map((phone, idx)=> (
                  
                   <a
                   key={phone || idx}
                   href={`tel:${phone}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   title={t("contact.phone_title")}
                   className="flex items-center gap-4 text-primary hover:text-primary-dark transition-colors group"
                   >
                  <div className="p-3 bg-base rounded-full group-hover:bg-primary-5 transition-colors">
                    <Phone size={24} />
                  </div>
                  <span className="text-xl font-medium" dir="ltr">
                    {phone?.replace(
                      /(\+?20)(\d{3})(\d{3})(\d{4})/,
                      "$1 $2 $3 $4",
                    )}
                  </span>
                </a>
                ))}

                <button
                  className="flex items-center gap-4 w-full md:w-auto bg-whatsapp text-background px-6 py-4 rounded-full hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-whatsapp/50"
                  onClick={() => {
                    const whatsappURL = `https://wa.me/${whatsappNumber}`;
                    window.open(whatsappURL, "_blank");
                  }}
                >
                  <MessageCircle size={24} className="text-bg" />
                  <span className="text-bg text-lg font-bold">
                    {t("contact.chat_on_whatsapp")}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-primary mb-4">
                {t("contact.follow_us")}
              </h4>
              <div className="flex gap-4">
                {[
                  {
                    Icon: SiInstagram,
                    link: "https://www.instagram.com/moana_cafe_eg",
                  },
                  {
                    Icon: SiFacebook,
                    link: "https://www.facebook.com/moanacafe.eg",
                  },
                  {
                    Icon: SiTiktok,
                    link: "https://www.tiktok.com/@moana.cafe",
                  },
                ].map((Social, i) => (
                  <a
                    key={i}
                    href={Social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={Social.Icon.name}
                    className="p-4 bg-base rounded-full text-primary hover:bg-primary hover:text-background hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  >
                    <Social.Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
