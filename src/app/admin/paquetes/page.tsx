import { PaquetesTable } from "@/app/components/admin/paquetes/table/PaquetesTable";
import { SkeletonPaquetesTable } from "@/app/components/admin/paquetes/ui/SkeletonPaquetesTable";
import { Suspense } from "react";


export default async function AdminPaquetesPage() {
  return (
    <Suspense fallback={<SkeletonPaquetesTable  />} >
      <PaquetesTable />
    </Suspense>
  );
}