'use client';
import { IoIosArrowDown } from 'react-icons/io';
import { UserRol } from '@/app/interfaces/user';
import { enqueueSnackbar } from 'notistack';
import { updateUser } from '@/actions/users/updateUser.action';
import { useEffect, useState } from 'react';

interface Props {
    userId: string;
    currentUserRol: UserRol;

}

export const SelectRol = ({ userId, currentUserRol }: Props) => {

    const [selectedRol, setSelectedRol] = useState<UserRol>(UserRol.USER);

    useEffect(() => {
        setSelectedRol(currentUserRol);
    }, [currentUserRol]);

    const updateUserRole = async (newRol: UserRol) => {

        const { ok, message } = await updateUser({ id: userId, rol: newRol });

        if (!ok) return enqueueSnackbar(`Hubo un error al actualizar el rol, ${message}`, { variant: "error" });
        enqueueSnackbar(`Rol actualizado`, { variant: "success" });
    };

    return (
        <div className="relative inline-flex self-center z-0">
            <IoIosArrowDown size={20} className="absolute top-0.5 right-0.5 pointer-events-none" />
            <select
                value={selectedRol}
                onChange={(e) => updateUserRole(e.target.value as UserRol)}
                className="text-sm font-bold rounded border-2 border-violet-700 text-gray-600 h-fit w-fit pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            >
                <option value={UserRol.ADMIN}>Admin</option>
                <option value={UserRol.USER}>User</option>
            </select>
        </div>
    )
}
