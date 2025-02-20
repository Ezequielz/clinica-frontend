'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

import { ButtonLoading } from '@/app/components/ui/buttons/ButtonLoading';
import { ButtonAnimated } from '@/app/components/ui/buttons/ButtonAnimated';
import { ButtonDefault } from '@/app/components/ui/buttons/ButtonDefault';

import { PaqueteById } from '@/app/interfaces/paquete';
import { updatePaquete } from '@/actions/paquetes/updatePaquete.action';
import { DeletePaquete } from './DeletePaquete';

export interface UpdatePaqueteDTO {
    id: string;
    nombre?: string;
    imagen?: string | File;
};

interface Props {
    paquete: PaqueteById;
};

export const EditPaqueteForm = ({ paquete }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdatePaqueteDTO>({
        defaultValues: {
            ...paquete,
        }
    });

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file)); // Previsualización de la imagen
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };


    const onSubmit = async (data: UpdatePaqueteDTO) => {
        const updatedData = {
            ...data,
            imagen: selectedImage || data.imagen,
        };

        const { ok, message } = await updatePaquete(updatedData);

        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Servicio actualizado', { variant: 'success' });

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full " autoComplete='off'>

            <div className="flex gap-8 ">

                <div className='w-fit'>

                    <Image
                        src={previewUrl ?? (paquete.imagen ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp')}
                        alt="Previsualización"
                        className="w-72 object-cover"
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




                <div className="flex gap-2">
                    {[
                        { name: 'nombre', label: 'Nombre' },
                    ].map(({ name, label }) => (
                        <div key={name} className="flex flex-col">
                            <label htmlFor={name}>{label}</label>
                            <input
                                className={clsx(
                                    "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                                    { 'border-red-500': errors[name as keyof UpdatePaqueteDTO] }
                                )}

                                {...register(name as keyof UpdatePaqueteDTO, { required: false, })}
                            />

                        </div>
                    ))}


                </div>

            </div>

            {
                    isSubmitting
                        ? <ButtonLoading label='Actualizando...' />
                        : (

                            <div className='flex gap-2 justify-center items-end'>
                                <ButtonAnimated label='Actualizar Paquete' />
                                <DeletePaquete paqueteCode={paquete.codigo_paquete} />
                            </div>
                        )

                }

        </form>


    )
}