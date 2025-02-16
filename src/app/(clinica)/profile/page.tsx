import { InfoProfileCard } from "@/app/components/screens/profile/InfoProfileCard";
import { ModalEditProfile } from "@/app/components/screens/profile/ModalEditProfile";
import { ButtonOpenModal } from "@/app/components/ui/ButtonOpenModal";
import { Title } from "@/app/components/ui/Title";


export default function ProfileScreen() {
  return (
    <div className="relative w-full px-20 min-h-screen">
      <Title title='Mi Perfil' />

        <ModalEditProfile />
        <InfoProfileCard />
        <ButtonOpenModal label="Editar Credencial" />


    </div>
  );
}