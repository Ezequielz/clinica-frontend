
import { IoCardOutline, IoPersonOutline } from "react-icons/io5"
import { MdDashboardCustomize } from "react-icons/md"
import { MdOutlineLocalHospital } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { AdminMenuList } from "./AdminMenuList";
import { Logo } from "../ui/Logo";


const menu = [
    {
        href: '/admin',
        icon: <MdDashboardCustomize size={30} />,
        label: 'Dashboard',

    },
    {
        href: '/admin/users',
        icon: <IoPersonOutline size={30} />,
        label: 'Usuarios',

    },
    {
        href: '/admin/servicios-medicos',
        icon: <MdOutlineLocalHospital size={30} />,
        label: 'Servicios',

    },
    {
        href: '/admin/orders',
        icon: <IoCardOutline size={30} />,
        label: 'Orders',

    },
    {
        href: '/admin/paquetes',
        icon: <TbListDetails size={30} />,
        label: 'Paquetes',
    },

]

export const AdminAside = () => {


    return (
        <aside className="border-4 border-r-cyan-500 hidden fixed inset-0 z-0 h-full xl:block  xl:w-44 2xl:w-72 py-4">

            <Logo />

            <ul className="mb-4 flex flex-col justify-start items-start gap-1 py-5">
                {
                    menu.map(({ label, href, icon }) => (
                        <li key={label} className=" w-full">
                            <AdminMenuList label={label} href={href} icon={icon} />
                        </li>
                    ))
                }

            </ul>


        </aside>
    )
}