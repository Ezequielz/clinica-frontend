
'use client'

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

import { ButtonLoading } from '@/app/components/ui/buttons/ButtonLoading';
import { ButtonAnimated } from '@/app/components/ui/buttons/ButtonAnimated';
import { ButtonDefault } from '@/app/components/ui/buttons/ButtonDefault';

import type { ServicioMedico } from '@/app/interfaces/services-medical';
import { updateServiceMedical } from '@/actions/services-medical/updateServiceMedical.action';
import { DeleteServicioMedico } from './DeleteServicioMedico';

export interface UpdateServicioMedicoDTO {
    id: string;
    nombre?: string;
    descripcion?: string;
    imagen?: string | File;
    precio?: number;
};

interface Props {
    servicioMedico: ServicioMedico
}

export const EditServicioMedicoForm = ({ servicioMedico }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateServicioMedicoDTO>({
        defaultValues: servicioMedico
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


    const onSubmit = async (data: UpdateServicioMedicoDTO) => {
        const updatedData = { ...data, imagen: selectedImage || data.imagen };

        const { ok, message } = await updateServiceMedical(updatedData);

        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Servicio actualizado', { variant: 'success' });

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full " autoComplete='off'>

            <div className="flex gap-8 ">

                <div className="flex flex-col  w-fit">

                    <Image
                        src={previewUrl ?? (servicioMedico.imagen ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp')}
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

                <div className="flex flex-col">
                    {[
                        { name: 'nombre', label: 'Nombre' },
                        { name: 'precio', label: 'Precio', type: 'number' },
                    ].map(({ name, label, type }) => (
                        <div key={name} className="flex flex-col">
                            <label htmlFor={name}>{label}</label>
                            <input
                                className={clsx(
                                    "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                                    { 'border-red-500': errors[name as keyof UpdateServicioMedicoDTO] }
                                )}
                                type={type}
                                {...register(name as keyof UpdateServicioMedicoDTO, { required: false, })}
                            />

                        </div>
                    ))}


                </div>


                <div className="flex flex-col flex-1">
                    <label htmlFor={'descripcion'}>Descripción</label>
                    <textarea
                        rows={5}
                        cols={20}
                        className={clsx(
                            "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800  min-h-[100px]",
                            { 'border-red-500': errors['descripcion' as keyof UpdateServicioMedicoDTO] }
                        )}

                        {...register('descripcion' as keyof UpdateServicioMedicoDTO, { required: false, })}
                    />

                </div>

            </div>



            <div className='flex justify-center'>
                {
                    isSubmitting
                        ? <ButtonLoading label='Actualizando...' />
                        : (

                            <div className='flex gap-2 justify-center items-end'>
                                <ButtonAnimated label='Actualizar Servicio' />
                                <DeleteServicioMedico servicioId={servicioMedico.id} />
                            </div>
                        )

                }

            </div>
        </form>


    )
}