import { readInfo } from "@/actions/info/readInfo.action"
import { InfoBannerCard } from "./InfoBannerCard";
import { IoAccessibilityOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { FaTruckMedical } from "react-icons/fa6";

interface Info {
    label: string;
    icon: React.ReactNode;
    from?: number;
    to: number
}

export const InfoBanner = async () => {

    const { ok, info } = await readInfo();
    if (!ok) return null;
    const infoArr: Info[] = [
        {
            label: 'Pacientes',
            icon: <IoAccessibilityOutline size={45} color="#1875c1" />,
            to: info?.pacientes ?? 0
        },
        {
            label: 'Médicos',
            icon: <FaUserDoctor size={45} color="#1875c1" />,
            to: info?.medicos ?? 0
        },
        {
            label: 'Servicios',
            icon: <FaTruckMedical size={45} color="#1875c1" />,
            to: info?.serviciosMedicos ?? 0
        },
    ]
    return (
        <section className="w-full mt-10 md:px-32 md:mt-10 min-h-[400px] sm:min-h-[450px] md:min-h-[600px]
       
        bg-slate-100 
        bg-bottom
        bg-contain
        bg-[url(https://res.cloudinary.com/zapataezequiel/image/upload/v1740373466/fondo-md.webp)]
        lg:bg-[url(https://res.cloudinary.com/zapataezequiel/image/upload/v1738798365/clinica/fondo1.webp)]
        lg:bg-top bg-no-repeat
        lg:bg-cover
        ">

            <header className="p-5 flex justify-center">
                <h3 className="text-balance text-lg md:text-2xl py-2 m-auto w-full  ">
                    Cada día más personas confían en nosotros, y gracias a ello seguimos creciendo para brindarte más y mejores servicios médicos con el respaldo de nuestros especialistas.
                </h3>
            </header>
            <div className="flex gap-5 md:gap-2  justify-center">
                {
                    infoArr.map(inf => (

                        <InfoBannerCard
                            key={inf.label}
                            {...inf}
                        />
                    ))
                }

            </div>

        </section>
    )
}
