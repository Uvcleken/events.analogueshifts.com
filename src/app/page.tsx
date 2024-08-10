import GuestLayout from "@/components/application/layouts/guest";
import Link from "next/link";
import { EventTypes } from "@/configs/landing";
import Slider from "@/components/application/home/slider";
import EventGridTile from "@/components/application/home/event-grid-tile";

export default async function Home() {
  const events = await getEvents();

  return (
    <GuestLayout>
      <Slider />
      <section className="w-full min-h-screen bg-white z-20 py-7 px-4">
        <div className="w-full h-max flex justify-center mobile:justify-start flex-wrap gap-12">
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
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1250px] px-5 pt-12">
            <h2 className="text-primary-boulder950 mb-5 font-bold text-xl">
              Explore Events
            </h2>
            {events && (
              <div className="w-full grid xl:grid-cols-4 md:grid-cols-3 mobile:grid-cols-2 grid-cols-1 gap-y-10 gap-x-6">
                {events?.data?.events?.data?.map((item: any) => {
                  return <EventGridTile key={item.slug} item={item} />;
                })}
              </div>
            )}
            <div className="w-full flex justify-center my-10">
              <Link
                href="/all"
                className="text-sm px-10 py-3 rounded-full text-primary-boulder700 font-medium border"
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </GuestLayout>
  );
}

const getEvents = async () => {
  const res = await fetch("https://api.analogueshifts.com/api/event", {
    next: {
      revalidate: 60,
    },
  });
  if (res.ok) {
    return res.json();
  }
};
