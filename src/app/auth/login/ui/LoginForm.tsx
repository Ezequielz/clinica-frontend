
'use client'

import { useState } from 'react';
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { login } from '@/actions/auth/login.action';

type FormInputs = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { email, password } = data;

        // Server action
        const resp = await login(email.toLowerCase(), password);

        if (!resp.ok) {

            setErrorMessage(resp.message);
            return;
        };


        window.location.replace('/');

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
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
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
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
            <button
                type='submit'
                disabled={isSubmitting}

                className={clsx(

                    " w-full text-slate-100  rounded-lg px-4 py-2 m-auto",
                    {
                        "bg-purple-800 hover:bg-purple-500": !isSubmitting,
                        "bg-slate-500": isSubmitting
                    })}>
                Ingresar
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-2">
                <div className="flex-1 border-t border-slate-300"></div>
                <div className="px-2 text-slate-100">O</div>
                <div className="flex-1 border-t border-slate-300"></div>
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