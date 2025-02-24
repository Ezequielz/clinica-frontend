
'use client'

import { useRef, useState } from 'react';
import Image from 'next/image';
import { User } from 'next-auth';
import { useSession } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';
import { useUIStore } from '@/store/ui/ui.store';
import { readUserBySession } from '@/actions/users/readUserBySession.action';
import { updateUser } from '@/actions/users/updateUser.action';
import { ButtonAnimated } from '../../ui/buttons/ButtonAnimated';
import { ButtonLoading } from '../../ui/buttons/ButtonLoading';
import { ButtonDefault } from '../../ui/buttons/ButtonDefault';


export interface UserUpdate extends Partial<Omit<User, 'email' | 'imagen'>> {
    id: string;
    paciente?: { id_paciente: string; obra_social: boolean };
    password?: string;
    imagen?: string | File;
};



export const UserUpdateForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: session, update } = useSession();
    const closeModal = useUIStore(store => store.closeModal);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserUpdate>({
        defaultValues: async () => {
            const { user } = await readUserBySession();
            return user ? {
                id: user.id ?? "",
                nombre: user.nombre ?? "",
                apellido: user.apellido ?? "",
                telefono: user.telefono ?? "",
                direccion: user.direccion ?? "",
                imagen: user.imagen ?? "",
                dni: user.dni ?? "",
                fecha_nac: user.fecha_nac ?? new Date(),
                email: user.email ?? "",
                paciente: user.paciente
                    ? {
                        id_paciente: user.paciente.id_paciente ?? "",
                        obra_social: user.paciente.obra_social ?? false,
                    }
                    : undefined,
            } : {
                id: "",
                nombre: "",
                apellido: "",
                telefono: "",
                direccion: "",
                imagen: "",
                dni: "",
                fecha_nac: new Date(),
                email: "",
                paciente: undefined,
            };
        }
    });

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (data: UserUpdate) => {
        const updatedData = { ...data, imagen: selectedImage || data.imagen };


        const { ok, message } = await updateUser(updatedData);

        if (ok) {
            enqueueSnackbar('Usuario actualizado', { variant: 'success' });


            const updateSession = await update({
                ...session,
                user: {
                    ...updatedData,
                    imagen: previewUrl,
                },
            });

            console.log({ updateSession })
            closeModal();
        } else {
            enqueueSnackbar(message, { variant: 'error' });
        }


    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full max-w-96 gap-2 " autoComplete='off'>

            <div className="flex flex-col  w-full">

                <Image
                    src={previewUrl ?? session?.user.imagen ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp'}
                    alt="Previsualización"
                    className="mt-2 w-full object-cover "
                    height={500}
                    width={500}
                />
                <input
                    ref={fileInputRef}
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <ButtonDefault
                    label="Subir Imagen"
                    onClick={handleButtonClick}
                    className="w-full"
                    icon={<IoCloudUploadOutline size={25} />}
                />

            </div>

            <input type="password" name="fakePassword" style={{ display: "none" }} autoComplete="off" />
            {[
                { name: 'nombre', label: 'Nombre' },
                { name: 'apellido', label: 'Apellido' },
                { name: 'telefono', label: 'Teléfono' },
                { name: 'direccion', label: 'Dirección' },
                { name: 'dni', label: 'DNI' },
                { name: 'fecha_nac', label: 'Fecha de Nacimiento', type: 'date' },
                { name: 'password', label: 'Contraseña', type: 'password', autoComplete: 'new-password' },

            ].map(({ name, label, type = 'text', }) => (
                <div key={name} className="flex flex-col">
                    <label htmlFor={name}>{label}</label>
                    <input
                        className={clsx(
                            "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                            { 'border-red-500': errors[name as keyof UserUpdate] }
                        )}
                        type={type}
                        {...register(name as keyof UserUpdate, { required: false, })}
                    />
                    {errors[name as keyof UserUpdate]?.type === 'required' && (
                        <span className="text-red-500">*El {label.toLowerCase()} es obligatorio</span>
                    )}
                </div>
            ))}

            <div className="flex gap-2 items-center">

                <input
                    type="checkbox"
                    id="obra_social"
                    {...register("paciente.obra_social")}
                    className="w-5 h-5"
                />
                <label htmlFor='obra_social'>Obra social</label>
            </div>

            <div className='flex justify-center'>
                {
                    isSubmitting
                        ? <ButtonLoading label='Guardando...' />
                        : <ButtonAnimated label='Guardar' />

                }

            </div>

        </form>


    )
}