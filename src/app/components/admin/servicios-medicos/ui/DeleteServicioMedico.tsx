
'use client';
import { enqueueSnackbar } from 'notistack';
import { deleteServiceMedical } from '@/actions/services-medical/deleteServiceMedical.action';
import { ButtonDefault } from '@/app/components/ui/buttons/ButtonDefault';
import { redirect } from 'next/navigation';

interface Props {
    servicioId: string;
};

export const DeleteServicioMedico = ({ servicioId }: Props) => {


    const handleDelete = async () => {
        const { ok, message } = await deleteServiceMedical(servicioId);

        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Servicio eliminado', { variant: 'success' });

        redirect('/admin/servicios-medicos');
    };

    return (
        <ButtonDefault
            label="Eliminar Servicio"
            className="bg-red-500 hover:bg-red-400"
            onClick={handleDelete}

        />
    )
}
