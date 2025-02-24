import { Suspense } from 'react';
import { Title } from '@/app/components/ui/Title';
import { ServicesMedicalList } from '@/app/components/screens/servicios-medicos/ServicesMedicalList';
import { SkeletonServicesMedicalList } from '@/app/components/screens/servicios-medicos/ui/SkeletonServicesMedicalList';

export default function ServiciosMedicosScreen() {
  return (
    <div className="relative w-full ">
      <header className="px-8 md:px-12 py-2 ">

        <Title title="Todos nuestros servicios" />
      </header>
      <Suspense fallback={<SkeletonServicesMedicalList />} >
        <ServicesMedicalList />
      </Suspense>
    </div>
  );
}

