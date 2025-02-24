
import { Suspense } from "react";

import { PanelUsers } from "./panels/PanelUsers";
import { PanelServiciosMedicos } from "./panels/PanelServiciosMedicos";
import { PanelOrders } from "./panels/PanelOrders";
import { PanelPaquetes } from "./panels/PanelPaquetes";
import { PanelConsultas } from "./panels/PanelConsultas";
import { PanelGanancias } from "./panels/PanelGanancias";
import { PanelMedicos } from "./panels/PanelMedicos";
import { SkeletonPanel } from "./ui/SkeletonPanel";

export const Dashboard = async () => {


    return (
        <div className="p-6 grid gap-10 md:grid-cols-2 xl:grid-cols-3 mt-5">

            <Suspense fallback={<SkeletonPanel />}>
                <PanelUsers />
            </Suspense>
            <Suspense fallback={<SkeletonPanel />}>
                <PanelMedicos />
            </Suspense>
            <Suspense fallback={<SkeletonPanel />}>
                <PanelServiciosMedicos />
            </Suspense>
            <Suspense fallback={<SkeletonPanel />}>
                <PanelOrders />
            </Suspense>
            <Suspense fallback={<SkeletonPanel />}>
                <PanelPaquetes />
            </Suspense>
            <Suspense fallback={<SkeletonPanel />}>
                <PanelConsultas />
            </Suspense>
            <Suspense fallback={<SkeletonPanel />}>
                <PanelGanancias />
            </Suspense>



        </div>
    )
}