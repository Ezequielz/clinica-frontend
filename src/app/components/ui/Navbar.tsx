'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/store/ui/ui.store';
import { IoMenuOutline } from 'react-icons/io5';


export const Navbar = () => {
    const openSideMenu = useUIStore(state => state.openSideMenu);
    return (
        <nav className="flex z-10   px-3 lg:px-10  justify-between items-center bg-transparent">

            {/* Logo */}

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


            {/* Mid Menu */}
            <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 text-purple-600">
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-purple-500 hover:text-slate-100" href="/servicios">Especialidades</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-purple-500 hover:text-slate-100" href="/paquetes">Paquetes</Link>
             
            </div>


            {/* MENU */}
            <button
                onClick={openSideMenu}
                className="m-2 p-2 rounded-md transition-all text-purple-600 hover:bg-purple-500 hover:text-slate-100">
                <IoMenuOutline size={30} />
            </button>


        </nav >
    )
}
