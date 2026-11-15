"use client";

import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-primary text-white text-center py-4">
            <p>&copy; {new Date().getFullYear()} <a href="https://wasalat.org" className="text-white hover:underline uppercase">wasalat</a>. {t('footer.rights_reserved')}</p>
        </footer>
    );
}