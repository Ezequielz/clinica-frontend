import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { Consultas } from '@/app/components/screens/consultas/Consultas';
import { Title } from '@/app/components/ui/Title';
import { SkeletonConsultas } from '@/app/components/screens/consultas/ui/SkeletonConsultas';

export default function ConsultasPage() {
    const session = auth();
    if (!session) {
        redirect('/auth/login');
    };

    return (
        <section className="min-h-screen px-5 md:px-20">

            <Title title="Mis Consultas" />


            <Suspense fallback={<SkeletonConsultas />} >
                <Consultas />
            </Suspense>


        </section>
    )
}