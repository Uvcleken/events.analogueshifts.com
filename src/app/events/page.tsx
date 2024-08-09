import EventsDashboard from "./components/events-dashboard";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={<p></p>}>
        <EventsDashboard />
      </Suspense>
    </>
  );
}
