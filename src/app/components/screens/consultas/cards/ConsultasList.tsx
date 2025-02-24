import { Consulta } from "@/app/interfaces/consultasByPaciente"
import { ConsultaCard } from "./ConsultaCard"


interface Props {
    consultas: Consulta[]
}

export const ConsultasList = ({ consultas }: Props) => {

    if (!consultas){
        return (
            <div>
                No se puedo obtener consultas.
            </div>
        )
    }

    return (
        <section className="grid sm:grid-cols-2 gap-2">
            {
                consultas.map(consulta => (
                    <ConsultaCard
                        key={consulta.id}
                        consulta={consulta}
                    />
                ))
            }

        </section>
    )

}
