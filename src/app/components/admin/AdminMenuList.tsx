'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";

interface Props {
    label: string;
    href: string;

    icon: React.ReactNode;
}

export const AdminMenuList = ({ label, href, icon }: Props) => {

    const path = usePathname();

    return (
        <Link
            href={`${href}`}
            className={`${href === path && 'bg-cyan-500 text-white' } hover:bg-cyan-400/75 hover:text-white active:bg-white/30 middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 w-full flex items-center gap-2 px-4 capitalize`}

        >
            <span>

                {icon}
            </span>
            <p className="block antialiased  md:text-base leading-relaxed font-medium capitalize">
                {label}
            </p>
        </Link>
    )
}