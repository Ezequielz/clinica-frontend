
'use client';
import { enqueueSnackbar } from 'notistack';
import { ButtonDefault } from '@/app/components/ui/buttons/ButtonDefault';
import { redirect } from 'next/navigation';
import { deleteMedico } from '@/actions/medicos/deleteMedico.action';

interface Props {
    medicoId: string;
};

export const DeleteMedico = ({ medicoId }: Props) => {


    const handleDelete = async () => {
        const { ok, message } = await deleteMedico(medicoId);

        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Médico eliminado', { variant: 'success' });

        redirect('/admin/medicos');
    };

    return (
        <ButtonDefault
            label="Eliminar médico"
            className="bg-red-500 hover:bg-red-400"
            onClick={handleDelete}

        />
    )
}
