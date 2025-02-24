import { ServiciosMedicosTable } from '@/app/components/admin/servicios-medicos/table/ServiciosMedicosTable';
import { SkeletonServiciosMedicosTable } from '@/app/components/admin/servicios-medicos/ui/SkeletonServiciosMedicosTable';
import { Suspense } from 'react';


export default async function AdminServiciosMedicosPage() {
  return (
    <Suspense fallback={<SkeletonServiciosMedicosTable />} >
      <ServiciosMedicosTable />
    </Suspense>
  );
}