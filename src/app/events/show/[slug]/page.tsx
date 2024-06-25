import ShowEvent from "./components/show-event";
import GuestLayout from "@/components/application/layouts/guest";

export default function Page({ params }: any) {
  return (
    <GuestLayout>
      <ShowEvent slug={params.slug} />
    </GuestLayout>
  );
}
