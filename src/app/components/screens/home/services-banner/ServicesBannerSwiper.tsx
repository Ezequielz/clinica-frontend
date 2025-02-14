
'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import type { ServicioMedico } from '@/app/interfaces/services-medical';
import { ServiceBannerCard } from './ServiceBannerCard';


interface Props {
    servicesMedical: ServicioMedico[]
};


export const ServicesBannerSwiper = ({ servicesMedical }: Props) => {
    return (

        <Swiper
            // install Swiper modules
            modules={[ Autoplay,Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
        >

            {
                servicesMedical!.map(servicio => (
                    <SwiperSlide
                        style={{ width: 'auto' }}
                        key={servicio.id} >

                        <ServiceBannerCard servicio={servicio} />
                    </SwiperSlide>
                ))
            }
        </Swiper>


    )
}