import Image from 'next/image';
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
import { PiXLogo } from "react-icons/pi";
export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white  overflow-hidden">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-10 ">

                <div className="w-full mb-6 md:mb-0  flex justify-center">
                    <Image
                        src="https://res.cloudinary.com/zapataezequiel/image/upload/v1738863076/clinica/logo2.webp"
                        alt="Logo TodoClínica"
                        className="w-40  object-contain "
                        height={500}
                        width={500}
                        unoptimized
                    />

                </div>

                <div className='w-full flex gap-6 justify-center'>

                    <IoLogoFacebook size={60} 
                    className='hover:scale-110 cursor-pointer'
                    />
                    <IoLogoInstagram size={60} 
                    className='hover:scale-110 cursor-pointer'
                    />
                    <PiXLogo size={60}
                    className='hover:scale-110 cursor-pointer'
                    />
                </div>

                <div className="w-full  flex justify-center ">

                    <div>
                        <h2 className="text-2xl font-bold">TodoClínica</h2>
                        <p className="text-sm mt-2">CUIL: 30-12345678-9</p>
                        <p className="text-sm">Teléfono: +54 11 5555-5555</p>
                        <p className="text-sm">Dirección: Av. Siempre Viva 742, Buenos Aires</p>
                        <p className="text-sm">Email: contacto@todoclinica.com</p>

                    </div>

                </div>
            </div>


            <div className="border-t border-gray-700 "></div>


            <div className="text-center text-sm text-gray-400  py-6">
                <p>&copy; 2024 TodoClínica. Todos los derechos reservados.</p>
            </div>
        </footer>

    )
}
