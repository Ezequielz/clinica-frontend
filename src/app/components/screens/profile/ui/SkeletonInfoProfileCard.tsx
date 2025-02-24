import Image from "next/image";

export const SkeletonInfoProfileCard = () => {
    return (
        <div className="mt-4 flex flex-col sm:flex-row justify-center m-auto shadow-lg rounded-lg w-full max-w-xl ">

            <div className='md:w-1/2 flex flex-col items-center p-6 bg-cyan-500 rounded-l-lg'>
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 border-2 border-gray-300 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>

            <div className="w-full relative flex flex-col min-h-full  sm:rounded-r-lg">
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
                            <div className="text-gray-600 flex gap-2 items-center"><strong>Email:</strong> <div className="bg-slate-200 animate-pulse h-4 w-20" /> </div>
                        </li>
                        <li className=" flex gap-2 items-center">
                            <div className="text-gray-600 flex gap-2 items-center"><strong>Edad:</strong> <div className="bg-slate-200 animate-pulse h-4 w-14" /> </div>
                        </li>
                        <li className=" flex gap-2 items-center">
                            <div className="text-gray-600 flex gap-2 items-center"><strong>Telefono:</strong>  <div className="bg-slate-200 animate-pulse h-4 w-32" /></div>
                        </li>

                        <li className="">
                            <div className="text-gray-600 flex gap-2 items-center"><strong>DNI:</strong>  <div className="bg-slate-200 animate-pulse h-4 w-24" /></div>
                        </li>
                        <li className="">
                            <div className="text-gray-600 flex gap-2 items-center"><strong>Obra social:</strong> <div className="bg-slate-200 animate-pulse h-4 w-8" /></div>
                        </li>

                    </ul>

                    {/* Footer pegado abajo */}
                    <footer className=" text-center border-t p-2 h-10 bg-purple-500 sm:rounded-br-lg px-5">
                        <div className="bg-slate-200 animate-pulse h-6 w-full m-auto " />
                    </footer>
                </div>
            </div>
        </div>
    );
};
