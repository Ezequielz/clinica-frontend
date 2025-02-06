import Link from 'next/link';
import Image from 'next/image';

export const NotFoundPage = () => {
    return (

        <div className="mt-20 flex items-center justify-center w-full">
            <div className=" px-5 ">
                <div className="w-full relative items-center justify-center flex flex-col">
                    <div className="bg-cyan-500 px-4 py-1 text-xl rounded -rotate-12 absolute top-8 left-28 text-white">
                        No se encontró la página
                    </div>
                    <Image
                        src="https://res.cloudinary.com/zapataezequiel/image/upload/v1738875020/clinica/not-found.webp"
                        alt={'404 image'}
                        width={500}
                        height={500}
                        className='p-5'
                        unoptimized
                    />
                    <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
                        Whoops! Lo sentimos mucho.
                    </p>


                    <Link
                        className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-violet-600 text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-opacity-50" 
                        href={'/'}                    >
                        Ir al Home
                    </Link>
                </div>

            </div>
        </div>
    )
}