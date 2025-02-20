'use client';

import { deleteUser } from "@/actions/users/deleteUser.action";
import { enqueueSnackbar } from "notistack";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
    userId: string;
}

export const ButtonDeleteUser = ({ userId }: Props) => {

    const handleDelete = async () => {

        const { ok, message, user } = await deleteUser(userId);
        if (!ok) return enqueueSnackbar(`Hubo un error al eliminar usuario : ${message} `, { variant: "error" });
        enqueueSnackbar(`usuario ${user?.nombre} eliminado`, { variant: "success" });
    }
    return (
        <button
            onClick={handleDelete}
            className="text-red-500 hover:scale-110 flex justify-center"
        >
          
            <IoTrashOutline size={25} />

        </button>
    )
}
