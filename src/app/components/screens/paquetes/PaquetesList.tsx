import { readPaquetes } from '@/actions/paquetes/readPaquetes.action';
import { PaqueteCard } from './PaqueteCard';

export const PaquetesList = async () => {

    const { ok, message, paquetes } = await readPaquetes();
    if (!ok || !paquetes) {
        return (
            <div>
                No se pudo obtener los paquetes
                <p>{message}</p>
            </div>
        );
    }
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 px-20">
            {paquetes.map((paquete, index) => (
                <PaqueteCard key={paquete.codigo_paquete} paquete={paquete!} index={index} />
            ))}
        </section>
    )
}
