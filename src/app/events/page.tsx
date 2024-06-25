import AuthenticatedLayout from "@/components/application/layouts/authenticated";
import EventsDashboard from "./components/events-dashboard";
import { Suspense } from "react";
import Loading from "@/components/application/loading";

export default function Page() {
  return (
    <AuthenticatedLayout>
      <Suspense fallback={<Loading />}>
        <EventsDashboard />
      </Suspense>
    </AuthenticatedLayout>
  );
}
