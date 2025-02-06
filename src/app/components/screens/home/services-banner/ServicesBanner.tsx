import { readServicesMedical } from '@/actions/services-medical/readServicesMedical.action';
import { ServicesBannerSwiper } from './ServicesBannerSwiper';

export const ServicesBanner = async() => {
  const { ok, servicesMedical } = await readServicesMedical();

  if(!ok){
    return null;
  };
  return (
    <ServicesBannerSwiper servicesMedical= {servicesMedical!} />
  )
}
