
'use client';
import { redirect } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { ButtonDefault } from '@/app/components/ui/buttons/ButtonDefault';
import { deletePaquete } from '@/actions/paquetes/deletePaquete.action';

interface Props {
    paqueteCode: string;
};

export const DeletePaquete = ({ paqueteCode }: Props) => {


    const handleDelete = async () => {
        const { ok, message } = await deletePaquete(paqueteCode);

        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Paquete eliminado', { variant: 'success' });

        redirect('/admin/paquetes');
    };

    return (
        <ButtonDefault
            label="Eliminar Paquete"
            className="bg-red-500 hover:bg-red-400"
            onClick={handleDelete}

        />
    )
}
