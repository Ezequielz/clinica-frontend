import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
    return (
        <Link
            className='flex justify-center items-center'
            href="/"
        >

            <picture className='flex justify-center items-center w-10 h-10'>
                <Image
                    src={'https://res.cloudinary.com/zapataezequiel/image/upload/v1738703392/clinica/logo1.webp'}
                    alt='logo'
                    width={200}
                    height={200}
                    className='object-contain'
                    unoptimized
                    priority
                />
            </picture>
            <span className=' text-cyan-600'> Todo <strong className='-ml-1'>Clínica</strong></span>
        </Link>
    )
}
