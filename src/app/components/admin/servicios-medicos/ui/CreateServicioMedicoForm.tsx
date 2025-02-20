
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
import { createServicesMedical } from '@/actions/services-medical/createServicesMedical.action';


export interface CreateServicioMedicoDTO {
    codigo_servicio: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: string | File;
};

export const CreateServicioMedicoForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateServicioMedicoDTO>();

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


    const onSubmit = async (data: CreateServicioMedicoDTO) => {
        const createdData = { ...data, imagen: selectedImage || data.imagen };

        const { ok, message } = await createServicesMedical(createdData);

        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Servicio creado', { variant: 'success' });
        reset();
        setSelectedImage(null);
        setPreviewUrl(null);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full " autoComplete='off'>

            <div className="flex gap-8 ">

                <div className="flex flex-col  w-fit">

                    <Image
                        src={previewUrl ?? 'https://res.cloudinary.com/zapataezequiel/image/upload/v1738967258/default-image-not-found.webp'}
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
                        { name: 'codigo_servicio', label: 'Código del servicio' },
                        { name: 'nombre', label: 'Nombre' },
                        { name: 'precio', label: 'Precio', type: 'number' },
                    ].map(({ name, label, type }) => (
                        <div key={name} className="flex flex-col">
                            <label htmlFor={name}>{label}</label>
                            <input
                                className={clsx(
                                    "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                                    { 'border-red-500': errors[name as keyof CreateServicioMedicoDTO] }
                                )}
                                type={type}
                                {...register(name as keyof CreateServicioMedicoDTO, { required: false, })}
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
                            { 'border-red-500': errors['descripcion' as keyof CreateServicioMedicoDTO] }
                        )}

                        {...register('descripcion' as keyof CreateServicioMedicoDTO, { required: false, })}
                    />

                </div>

            </div>



            <div className='flex justify-center'>
                {
                    isSubmitting
                        ? <ButtonLoading label='Creando...' />
                        : <ButtonAnimated label='Crear Servicio' />

                }

            </div>
        </form>


    )
}