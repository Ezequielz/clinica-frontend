'use client'

import Link from 'next/link';
import { useUIStore } from '@/store/ui/ui.store';
import { IoMenuOutline } from 'react-icons/io5';
import { Logo } from './Logo';


export const Navbar = () => {
    const openSideMenu = useUIStore(state => state.openSideMenu);
    return (
        <nav className="flex z-10   px-3 lg:px-10  justify-between items-center bg-transparent">

            {/* Logo */}

            <Logo />


            {/* Mid Menu */}
            <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 text-cyan-600">
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-purple-500 hover:text-slate-100" href="/servicios-medicos">Especialidades</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-purple-500 hover:text-slate-100" href="/paquetes">Paquetes</Link>
             
            </div>


            {/* MENU */}
            <button
                onClick={openSideMenu}
                className="m-2 p-2 rounded-md transition-all text-cyan-600 hover:bg-purple-500 hover:text-slate-100">
                <IoMenuOutline size={30} />
            </button>


        </nav >
    )
}
