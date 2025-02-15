'use client'

import { deleteOrderById } from "@/actions/orders/deleteOrderById.action";
import { useState } from "react"
import { IoTrashOutline } from "react-icons/io5"

interface Props {
    orderId: string;
};

export const DeleteOrderButton = ({ orderId }: Props) => {
    const [error, setError] = useState<null | string>(null)

    const handleDelete = async () => {
        const { ok, message } = await deleteOrderById(orderId);
        if (!ok) {
            setError(message ?? 'Error al borrar la consulta, hable con admnistración')
        }
    }

    return (
        <>
            {error && (
                <span className="text-red-500">
                    {error}
                </span>
            )}
            <button
                onClick={handleDelete}
                className='text-red-500 hover:scale-110'
            >
                <IoTrashOutline size={30} />
            </button>
        </>
    )
}
