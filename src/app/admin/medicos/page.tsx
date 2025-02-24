import { MedicosTable } from "@/app/components/admin/medicos/table/MedicosTable";
import { SkeletonMedicosTable } from "@/app/components/admin/medicos/ui/SkeletonMedicosTable";
import { Suspense } from "react";


export default async function AdminMedicosPage() {
  return (
    <Suspense fallback={<SkeletonMedicosTable />} >

      <MedicosTable />
    </Suspense>
  );
}