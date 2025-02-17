import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { UserRol } from '../interfaces/user';
import { AdminAside } from '../components/admin/AdminAside';


export const metadata: Metadata = {
    title: 'Admin',
    description: "Dashboard administrativo",
};
export default async function ShortLayout({ children }: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (!session) {
        redirect('/auth/login')
    }

    if (session.user?.rol !== UserRol.ADMIN) {
        redirect('/')
    }

    return (
        <section className="relative flex-1 overflow-x-hidden overflow-y-hidden m-auto max-w-[1200px]">
            <AdminAside />
            {children}
        </section>
    );
}