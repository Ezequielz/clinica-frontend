import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';

// import { ReservaTurnos } from '@/app/components/screens/reserva/ReservaTurnos';
import { Title } from '@/app/components/ui/Title';
import { readPaqueteByCode } from '@/actions/paquetes/readPaqueteByCode.action';
import { ReservaTurnosPack } from '@/app/components/screens/reserva/ReservaTurnosPack';


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

    const { ok, paquete } = await readPaqueteByCode(code);

    if (!ok || !paquete) {
        return (
            <div className="min-h-screen p-20">
                No se pudo obtener servicio médico, pruebe mas tarde o pongase en contacto con la clínica
            </div>
        )
    }

    return (
        <div>
            <header className="px-12 py-2 ">

                <Title title={`Reserva de turno - ${paquete.nombre}`} />
            </header>
      
            <ReservaTurnosPack paquete={paquete} />


        </div>
    )
}