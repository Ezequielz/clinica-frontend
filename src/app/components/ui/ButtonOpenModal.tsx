'use client'

import { CiEdit } from 'react-icons/ci';
import { useUIStore } from '@/store/ui/ui.store';

interface Props {
    label?: string;
};

export const ButtonOpenModal = ({ label }: Props) => {
    const openModal = useUIStore(store => store.openModal);
    return (
        <button
            onClick={openModal}
            className="m-auto text-purple-500 my-2 border-2 border-purple-500 px-4 py-2 rounded-lg hover:bg-purple-500 hover:text-white flex gap-2 items-center justify-center"
        >   
            <span>
                {label}
            </span>
            <CiEdit
                size={30}
            />
        </button>
    )
}