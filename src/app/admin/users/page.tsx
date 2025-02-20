import { UserTable } from '@/app/components/admin/users/table/UserTable';
import { Title } from '@/app/components/ui/Title';


export default async function AdminUsersPage() {

  return (
    <div className="px-10 xl:ml-32  ">
      <header className='py-5 z-10 fixed bg-slate-50 w-full'>
        <Title title={"Administración de usuarios"} />

      </header>
      <section className='pt-20'>
        <UserTable />

      </section>

    </div>
  );
}