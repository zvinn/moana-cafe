import { ContactInfoServer } from "./ContactInfoServer";
import ContactForm from "./ContactForm";

interface ContactSectionProps {
  title: string;
  subtitle: string;
  letsConnect: string;
  connectP: string;
  phoneTitle: string;
  chatOnWhatsApp: string;
  followUs: string;
}

export function ContactSection({
  title,
  subtitle,
  letsConnect,
  connectP,
  phoneTitle,
  chatOnWhatsApp,
  followUs,
}: ContactSectionProps) {
  return (
    <section className="py-15 md:py-19" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-muted font-medium">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ContactInfoServer
            letsConnect={letsConnect}
            connectP={connectP}
            phoneTitle={phoneTitle}
            chatOnWhatsApp={chatOnWhatsApp}
            followUs={followUs}
          />

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
