import { readConsultasByUser } from '@/actions/consultas/readConsultasByUser.action'
import { ConsultasTable } from './table/ConsultasTable';
import { ConsultasList } from './cards/ConsultasList';

export const Consultas = async () => {

    const { ok, consultas } = await readConsultasByUser();
    if (!ok || !consultas) {
        return (
            <div>
                No tienes consultas registradas
            </div>
        )
    }

    return (
        <>

            <div className='md:hidden mt-4'>
                <ConsultasList consultas={consultas} />
            </div>
            <div className='hidden md:block mt-4'>

                <ConsultasTable consultas={consultas} />
            </div>

        </>
    )
}
