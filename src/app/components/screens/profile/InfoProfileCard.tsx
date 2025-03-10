

import Image from "next/image";
import { formatDate } from "@/helpers/FormatDate";
import { readUserById } from "@/actions/users/readUserById";


interface Props {
    userId: string
}

export const InfoProfileCard = async({userId}: Props) => {

    const { ok, user} = await readUserById(userId);

    if (!ok || !user) return null;
    return (
        <div className="mt-4 flex flex-col sm:flex-row justify-center m-auto shadow-lg rounded-lg w-fit md:w-full max-w-xl ">
           
            <div className='md:w-1/2 flex flex-col items-center p-6 bg-cyan-500 md:rounded-l-lg'>

                <Image
                    height={500}
                    width={500}
                    src={user.imagen ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp'}
                    alt='profile'
                    className="w-32 h-32 rounded-full mb-4 border-2 border-gray-300"
                />
                <h2 className="text-2xl font-bold text-center text-white  ">{`${user.nombre} ${user.apellido}`}</h2>

            </div>


            <div className="w-full relative flex flex-col min-h-full  bg-white md:rounded-r-lg">
                {/* Logo */}
                <Image

                    src={'https://res.cloudinary.com/zapataezequiel/image/upload/v1738863076/clinica/logo1.webp'}
                    alt="logo"
                    height={500}
                    width={500}
                    className="hidden sm:block w-32 h-3w-32 object-cover absolute top-0 right-0"
                />
                <div className="flex flex-col flex-grow justify-between h-full">

                    {/* Lista centrada */}
                    <ul className='flex-grow flex flex-col justify-end px-6'>
                        <li className=" flex gap-2 items-center">
                            <p className="text-gray-600"><strong>Email:</strong> {user.email} </p>
                        </li>
                        <li className=" flex gap-2 items-center">
                            <p className="text-gray-600"><strong>Edad:</strong> {user.fecha_nac ? formatDate.DateToString(new Date(user.fecha_nac)) : '-'} </p>
                        </li>
                        <li className=" flex gap-2 items-center">
                            <p className="text-gray-600"><strong>Telefono:</strong> {user.telefono ? user.telefono : '-'} </p>
                        </li>
                    
                        <li className="">
                            <p className="text-gray-600"><strong>DNI:</strong> {user.dni ? user.dni : '-'} </p>
                        </li>
                        <li className="">
                            <p className="text-gray-600"><strong>Obra social:</strong> {user.paciente.obra_social ? 'Si' : 'No registrada'} </p>
                        </li>
                      
                    </ul>

                    {/* Footer pegado abajo */}
                    <footer className=" text-center border-t p-2 bg-purple-500 md:rounded-br-lg text-white">
                        {user.id}
                    </footer>
                </div>

            </div>

        </div>
    )
}
