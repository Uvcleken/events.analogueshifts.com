import GuestLayout from "@/components/application/layouts/guest";
import EventGridTile from "@/components/application/home/event-grid-tile";
import AllEventsPagination from "./pagination";
import Landing from "./components/landing";

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
          <div className="w-full max-w-[1250px] md:px-5 ">
            <Landing />
            <div className="w-full mt-14  flex flex-col gap-7">
              <h2 className="text-primary-boulder900/90 font-bold text-2xl">
                All Events
              </h2>
              {events && (
                <div className="w-full px-2  grid xl:grid-cols-4 md:grid-cols-3 mobile:grid-cols-2 grid-cols-1 gap-y-10 gap-x-6">
                  {events?.data?.events?.data.map((item: any) => {
                    return <EventGridTile key={item.slug} item={item} />;
                  })}
                </div>
              )}
            </div>
            <AllEventsPagination currentPageInfo={events?.data?.events} />
          </div>
        </div>
      </section>
    </GuestLayout>
  );
}

const getEvents = async (page: string) => {
  try {
    const url = new URL("https://api.analogueshifts.com/api/event");
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
