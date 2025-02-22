import { readServiceMedicalByCode } from "@/actions/services-medical/readServiceMedicalByCode.action";
import { ServicioMedicoByCode } from "@/app/components/screens/servicios-medicos/ServicioMedicoByCode";


interface Props {
  params: Promise<{ codigo_servicio: string }>
}

export default async function ServicioMedicoScreen({ params }: Props) {

  const { codigo_servicio } = await params;

  const { ok, serviceMedical } = await readServiceMedicalByCode(codigo_servicio);

  if (!ok || !serviceMedical) return null;

  return (

    <div className="py-10">
      <ServicioMedicoByCode servicioMedico={serviceMedical} />
      
    </div>
  );
}

