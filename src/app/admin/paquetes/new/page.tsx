import { readServicesMedical } from '@/actions/services-medical/readServicesMedical.action';
import { CreatePaqueteForm } from '@/app/components/admin/paquetes/ui/CreatePaqueteForm';


export default async function AdminAddPaquetePage() {

    const {ok, servicesMedical} = await readServicesMedical();
    if (!ok || !servicesMedical){
        return (
            <div>
                No se pudo obtener el listado de servicios disponibles
            </div>
        )
    }

    return (
        <CreatePaqueteForm serviciosDisponibles={servicesMedical}/>
    );
}