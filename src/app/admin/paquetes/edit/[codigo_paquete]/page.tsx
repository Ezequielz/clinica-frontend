import { readPaqueteByCode } from "@/actions/paquetes/readPaqueteByCode.action";
import { EditPaqueteForm } from "@/app/components/admin/paquetes/ui/EditPaqueteForm";


interface Props {
    params: Promise<{ codigo_paquete: string }>
  }
  
export default async function EditPaquetePage({ params }: Props) {

      const { codigo_paquete } = await params;
    
     const {ok, paquete} = await readPaqueteByCode(codigo_paquete);
   

      if (!ok || !paquete){
        return (
          <div>
            Error al obtener paquete
          </div>
        )
      }
  

      return (
        <EditPaqueteForm paquete={paquete}  />
      )

}