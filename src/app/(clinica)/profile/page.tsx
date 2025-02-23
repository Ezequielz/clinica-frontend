import { InfoProfileCard } from "@/app/components/screens/profile/InfoProfileCard";
import { ModalEditProfile } from "@/app/components/screens/profile/ModalEditProfile";
import { ButtonOpenModal } from "@/app/components/ui/ButtonOpenModal";
import { Title } from "@/app/components/ui/Title";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


export default async function ProfileScreen() {
  const session = await auth()
  if (!session?.user.id) {
    redirect('/auth/login')
  }
  return (
    <div className="relative w-full px-20 min-h-screen">
      <Title title='Mi Perfil' />

      <ModalEditProfile />
      <InfoProfileCard userId={session.user.id} />
      <ButtonOpenModal label="Editar Credencial" />


    </div>
  );
}