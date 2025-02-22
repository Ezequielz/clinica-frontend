import { Metadata } from 'next';
import { Title } from '@/app/components/ui/Title';
import { AddMedico } from '@/app/components/admin/medicos/ui/AddMedico';

export const metadata: Metadata = {
    title: 'Admin',
    description: "Dashboard administrativo",
};
export default async function AdminMedicosLayout({ children }: {
    children: React.ReactNode;
}) {

    return (
        <div className="px-10 xl:ml-32  ">

            <header className='py-5 z-10 fixed bg-slate-50 w-full flex gap-6 items-center'>
                <Title title={"Administración de médicos"} />
                <AddMedico />
            </header>
            <section className='pt-24'>
                {children}

            </section>
        </div>

    );
}