import { Suspense } from 'react';
import { Title } from '@/app/components/ui/Title';
import { PaquetesList } from '@/app/components/screens/paquetes/PaquetesList';
import { SkeletonPaquetesList } from '@/app/components/screens/paquetes/ui/SkeletonPaquetesList';


export default function PaquetesScreen() {
  return (
    <div className="relative w-full ">
        <header className="px-7 md:px-12 py-2 ">

        <Title title="Todos nuestros paquetes" />
      </header>
      <Suspense fallback={<SkeletonPaquetesList />} >
        <PaquetesList />
      </Suspense>
    </div>
  );
}