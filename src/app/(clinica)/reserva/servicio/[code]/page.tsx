import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';

import { ReservaTurnosServicio } from '@/app/components/screens/reserva/ReservaTurnosServicio';
import { Title } from '@/app/components/ui/Title';
import { readServiceMedicalByCode } from '@/actions/services-medical/readServiceMedicalByCode.action';


interface Props {
    params: Promise<{ code: string }>
}

export default async function reservaScreen({ params }: Props) {

    const session = await auth();
    if (!session) {
        redirect('/auth/login')
    }
    const { code } = await params
    if (!code) {
        redirect('/servicios-medicos')
    }

    const { ok, servicesMedical } = await readServiceMedicalByCode(code);

    if (!ok || !servicesMedical) {
        return (
            <div className="min-h-screen p-20">
                No se pudo obtener servicio médico, pruebe mas tarde o pongase en contacto con la clínica
            </div>
        )
    }

    return (
        <div>
            <header className="px-12 py-2 ">

                <Title title={`Reserva de turno para ${servicesMedical?.nombre}`} />
            </header>

            <ReservaTurnosServicio servicioMedico={servicesMedical} />
        </div>
    )
}