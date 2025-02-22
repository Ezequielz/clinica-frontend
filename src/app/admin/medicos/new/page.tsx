import { readServicesMedical } from "@/actions/services-medical/readServicesMedical.action";
import { readAllUsers } from "@/actions/users/readAllUsers";
import { CreateMedicoForm } from "@/app/components/admin/medicos/ui/CreateMedicoForm";


export default async function AdminAddMedicoPage() {


    const [usersResponse, ServiciosResponse] = await Promise.all([
        readAllUsers('?only-users=true'),
        readServicesMedical(),
    ])

    const { ok: usersOk, users } = usersResponse;
    const { ok: serviciosOk, servicesMedical } = ServiciosResponse;

    if(!usersOk || !users) {
        return (
            <div>Error al obtener los usuarios</div>
        )
    }
    if(!serviciosOk || !servicesMedical) {
        return (
            <div>Error al obtener los servicios médicos disponibles</div>
        )
    }

    return (
        <CreateMedicoForm users={users} serviciosDisponibles={servicesMedical}/>
    );
}