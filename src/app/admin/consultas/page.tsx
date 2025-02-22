import { ConsultasTable } from '@/app/components/admin/consultas/table/ConsultasTable';
import { Title } from '@/app/components/ui/Title';


export default async function AdminConsultasPage() {

  return (
    <div className="px-10 xl:ml-32  ">
      <header className='py-5 z-10 fixed bg-slate-50 w-full'>
        <Title title={"Administración de Consultas"} />

      </header>
      <section className='pt-20'>
        <ConsultasTable />

      </section>

    </div>
  );
}