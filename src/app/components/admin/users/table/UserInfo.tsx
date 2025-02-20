import Image from 'next/image';
import { SelectRol } from '../ui/SelectRol';
import { ButtonDeleteUser } from '../ui/ButtonDeleteUser';
import { User } from '@/app/interfaces/allUser';

interface Props {
    user: User;
}


export const UserInfo = async ({user}: Props) => {

    return (
        <tr key={user.id} className='text-gray-500 '>
            <td className=" px-6 border-b  border-gray-200">
                <Image
                    src={user.imagen ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp'}
                    alt='imagen de usuario'
                    width={50}
                    height={50}
                    className='rounded-full'
                    unoptimized
                />

            </td>

            <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
                {user.nombre} {user.apellido}
            </td>

            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {user.email}
            </td>
            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {user.dni ?? '-'}
            </td>
            <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                {user.telefono ?? '-'}
            </td>

            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                <SelectRol userId={user.id} currentUserRol={user.rol} />
            </td>
            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                <ButtonDeleteUser userId={user.id} />
            </td>
        </tr>
    )
}