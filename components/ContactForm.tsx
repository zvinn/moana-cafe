"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { useTranslation } from "react-i18next";
import phoneNumbers from "@/utils/phoneNumbers";

// Toast Component
function Toast({ type, message }: { type: string; message: string }) {
  return (
    <div
      className={` px-5 py-3 rounded-xl shadow-lg text-background font-semibold transition-all duration-300
      ${type === "success" ? "bg-whatsapp" : "bg-destructive"} `}
    >
      {message}
    </div>
  );
}

export default function ContactForm() {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: string; message: string } | null>(
    null,
  );
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  // Simple animation
  const animationClass =
    "transition-all duration-700 opacity-100 translate-y-0";

  const validateFields = (formData: FormData) => {
    const newErrors: { [key: string]: boolean } = {};

    if (!formData.get("name")) newErrors.name = true;
    if (!formData.get("phone")) newErrors.phone = true;
    if (!formData.get("message")) newErrors.message = true;

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    const formData = new FormData(e.currentTarget);

    // Validate
    const validation = validateFields(formData);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setLoading(false);
      setToast({ type: "error", message: t("contact.fill_required") });
      return;
    }

    try {
      const name = formData.get("name")?.toString().trim() ?? "";
      const phone = formData.get("phone")?.toString().trim() ?? "";
      const message = formData.get("message")?.toString().trim() ?? "";

      const whatsappNumber =
        (phoneNumbers[0].replace("+","")); // Get WhatsApp number in international format without '+' or dashes
      const whatsappBase = whatsappNumber
        ? `https://api.whatsapp.com/send?phone=${encodeURIComponent(whatsappNumber)}&text=`
        : "https://api.whatsapp.com/send?text=";
      const whatsappUrl = `${whatsappBase}${encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`,
      )}`;

      window.open(whatsappUrl, "_blank");

      setToast({ type: "success", message: t("contact.sent_success") });

      (e.target as HTMLFormElement).reset();
    } catch {
      setToast({ type: "error", message: t("contact.error_sending") });
    }

    setLoading(false);

    // Auto-hide toast
    setTimeout(() => setToast(null), 3200);
  };
  return (
    <div
      className={`bg-background/60 rounded-3xl p-8 md:p-12 shadow-lg border border-primary-5 opacity-0  ${animationClass}`}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary uppercase tracking-wide">
            {t("contact.name_label")}
          </label>
          <input
            type="text"
            name="name"
            className={`w-full bg-base border-2 rounded-xl px-4 py-3 text-primary transition-colors placeholder:text-muted
              ${
                errors.name
                  ? "border-destructive"
                  : "border-primary-5 focus:border-primary"
              }`}
            placeholder={t("contact.name_placeholder")}
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary uppercase tracking-wide">
            {t("contact.phone_label")}
          </label>
          <input
            type="tel"
            name="phone"
            dir={typeof i18n.dir === "function" ? i18n.dir() : (i18n.language?.startsWith("ar") ? "rtl" : "ltr")}
            className={`w-full bg-base border-2 rounded-xl px-4 py-3 text-primary transition-colors placeholder:text-muted
              ${
                errors.phone
                  ? "border-destructive"
                  : "border-primary-5 focus:border-primary"
              }`}
            placeholder={t("contact.phone_placeholder")}
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary uppercase tracking-wide">
            {t("contact.message_label")}
          </label>
          <textarea
            name="message"
            rows={4}
            className={`w-full bg-base border-2 rounded-xl px-4 py-3 text-primary resize-none transition-colors placeholder:text-muted
              ${
                errors.message
                  ? "border-destructive"
                  : "border-primary-5 focus:border-primary"
              }`}
            placeholder={t("contact.message_placeholder")}
          />
        </div>

        {/* Toast */}
        {toast && (
          <Toast type={toast.type || ""} message={toast.message || " "} />
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-primary text-background font-bold text-lg py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 mt-auto
            ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-lg hover:-translate-y-1"
            }`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-bg border-t-transparent"></div>
          ) : (
            <>
              <span>{t("contact.send_message")}</span>
              <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
