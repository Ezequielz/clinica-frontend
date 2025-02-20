'use client';

import Link from 'next/link'
import { IoAdd } from 'react-icons/io5'
import { ButtonDefault } from '@/app/components/ui/buttons/ButtonDefault'
import { usePathname } from 'next/navigation';

export const AddPaquete = () => {
    const path = usePathname();
    const isPathNewService = (path.split('/').pop() === 'new')

    if (isPathNewService) return null;
    return (
        <Link
            href={'/admin/paquetes/new'}
        >
            <ButtonDefault
                label='Agregar paquete'
                icon={<IoAdd size={25} />}
            />
        </Link>
    )
}
