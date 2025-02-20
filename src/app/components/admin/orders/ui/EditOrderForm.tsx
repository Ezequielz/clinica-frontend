
'use client'

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';


import { ButtonLoading } from '@/app/components/ui/buttons/ButtonLoading';
import { ButtonAnimated } from '@/app/components/ui/buttons/ButtonAnimated';

import type { OrderById } from '@/app/interfaces/orderById';
import { updateOrder } from '@/actions/orders/updateOrder.action';
import { DeleteOrder } from './DeleteOrder';

export interface OrderUpdateDTO {
    id: string;
    pagado?: boolean

};

interface Props {
    order: OrderById
}

export const EditOrderForm = ({ order }: Props) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<OrderUpdateDTO>({
        defaultValues: order
    });

    const onSubmit = async (data: OrderUpdateDTO) => {
        const { id: orderId, pagado } = data;

        const { ok, message } = await updateOrder({ orderId, pagado });

        if (!ok) return enqueueSnackbar(message, { variant: 'error' });
        enqueueSnackbar('Orden actualizada', { variant: 'success' });

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="py-5 w-full " autoComplete='off'>

            <div className="flex gap-2 justify-center items-center">

                <input
                    type="checkbox"
                    id="pagado"
                    {...register("pagado")}
                    className="w-5 h-5"
                />
                <label htmlFor='pagado'>Marcar como pagado</label>
            </div>

            <div className='flex justify-center'>
                {
                    isSubmitting
                        ? <ButtonLoading label='Actualizando...' />
                        : (

                            <div className='flex gap-2 justify-center items-end'>
                                <ButtonAnimated label='Actualizar órden' />
                                {
                                    !order.pagado && (
                                        <DeleteOrder orderId={order.id} />
                                    )
                                }
                            </div>
                        )

                }

            </div>
        </form>


    )
}