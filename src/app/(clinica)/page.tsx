import { Suspense } from 'react';
import { ServicesBanner } from '../components/screens/home/services-banner/ServicesBanner';
import { InfoBanner } from '../components/screens/home/info/InfoBanner';
import { PaquetesBanner } from '../components/screens/home/paquetes/PaquetesBanner';
import { ObraSocialBanner } from '../components/screens/home/obra-social/ObraSocial';
import { SkeletonServiceBanner } from '../components/screens/home/services-banner/ui/SkeletonServiceBanner';
import { SkeletonInfoBanner } from '../components/screens/home/info/ui/SkeletonInfoBanner';

export default function Home() {

  return (
    <div className="relative w-full">
      <Suspense fallback={<SkeletonServiceBanner />} >
        <ServicesBanner />
      </Suspense>

      <PaquetesBanner />


      <ObraSocialBanner />

      <Suspense fallback={<SkeletonInfoBanner />}>
        <InfoBanner />
      </Suspense>
    </div>
  );
}
