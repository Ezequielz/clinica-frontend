import { ServicesMedicalList } from "@/app/components/screens/servicios-medicos/ServicesMedicalList";
import { Title } from "@/app/components/ui/Title";
import { Suspense } from "react";

export default function ServiciosMedicosScreen() {
  return (
    <div className="relative w-full ">
      <header className="px-12 py-2 ">

        <Title title="Todos nuestros servicios" />
      </header>
      {/* TODO skeletton */}
      <Suspense fallback={<div>Cargando...</div>} >

        <ServicesMedicalList />
      </Suspense>
    </div>
  );
}

