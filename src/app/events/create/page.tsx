import CreatePage from "./components/create-page";
import AuthenticatedLayout from "@/components/application/layouts/authenticated";

export default function Page() {
  return (
    <AuthenticatedLayout>
      <CreatePage />
    </AuthenticatedLayout>
  );
}
