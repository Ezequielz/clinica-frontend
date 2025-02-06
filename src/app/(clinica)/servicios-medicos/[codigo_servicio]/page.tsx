import { readServiceMedicalByCode } from "@/actions/services-medical/readServiceMedicalByCode.action";

interface Props {
  params: Promise<{ codigo_servicio: string }>
}

export default async function ServicioMedicoScreen({ params }: Props) {

  const { codigo_servicio } = await params;

  const { ok, servicesMedical } = await readServiceMedicalByCode(codigo_servicio);

  if (!ok) return null;

  return (
    <div className="relative w-full min-h-screen">
      ServicioMedicoScreen {servicesMedical?.nombre}
    </div>
  );
}

