'use client'

import { useUIStore } from "@/store/ui/ui.store";
import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { Modal } from "../../ui/Modal";
import { UserUpdateForm } from "./UserUpdateForm";



export const ModalEditProfile = () => {
    const { data } = useSession()

    const closeModal = useUIStore(store => store.closeModal)
    
   
    if (!data?.user) return null;


    return (
        <Modal >

            <div className="flex flex-col justify-center items-center p-2 rounded-lg max-w-[600px] min-w-[300px]">

                <IoClose
                    onClick={closeModal}
                    className="absolute top-2 right-2 cursor-pointer hover:bg-slate-300  dark:hover:bg-neutral-600 hover:rounded-full"
                    size={30}
                />
                <UserUpdateForm />
            </div>
        </Modal>
    )
}