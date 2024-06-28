import AuthenticatedLayout from "@/components/application/layouts/authenticated";
import EditPage from "./components/edit-page";

export default function Page({ params }: any) {
  const uuid = params.uuid;

  return (
    <AuthenticatedLayout>
      <EditPage uuid={uuid} />
    </AuthenticatedLayout>
  );
}
