import Link from 'next/link';
import { auth } from '@/auth.config';
import { logout } from '@/actions/auth/logout.action';


export const Navbar = async () => {
    const session = await auth();
    
    return (
        <nav className="flex  px-3 lg:px-10  justify-between items-center">

            {/* Logo */}
            <div className='relative py-3'>
                <Link
                    href="/">
                    <span className={`antialiased font-bold`} >Clinica</span>

                </Link>
            </div>

            {/* Mid Menu */}


            {/* MENU */}
            {
                session?.user ? (
                   <button
                    onClick={logout}
                   >
                    salir
                   </button>

                ) : (
                    <Link
                        href={"/auth/login"}
                    >
                        <span className={`antialiased font-bold`} >Login</span>
                    </Link >
                )
            }


        </nav >
    )
}
