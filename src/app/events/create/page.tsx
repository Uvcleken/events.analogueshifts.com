import CreatePage from "./components/create-page";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p></p>}>
      <CreatePage />
    </Suspense>
  );
}
