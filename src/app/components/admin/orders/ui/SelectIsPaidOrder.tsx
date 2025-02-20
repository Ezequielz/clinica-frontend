'use client';
import { IoIosArrowDown } from 'react-icons/io';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { updateOrder } from '@/actions/orders/updateOrder.action';

interface Props {
    orderId: string;
    currentStatus: boolean;
}

export const SelectIsPaidOrder = ({ orderId, currentStatus }: Props) => {

    const [isPaid, setIsPaid] = useState<boolean>(currentStatus);

    useEffect(() => {
        setIsPaid(currentStatus);
    }, [currentStatus]);

    const updateOrderRole = async (newStatus: boolean) => {

        const { ok, message } = await updateOrder({ orderId, pagado: newStatus });
        if (!ok) return enqueueSnackbar(message, { variant: "error" });
        enqueueSnackbar(`Rol actualizado`, { variant: "success" });
    };

    return (
        <div className="relative inline-flex self-center z-0">
            <IoIosArrowDown size={20} className="absolute top-0.5 right-0.5 pointer-events-none" />
            <select
                value={isPaid.toString()}
                onChange={(e) => updateOrderRole(e.target.value === "true")}
                className="text-sm font-bold rounded border-2 border-violet-700 text-gray-600 h-fit w-fit pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            >
                <option value="true">Pagado</option>
                <option value="false">Impago</option>
            </select>
        </div>
    )
}
