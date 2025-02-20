
'use client'

import { useState } from 'react';
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { login } from '@/actions/auth/login.action';
import { ButtonAnimated } from '@/app/components/ui/buttons/ButtonAnimated';
import { ButtonLoading } from '@/app/components/ui/buttons/ButtonLoading';

type FormInputs = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const [isLoading, setIsLoading] = useState(false)

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        setIsLoading(true)
        const { email, password } = data;

        // Server action
        const resp = await login(email.toLowerCase(), password);

        if (!resp.ok) {
            setIsLoading(false)
            setErrorMessage(resp.message);
            return;
        };


        window.location.replace('/');

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col" autoComplete='off'>

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-3 text-slate-800",
                        { 'border-red-500': errors.password }
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: emailRegex })}

            />
            {errors.email?.type === 'required' && (
                <span className="text-red-500">*El email es obligatorio</span>
            )}


            <label htmlFor="email">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-3 text-slate-800",
                        { 'border-red-500': errors.password }
                    )
                }
                autoComplete='off'
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password?.type === 'required' && (
                <span className="text-red-500">*La contraseña es obligatoria</span>
            )}
            {errors.password?.type === 'minLength' && (
                <span className="text-red-500">*La contraseña debe tener al menos 6 caracteres</span>
            )}


            <span className="text-red-500 mt-5">{errorMessage}</span>
            <div className='flex justify-center'>
                {
                    !isLoading
                        ? <ButtonAnimated label='Ingresar' />
                        : <ButtonLoading label='Ingresando...' />
                }

            </div>


            <div className='mt-5 flex gap-2 '>
                No tiene cuenta?

                <Link
                    href="/auth/register"
                    className="btn-secondary text-center text-violet-500 hover:text-violet-400">
                    Registrate acá
                </Link>
            </div>

        </form>
    )
};