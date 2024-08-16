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
  try {
    const res = await fetch(
      `https://api.analogueshifts.com/api/event/${slug}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const contentType = res.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("Invalid response type");
    }

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`Failed to fetch event: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
};
