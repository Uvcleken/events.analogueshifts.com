import ShowEvent from "./components/show-event";
import GuestLayout from "@/components/application/layouts/guest";

export default async function Page({ params }: any) {
  const event = await getEvent(params.slug);

  return (
    <GuestLayout>
      <ShowEvent event={event.data.event} />
    </GuestLayout>
  );
}

const getEvent = async (slug: string) => {
  const res = await fetch("https://api.analogueshifts.com/api/event/" + slug, {
    next: {
      revalidate: 60,
    },
  });
  if (res) {
    return res.json();
  }
};
