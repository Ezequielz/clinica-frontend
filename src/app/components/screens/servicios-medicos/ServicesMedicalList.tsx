import { readServicesMedical } from '@/actions/services-medical/readServicesMedical.action';
import { ServiceMedicalCard } from './ServiceMedicalCard';




export const ServicesMedicalList = async () => {
    const { ok, message, servicesMedical } = await readServicesMedical();

    if (!ok || !servicesMedical) {
        return (
            <div>
                No se pudo obtener los ServiciosMedicosScreen
                <p>{message}</p>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4 px-5 md:px-20">
            {servicesMedical.map((servicio, index) => (
                <ServiceMedicalCard key={servicio.id} servicio={servicio} index={index} />
            ))}
        </section>
    );
};
