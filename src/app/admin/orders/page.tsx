import { OrdersTable } from '@/app/components/admin/orders/table/OrdersTable';
import { SkeletonOrdersTable } from '@/app/components/admin/orders/ui/SkeletonOrdersTable';
import { Suspense } from 'react';


export default async function AdminOrdersPage() {

  return (
    <Suspense fallback={<SkeletonOrdersTable />} >
      <OrdersTable />
    </Suspense>
  );
}