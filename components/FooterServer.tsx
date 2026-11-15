interface FooterServerProps {
  rightsReserved: string;
}

export function FooterServer({ rightsReserved }: FooterServerProps) {
  return (
    <footer className="bg-primary text-white text-center py-4">
      <p>&copy; {new Date().getFullYear()} <a href="https://wasalat.org" className="text-white hover:underline uppercase">wasalat</a>. {rightsReserved}</p>
    </footer>
  );
}