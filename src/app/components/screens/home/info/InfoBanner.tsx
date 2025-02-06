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
            icon: <IoAccessibilityOutline size={50}  color="#1875c1"/>,
            to: info?.pacientes ?? 0
        },
        {
            label: 'Médicos',
            icon: <FaUserDoctor size={50} color="#1875c1" />,
            to: info?.medicos ?? 0
        },
        {
            label: 'Servicios Médicos',
            icon: <FaTruckMedical size={50} color="#1875c1" />,
            to: info?.serviciosMedicos ?? 0
        },
    ]
    return (
        <section className="w-full px-32 mt-10 min-h-[500px]
        bg-[url(https://res.cloudinary.com/zapataezequiel/image/upload/v1738798365/clinica/fondo1.webp)]
        bg-top bg-no-repeat">

            <header className="">
                <h3 className="text-balance text-2xl py-2 text-center ">
                    Cada día más personas confían en nosotros, y gracias a ello seguimos creciendo para brindarte más y mejores servicios médicos con el respaldo de nuestros especialistas.
                </h3>
            </header>
            <div className="flex gap-2  justify-center">
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
