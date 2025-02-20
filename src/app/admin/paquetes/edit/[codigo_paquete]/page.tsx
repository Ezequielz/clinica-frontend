import { readPaqueteByCode } from "@/actions/paquetes/readPaqueteByCode.action";
import { readServicesMedical } from "@/actions/services-medical/readServicesMedical.action";
import { EditPaqueteForm } from "@/app/components/admin/paquetes/ui/EditPaqueteForm";


interface Props {
    params: Promise<{ codigo_paquete: string }>
  }
  
export default async function EditPaquetePage({ params }: Props) {

      const { codigo_paquete } = await params;
    
      const [paqueteResponse, serviciosMedicosResponse] = await Promise.all([
         readPaqueteByCode(codigo_paquete),
         readServicesMedical(),
      ]);

      const { ok: okPaquete, paquete } = paqueteResponse;
      const { servicesMedical } = serviciosMedicosResponse;

      if (!okPaquete || !paquete){
        return (
          <div>
            Error al obtener paquete
          </div>
        )
      }
  

      return (
        <EditPaqueteForm paquete={paquete} serviciosDisponibles={servicesMedical ?? null} />
      )

}