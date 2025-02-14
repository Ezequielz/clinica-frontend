import { readPaqueteByCode } from "@/actions/paquetes/readPaqueteByCode.action";
import { PaqueteByCode } from "@/app/components/screens/paquetes/PaqueteByCode";


interface Props {
  params: Promise<{ codigo_paquete: string }>
}

export default async function PaqueteScreen({ params }: Props) {

  const { codigo_paquete } = await params;

  const { ok, paquete } = await readPaqueteByCode(codigo_paquete);

  if (!ok || !paquete) return null;

  return (

    <div className="py-10">
      <PaqueteByCode paquete={paquete} />
      
    </div>
  );
}