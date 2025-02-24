import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { Title } from '@/app/components/ui/Title';
import { InfoProfileCard } from '@/app/components/screens/profile/InfoProfileCard';
import { ModalEditProfile } from '@/app/components/screens/profile/ModalEditProfile';
import { ButtonOpenModal } from '@/app/components/ui/ButtonOpenModal';
import { SkeletonInfoProfileCard } from '@/app/components/screens/profile/ui/SkeletonInfoProfileCard';


export default async function ProfileScreen() {
  const session = await auth()
  if (!session?.user.id) {
    redirect('/auth/login')
  }
  return (
    <div className="relative w-full px-5 md:px-20 min-h-screen">
      <Title title='Mi Perfil' />

      <ModalEditProfile />
      <Suspense fallback={<SkeletonInfoProfileCard />} >
        <InfoProfileCard userId={session.user.id} />
      </Suspense>
      <ButtonOpenModal label="Editar Credencial" />


    </div>
  );
}