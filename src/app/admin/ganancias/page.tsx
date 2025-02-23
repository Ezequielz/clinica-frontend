import { GananciasForm } from '@/app/components/admin/ganancias/ui/GananciasForm';
import { Title } from '@/app/components/ui/Title';


export default async function AdminGananciasPage() {

  return (
    <div className="px-10 xl:ml-32  ">
      <header className='py-5 z-10 fixed bg-slate-50 w-full'>
        <Title title={"Administración de Ganancias"} />

      </header>
      <section className='pt-20'>
        <GananciasForm />
      </section>

    </div>
  );
}