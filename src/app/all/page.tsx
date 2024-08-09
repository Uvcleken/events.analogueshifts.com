import GuestLayout from "@/components/application/layouts/guest";
import EventGridTile from "@/components/application/home/event-grid-tile";
import AllEventsPagination from "./pagination";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const page = searchParams.page || "1";
  const events = await getEvents(page);

  return (
    <GuestLayout>
      <section className="w-full min-h-screen bg-white z-20 pb-5 px-4">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1250px] px-5 ">
            {events && (
              <div className="w-full mt-5 grid xl:grid-cols-4 md:grid-cols-3 mobile:grid-cols-2 grid-cols-1 gap-y-10 gap-x-6">
                {events.data.events.data.map((item: any) => {
                  return <EventGridTile key={item.slug} item={item} />;
                })}
              </div>
            )}
            <AllEventsPagination currentPageInfo={events.data.events} />
          </div>
        </div>
      </section>
    </GuestLayout>
  );
}

const getEvents = async (page: string) => {
  const url = new URL("https://api.analogueshifts.com/api/event");
  url.searchParams.append("page", page);

  const res = await fetch(url.toString(), {
    next: {
      revalidate: 60,
    },
  });

  if (res.ok) {
    return res.json();
  } else {
    return null;
  }
};
