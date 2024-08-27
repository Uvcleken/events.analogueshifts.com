"use client";
import { useState } from "react";
import { useUser } from "@/contexts/user";
import { useEventsContext } from "@/contexts/events";
import { useSearchParams } from "next/navigation";

import YourPlan from "./your-plan";
import EventsPagination from "./pagination";
import Image from "next/image";
import EmptyBox from "@/assets/images/empty-box.png";
import Loading from "@/components/application/loading";
import EventGridTile from "./event-grid-tile";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventsDashboard() {
  const [loading, setLoading] = useState(false);
  const { events, paginationInfo } = useEventsContext();

  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const eventsUrl = `/tools/event${page ? `?page=${page}` : ""}`;

  const { user }: any = useUser();

  return (
    <main className="my-10 items-start grid grid-cols-7 gap-7 mx-auto w-[90%] max-w-desktop">
      {loading && <Loading />}
      <div className="tablet:col-span-5 col-span-7 flex flex-col gap-10">
        {user ? (
          <h1 className="text-primary-boulder700 text-3xl tablet:text-5xl font-bold">
            <b> Welcome, {user?.user?.user_profile?.first_name}</b>
          </h1>
        ) : (
          <div className="flex items-center w-3/5 space-x-4">
            <Skeleton className="min-h-12 min-w-12 rounded-full" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[95%]" />
            </div>
          </div>
        )}
        <div className="md:p-6 px-3 py-2 rounded-md border h-max tablet:h-screen max-h-screen">
          <div className="w-full border-b h-16 flex items-center pl-3">
            {events ? (
              <h2 className="text-primary-boulder900 text-xl tablet:text-3xl font-bold">
                <b>My Events ({events?.length})</b>
              </h2>
            ) : (
              <div className="w-full flex flex-col gap-2 pb-5">
                <Skeleton className="w-full h-7" />
                <Skeleton className="w-full h-7" />
              </div>
            )}
          </div>

          {/* List */}
          <div className="w-full h-[60vh] tablet:h-allEventsSection overflow-y-auto">
            {events ? (
              <>
                {events.length === 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Image
                      src={EmptyBox}
                      alt="Empty Box"
                      className="max-h-emptyBox w-max"
                    />
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-5 py-5">
                    {events.map((item: any) => {
                      return (
                        <EventGridTile
                          key={item.uuid}
                          item={item}
                          url={eventsUrl}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="py-5 w-full flex flex-col gap-5">
                <Skeleton className="w-full h-14" />
                <Skeleton className="w-full h-14" />
                <Skeleton className="w-full h-14" />
              </div>
            )}
          </div>
          <div className="w-full border-t h-16 flex items-center justify-center">
            <EventsPagination currentPageInfo={paginationInfo} />
          </div>
        </div>
      </div>
      <YourPlan />
    </main>
  );
}
