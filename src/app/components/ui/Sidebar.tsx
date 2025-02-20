'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPersonOutline, IoSearchOutline, IoTicketOutline } from 'react-icons/io5';
import { useUIStore } from '@/store/ui/ui.store';
import { UserRol } from '@/app/interfaces/user';
import { logout } from '@/actions/auth/logout.action';
import { MdDashboardCustomize } from 'react-icons/md';




export const Sidebar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user
    const isAdmin = (session?.user?.rol === UserRol.ADMIN)
    
    const handleLogout = async () => {
        await logout();
        window.location.replace('/');
    };

    return (
        <div>

            {/* Background black */}
            {
                isSideMenuOpen && (
                    <div
                        className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                    />

                )
            }


            {/* Blur */}
            {
                isSideMenuOpen && (
                    <div
                        onClick={closeMenu}
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                    />

                )
            }

            {/* Sidemenu */}
            <nav
                className={
                    clsx(
                        "fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                        {
                            "translate-x-full": !isSideMenuOpen
                        }
                    )
                }>


                <IoCloseOutline
                    size={30}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => closeMenu()}
                />
                {
                    session && (
                        <div>
                            Hola, {session?.user?.nombre} !
                        </div>
                    )
                }


                {/* Input */}
                <div className="relative mt-7">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Menú */}

                {
                    isAuthenticated && (
                        <>
                            <Link
                                href="/profile"
                                onClick={() => closeMenu()}
                                className="flex items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <IoPersonOutline size={30} />
                                <span className="ml-3 text-xl">Perfil</span>
                            </Link>

                            <Link
                                href="/consultas"
                                onClick={() => closeMenu()}
                                className="flex items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <IoTicketOutline size={30} />
                                <span className="ml-3 text-xl">Mis consultas</span>
                            </Link>

                            <button
                                className="flex w-full items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all text-red-500"
                                onClick={handleLogout}
                            >
                                <IoLogOutOutline size={30} />
                                <span className="ml-3 text-xl ">Salir</span>
                            </button>
                        </>

                    )
                }

                {
                    !isAuthenticated && (
                        <Link
                            href="/auth/login"
                            onClick={() => closeMenu()}
                            className="flex items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoLogInOutline size={30} />
                            <span className="ml-3 text-xl">Ingresar</span>
                        </Link>

                    )
                }

                {/* Line Separator */}

                {
                    isAdmin && (
                        <>
                            <div className="w-full h-px bg-gray-200 my-2" />

                            <Link
                                href="/admin"
                                onClick={() => closeMenu()}
                                className="flex items-center mt-3 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <MdDashboardCustomize size={30} />
                                <span className="ml-3 text-xl">Dashboard/Admin</span>
                            </Link>


                        </>
                    )
                }


            </nav>





        </div>
    );
};