'use client'

import { useUIStore } from "@/store/ui/ui.store";
import { clsx } from "clsx";


interface Props {
    children?: React.ReactNode;
}

export const Modal = ({ children }: Props) => {
    const modal = useUIStore(state => state.modal)
    const closeModal = useUIStore(state => state.closeModal)
    

    const handleCloseDialog = () => {

        closeModal()
    }
   
    return (
        <section
            className={
                clsx(
                    "",
                    {
                        "hidden": !modal
                    }
                )
            }>


            {/* Blur */}

            <div
                onClick={handleCloseDialog}
                className=" fade-in fixed top-0 left-0 w-screen h-screen z-30 backdrop-filter backdrop-blur-sm "
            />
            <article className=" overflow-y-auto rounded-lg fixed lg:px-5 py-4 w-screen sm:w-3/4  lg:w-fit  m-auto inset-x-0 inset-y-0 bg-slate-100 z-30 shadow-2xl  transition-all duration-300 h-5/6">

                {children}
            </article>


        </section>
    );
};