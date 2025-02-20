
import { Suspense } from "react";

import { PanelUsers } from "./panels/PanelUsers";
import { PanelServiciosMedicos } from "./panels/PanelServiciosMedicos";
import { PanelOrders } from "./panels/PanelOrders";
import { PanelPaquetes } from "./panels/PanelPaquetes";
import { PanelConsultas } from "./panels/PanelConsultas";
import { PanelGanancias } from "./panels/PanelGanancias";

const panels = [
    {component: <PanelUsers />},
    {component: <PanelServiciosMedicos />},
    {component: <PanelOrders />},
    {component: <PanelPaquetes />},
    {component: <PanelConsultas />},
    {component: <PanelGanancias />},
]


export const Dashboard = async () => {


    return (
        <div className="p-6 grid gap-10 md:grid-cols-2 xl:grid-cols-3 mt-5">
            {
              
                panels.map((panel, index) => {
                  
                    return (
                        <Suspense key={index} fallback={ <div>Cargando...</div> }>
                            {panel.component}
                          
                        </Suspense>

                    )
                })
            }

        </div>
    )
}