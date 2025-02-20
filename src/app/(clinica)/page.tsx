import { Suspense } from "react";
import { ServicesBanner } from "../components/screens/home/services-banner/ServicesBanner";
import { InfoBanner } from "../components/screens/home/info/InfoBanner";
import { PaquetesBanner } from "../components/screens/home/paquetes/PaquetesBanner";
import { ObraSocialBanner } from "../components/screens/home/obra-social/ObraSocial";

export default function Home() {

  return (
    <div className="relative w-full">
      {/* TODO generar skeleton */}
      <Suspense fallback={<div>Cargando...</div>} >

        <ServicesBanner />
      </Suspense>



      <Suspense fallback={<div>Cargando...</div>}>

        <PaquetesBanner />
      </Suspense>

      <ObraSocialBanner />

      <Suspense fallback={<div>Cargando...</div>}>

        <InfoBanner />
      </Suspense>




    </div>
  );
}
