
interface Props {
  params: Promise<{ id: string }>
}

export default async function OrderScreen({ params }: Props) {

  const { id } = await params;

//   const { ok, paquete } = await readPaqueteByCode(codigo_paquete);



  return (

    <div className="py-10">
        order screen {id}
      
    </div>
  );
}