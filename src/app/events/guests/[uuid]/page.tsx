import AuthenticatedLayout from "@/components/application/layouts/authenticated";
import { Suspense } from "react";
import Loading from "@/components/application/loading";
import OrdersDashboard from "./components/order-dashboard";

export default function Page({ params }: any) {
  const eventUUID = params.uuid;

  return (
    <AuthenticatedLayout>
      <Suspense fallback={<Loading />}>
        {/* Order Dasboard */}
        <OrdersDashboard eventUUID={eventUUID} />
      </Suspense>
    </AuthenticatedLayout>
  );
}
