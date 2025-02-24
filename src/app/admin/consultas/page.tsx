import { Suspense } from 'react';
import { ConsultasTable } from '@/app/components/admin/consultas/table/ConsultasTable';
import { SkeletonConsultasTable } from '@/app/components/admin/consultas/ui/SkeletonConsultasTable';
import { Title } from '@/app/components/ui/Title';


export default async function AdminConsultasPage() {

  return (
    <div className="px-10 xl:ml-32  ">
      <header className='py-5 z-10 fixed bg-slate-50 w-full'>
        <Title title={"Administración de Consultas"} />

      </header>
      <section className='pt-20'>
        <Suspense fallback={<SkeletonConsultasTable />} >
          <ConsultasTable />
        </Suspense>

      </section>

    </div>
  );
}