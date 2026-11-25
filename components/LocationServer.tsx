import { MapPin, Clock, Phone, Mail } from "lucide-react";
import phoneNumbers from "@/utils/phoneNumbers";

interface LocationServerProps {
  title: string;
  subtitle: string;
  contactInfoTitle: string;
  addressTitle: string;
  address: string;
  hoursTitle: string;
  hours: string;
  phoneTitle: string;
  emailTitle: string;
}

export function LocationServer({
  title,
  subtitle,
  contactInfoTitle,
  addressTitle,
  address,
  hoursTitle,
  hours,
  phoneTitle,
  emailTitle,
}: LocationServerProps) {
  return (
    <section className="py-15 md:py-19" id="location">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-muted font-medium">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <div className="w-full h-96 lg:h-auto min-h-[400px] bg-deco rounded-3xl overflow-hidden shadow-lg border border-primary-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13661.709562597394!2d29.7748929!3d31.1256434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f595002278c5df%3A0xcb04ba3022686b6b!2sMoana%20caffe!5e0!3m2!1sen!2seg!4v1764630651546!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(0.2) contrast(1.1) sepia(0.2)",
              }}
              allowFullScreen
              loading="lazy"
              title="Moana Café Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info Card */}
          <div className="bg-background/60 rounded-3xl p-8 md:p-12 shadow-lg border border-primary-5 flex flex-col justify-center h-full">
            <h3 className="text-2xl font-bold text-primary mb-8">
              {contactInfoTitle}
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-base-strong/50 rounded-full text-primary-dark">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">
                    {addressTitle}
                  </h4>
                  <a
                    href="https://maps.app.goo.gl/a62UFJAd68f6WeFu8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {address}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-base-strong/50 rounded-full text-primary-dark">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">
                    {hoursTitle}
                  </h4>
                  <p className="text-muted">{hours}</p>
                </div>
              </div>

                <div className="flex items-start gap-4">
                <div className="bg-base-strong/50 rounded-full text-primary-dark">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">
                    {phoneTitle}
                  </h4>
              {phoneNumbers.map((phone, idx) => (
                  <a key={phone || idx} href={`tel:${phone}`} className="text-muted block my-1" dir="ltr">
                    {phone}
                  </a>
              ))}
                    </div>
                </div>

              <div className="flex items-start gap-4">
                <div className="bg-base-strong/50 rounded-full text-primary-dark">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-primary mb-1">
                    {emailTitle}
                  </h4>
                  <a href="mailto:hello@moanacafes.com" className="text-muted text-nowrap" dir="ltr">hello@moanacafes.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}