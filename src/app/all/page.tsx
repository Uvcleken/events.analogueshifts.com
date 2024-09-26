import GuestLayout from "@/components/application/layouts/guest";
import Landing from "./components/landing";
import RenderEvents from "./components/render-events";
import DownloadApp from "@/components/application/home/download-app";
import Reviews from "@/components/application/home/reviews";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const page = searchParams.page || "1";
  const events = await getEvents(page);

  return (
    <GuestLayout>
      <Landing />
      {events && <RenderEvents events={events?.data?.events} />}
      <Reviews />
      <DownloadApp />
    </GuestLayout>
  );
}

const getEvents = async (page: string) => {
  try {
    const url = new URL("https://api.analogueshifts.app/api/event");
    url.searchParams.append("page", page);

    const res = await fetch(url.toString(), {
      next: {
        revalidate: 60,
      },
    });

    const contentType = res.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("Invalid response type");
    }

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(
        `Failed to fetch events: ${res.status} ${res.statusText}`
      );
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
};
