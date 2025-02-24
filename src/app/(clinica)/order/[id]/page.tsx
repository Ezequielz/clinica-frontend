
import { Suspense } from 'react';
import { Title } from '@/app/components/ui/Title';
import { OrderById } from '@/app/components/screens/order/OrderById';
import { SkeletonOrderById } from '@/app/components/screens/order/ui/SkeletonOrderById';

interface Props {
  params: Promise<{ id: string }>;
};

export default async function OrderScreen({ params }: Props) {

  const { id } = await params;

  return (

    <div className="flex justify-center items-center mb-72 px-5 md:px-20 ">

      <div className="flex flex-col w-full">

        <Title title={`Orden #${id.split('-').at(-1)}`} />


        <Suspense  fallback={ <SkeletonOrderById /> } >
          <OrderById id={id} />
        </Suspense>

      </div>
    </div>

  );
}