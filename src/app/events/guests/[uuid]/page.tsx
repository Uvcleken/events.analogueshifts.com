import { Suspense } from "react";
import OrdersDashboard from "./components/order-dashboard";

export default function Page({ params }: any) {
  const eventUUID = params.uuid;

  return (
    <>
      <Suspense fallback={<p></p>}>
        {/* Order Dasboard */}
        <OrdersDashboard eventUUID={eventUUID} />
      </Suspense>
    </>
  );
}
