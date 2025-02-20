import { Sidebar } from '../components/ui/Sidebar';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';


export default async function ClinicaLayout({ children }: { children: React.ReactNode }) {

  return (
    <main className="min-h-screen relative">
      <Navbar />

      <Sidebar />

      <div className="relative z-0">
        {children}
      </div>

      <Footer />
    </main>
  );
}
