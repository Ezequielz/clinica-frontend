import { SkeletonConsultasList } from "./SkeletonConsultasList";
import { SkeletonConsultasTable } from "./SkeletonConsultasTable";



export const SkeletonConsultas = () => {
    return (
        <>
            <div className="md:hidden">
                <SkeletonConsultasList />
            </div>

            <div className="hidden md:block"> 
                <SkeletonConsultasTable />
            </div>

        </>
    );
};
