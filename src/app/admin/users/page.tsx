import { UserTable } from '@/app/components/admin/users/table/UserTable';
import { SkeletonUserTable } from '@/app/components/admin/users/ui/SkeletonUserTable';
import { Title } from '@/app/components/ui/Title';
import { Suspense } from 'react';


export default async function AdminUsersPage() {

  return (
    <div className="px-10 xl:ml-32  ">
      <header className='py-5 z-10 fixed bg-slate-50 w-full'>
        <Title title={"Administración de usuarios"} />

      </header>
      <section className='pt-20'>
        <Suspense fallback={ <SkeletonUserTable /> } >
          <UserTable />
        </Suspense>

      </section>

    </div>
  );
}