import { readMedicoById } from "@/actions/medicos/readMedicoById";
import { readServicesMedical } from "@/actions/services-medical/readServicesMedical.action";
import { EditMedicoForm } from "@/app/components/admin/medicos/ui/EditMedicoForm";


interface Props {
    params: Promise<{ id: string }>
  }
  
export default async function EditMedicoPage({ params }: Props) {

      const { id } = await params;
      const [ medicoResponse, serviciosResponse ] = await Promise.all([
        readMedicoById(id),
        readServicesMedical(),
      ])


    
      const { ok: okMedico, medico } = medicoResponse; 
      const {servicesMedical} = serviciosResponse;
    
      if (!okMedico || !medico) return null;

      return (
       <EditMedicoForm medico={medico} servicesMedical={servicesMedical ?? []} />
      )

}