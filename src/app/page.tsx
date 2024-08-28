import GuestLayout from "@/components/application/layouts/guest";
import Link from "next/link";
import { EventTypes } from "@/configs/landing";
import Slider from "@/components/application/home/slider";
import ExploreEvents from "@/components/application/home/explore-events";
import DownloadApp from "@/components/application/home/download-app";

export default async function Home() {
  const events = await getEvents();

  return (
    <GuestLayout>
      <Slider />

      <div className="w-full h-max flex justify-center mt-10 px-10 mobile:justify-start flex-wrap gap-12">
        {EventTypes.map((item) => {
          return (
            <Link
              key={item.title}
              href="/events/create"
              className="flex flex-col items-center gap-3"
            >
              <div className=" w-107 h-107 rounded-full border flex justify-center items-center text-primary-boulder500 hover:bg-background-darkYellow/10 hover:text-background-darkYellow/80 hover:border-transparent">
                {item.icon}
              </div>
              <p className="text-xs text-center w-107 font-semibold text-primary-boulder900">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
      <ExploreEvents events={events?.data?.events?.data} />
      <DownloadApp />
    </GuestLayout>
  );
}

const getEvents = async () => {
  try {
    const res = await fetch("https://api.analogueshifts.com/api/event", {
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
