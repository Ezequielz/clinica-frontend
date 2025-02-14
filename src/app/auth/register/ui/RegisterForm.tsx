'use client'

import { useState } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';

import { login } from '@/actions/auth/login.action';
import { registerUser } from '@/actions/auth/register.action';


type FormInputs = {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
};

const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i


export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { nombre, apellido, email, password } = data;

        // Server action
        const resp = await registerUser({ nombre, apellido, email, password })
        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        };

        await login(email.toLowerCase(), password);

        window.location.replace('/');

    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">


            <label htmlFor="name">Nombre</label>
            {errors.nombre?.type === 'required' && (
                <span className="text-red-500">*El nombre es obligatorio</span>
            )}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                        {
                            'border-red-500': errors.nombre
                        }
                    )
                }
                type="text"
                autoFocus
                {...register('nombre', { required: true })}
            />

            <label htmlFor="name">Apellido</label>
            {errors.apellido?.type === 'required' && (
                <span className="text-red-500">*El apellido es obligatorio</span>
            )}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                        {
                            'border-red-500': errors.apellido
                        }
                    )
                }
                type="text"
                {...register('apellido', { required: true })}
            />


            <label htmlFor="email">Correo electrónico</label>
            {errors.email?.type === 'required' && (
                <span className="text-red-500">*El email es obligatorio</span>
            )}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: emailRegex })}
            />


            <label htmlFor="password">Contraseña</label>
            {errors.password?.type === 'required' && (
                <span className="text-red-500">*La contraseña es obligatoria</span>
            )}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                autoComplete='off'
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />

            <span className="text-red-500">{errorMessage}</span>


            <button
                className="m-auto bg-purple-800 rounded-lg px-4 py-2 hover:bg-purple-500 text-slate-100 w-full"
            >


                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-slate-300"></div>
                <div className="px-2 text-slate-100">O </div>
                <div className="flex-1 border-t border-slate-300"></div>
            </div>


            <div className='mt-5 flex justify-center gap-2 items-center '>
                Ya tienes una cuenta?

                <Link
                    href="/auth/login"
                    className="btn-secondary text-center text-violet-500 hover:text-violet-400">
                    Ingresá
                </Link>
            </div>

        </form>
    )
}