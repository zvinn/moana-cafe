import { Phone, MessageCircle } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok } from "@icons-pack/react-simple-icons";
import phoneNumbers from "@/utils/phoneNumbers";

interface ContactInfoServerProps {
  letsConnect: string;
  connectP: string;
  phoneTitle: string;
  chatOnWhatsApp: string;
  followUs: string;
}

const socialLinks = [
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
];

export function ContactInfoServer({
  letsConnect,
  connectP,
  phoneTitle,
  chatOnWhatsApp,
  followUs,
}: ContactInfoServerProps) {
  const whatsappNumber = phoneNumbers[0].replace("+", "");

  return (
    <div className="bg-background/60 rounded-3xl p-8 md:p-12 shadow-lg border border-primary-5 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-3xl font-bold text-primary mb-6">
          {letsConnect}
        </h3>
        <p className="text-muted text-lg mb-8 leading-relaxed">
          {connectP}
        </p>

        <div className="flex flex-col gap-4 mb-12">
          {phoneNumbers.map((phone, idx) => (
            <a
              key={phone || idx}
              href={`tel:${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              title={phoneTitle}
              className="flex items-center gap-4 text-primary hover:text-primary-dark transition-colors group"
            >
              <div className="p-3 bg-base rounded-full group-hover:bg-primary-5 transition-colors">
                <Phone size={24} />
              </div>
              <span className="text-xl font-medium" dir="ltr">
                {phone?.replace(/(\+?20)(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4")}
              </span>
            </a>
          ))}

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 w-full md:w-auto bg-whatsapp text-background px-6 py-4 rounded-full hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-whatsapp/50"
          >
            <MessageCircle size={24} className="text-bg" />
            <span className="text-bg text-lg font-bold">
              {chatOnWhatsApp}
            </span>
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold text-primary mb-4">
          {followUs}
        </h4>
        <div className="flex gap-4">
          {socialLinks.map((Social, i) => (
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
  );
}