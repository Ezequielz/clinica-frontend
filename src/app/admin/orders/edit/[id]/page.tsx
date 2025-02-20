import { readOrderById } from "@/actions/orders/readOrderById.action";
import { EditOrderForm } from "@/app/components/admin/orders/ui/EditOrderForm";
import { OrderDetails } from "@/app/components/screens/order/OrderDetail";
import { OrderSummary } from "@/app/components/screens/order/OrderSummary";


interface Props {
  params: Promise<{ id: string }>
}

export default async function EditOrderPage({ params }: Props) {

  const { id } = await params;

  const { ok, order } = await readOrderById(id);

  if (!ok || !order) return null;

  return (
    <section >
      <h2 className="font-bold">Orden: {order.id} </h2>
       
      <div className="flex gap-5 items-center">

        <OrderDetails order={order} />
        
        <OrderSummary order={order} />

      </div>

      <EditOrderForm order={order} />
    </section>
  )

}