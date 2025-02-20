
'use client';
import { enqueueSnackbar } from 'notistack';
import { ButtonDefault } from '@/app/components/ui/buttons/ButtonDefault';
import { redirect } from 'next/navigation';
import { deleteOrderById } from '@/actions/orders/deleteOrderById.action';

interface Props {
    orderId: string;
};

export const DeleteOrder = ({ orderId }: Props) => {


    const handleDelete = async () => {
        const { ok, message } = await deleteOrderById(orderId);

        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Orden eliminada', { variant: 'success' });

        redirect('/admin/orders');
    };

    return (
        <ButtonDefault
            label="Eliminar órden"
            className="bg-red-500 hover:bg-red-400"
            onClick={handleDelete}

        />
    )
}
