import { Sidebar } from "../components/ui/Sidebar";
import { Navbar } from '../components/ui/Navbar';
import { Footer } from "../components/ui/Footer";

export default function ClinicaLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen relative">
      {/* Aseguramos que el Navbar esté arriba */}

      <Navbar />

      <Sidebar />

      <div className="relative z-0">
        {children}
      </div>

      <Footer />
    </main>
  );
}
