/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

import { ButtonLoading } from '@/app/components/ui/buttons/ButtonLoading';
import { ButtonAnimated } from '@/app/components/ui/buttons/ButtonAnimated';
import { ButtonDefault } from '@/app/components/ui/buttons/ButtonDefault';
import { ServicioMedico } from '@/app/interfaces/services-medical';
import { createPaquete } from '@/actions/paquetes/createPaquete.action';

export interface CreatePaqueteDTO {
    codigo_paquete: string;
    nombre: string;
    servicios_incluidos: string[];
    imagen?: string | File;
};

interface Props {
    serviciosDisponibles: ServicioMedico[] | null
}


export const CreatePaqueteForm = ({ serviciosDisponibles }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm<CreatePaqueteDTO>();

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

    const selectedServices = watch("servicios_incluidos") || [];
    const handleCheckboxChange = (codigo_servicio: string) => {
        const newSelectedServices = selectedServices.includes(codigo_servicio)
            ? selectedServices.filter(code => code !== codigo_servicio)
            : [...selectedServices, codigo_servicio];

        setValue("servicios_incluidos", newSelectedServices);
    };

    const selectedServiceObjects = useMemo(() => {
        return serviciosDisponibles?.filter(servicio => selectedServices.includes(servicio.codigo_servicio)) || [];
    }, [selectedServices, serviciosDisponibles]);

    const totalPrecio = useMemo(() => {
        return selectedServiceObjects.reduce((sum, servicio) => sum + servicio.precio, 0);
    }, [selectedServiceObjects]);

    const discount = totalPrecio * 0.15;


    const onSubmit = async (data: CreatePaqueteDTO) => {
        const createdData = {
            ...data,
            imagen: selectedImage || data.imagen,
            serviciosCodes: selectedServices
        };

        const { ok, message } = await createPaquete(createdData);

        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Paquete creado', { variant: 'success' });
        reset();
        setSelectedImage(null);
        setPreviewUrl(null);

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full " autoComplete='off'>

            <div className="flex gap-8 ">

                <div className="flex flex-col w-1/3">

                    <div className='w-fit'>

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


                    <div className=''>
                        <h4 className="mt-4 font-semibold">Precio de servicios individuales:</h4>
                        <ul className="mb-2">
                            {selectedServiceObjects.map(servicio => (
                                <li key={servicio.codigo_servicio} className="flex justify-between items-center odd:bg-slate-200 bg-slate-100">
                                    <span>{servicio.nombre}</span>
                                    <span >${servicio.precio.toFixed(2)}</span>
                                </li>
                            ))}
                            <li>
                                <hr className=' border-red-500 w-full mt-2' />
                            </li>
                            <li className="flex justify-between mt-2">
                                <span>Total</span>
                                <span className="font-semibold">${totalPrecio.toFixed(2)}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Descuento 15%</span>
                                <span className="text-green-500">-${discount}</span>
                            </li>
                            <li className="flex justify-between text-2xl text-purple-500">
                                <span>Precio final </span>
                                <span className="font-semibold">${totalPrecio - discount}</span>
                            </li>
                        </ul>



                    </div>

                </div>


                <div className="mt-5 w-2/3">

                    <div className="flex gap-2">
                        {[
                            { name: 'codigo_paquete', label: 'Código del paquete' },
                            { name: 'nombre', label: 'Nombre' },
                        ].map(({ name, label }) => (
                            <div key={name} className="flex flex-col">
                                <label htmlFor={name}>{label}</label>
                                <input
                                    className={clsx(
                                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                                        { 'border-red-500': errors[name as keyof CreatePaqueteDTO] }
                                    )}

                                    {...register(name as keyof CreatePaqueteDTO, { required: false, })}
                                />

                            </div>
                        ))}


                    </div>

                    <h3 className="font-semibold mb-2">Seleccionar Servicios Médicos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {serviciosDisponibles?.map((servicio) => (
                            <label key={servicio.codigo_servicio} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={servicio.codigo_servicio}
                                    checked={selectedServices.includes(servicio.codigo_servicio)}
                                    onChange={() => handleCheckboxChange(servicio.codigo_servicio)}
                                    className="w-5 h-5"
                                />
                                {servicio.nombre}
                            </label>
                        ))}
                    </div>

                    <div className='flex justify-center'>
                        {
                            isSubmitting
                                ? <ButtonLoading label='Creando...' />
                                : <ButtonAnimated label='Crear Paquete' />

                        }

                    </div>

                </div>

            </div>
        </form>


    )
}