import { readServiceMedicalByCode } from "@/actions/services-medical/readServiceMedicalByCode.action";
import { EditServicioMedicoForm } from "@/app/components/admin/servicios-medicos/ui/EditServicioMedicoForm";


interface Props {
    params: Promise<{ codigo_servicio: string }>
  }
  
export default async function EditServicioMedicoPage({ params }: Props) {

      const { codigo_servicio } = await params;
    
      const { ok, serviceMedical } = await readServiceMedicalByCode(codigo_servicio);
    
      if (!ok || !serviceMedical) return null;

      return (
        <EditServicioMedicoForm servicioMedico={serviceMedical}/>
      )

}