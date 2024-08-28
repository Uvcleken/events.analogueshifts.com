"use client";
import { useState } from "react";
import axios from "@/lib/axios";
import EventGridTile from "@/components/application/home/event-grid-tile";

import Image from "next/image";
import Spinner from "@/assets/images/event-types/spinner.svg";

export default function RenderEvents({ events }: { events: any }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(events?.data || []);
  const [currentPageInfo, setCurrentPageInfo] = useState(events);

  const handleFetchMore = async () => {
    try {
      let config = {
        method: "GET",
        url: currentPageInfo.next_page_url.slice(34),
      };
      try {
        setLoading(true);
        let res = await axios.request(config);
        setLoading(false);
        if (res.data?.success) {
          setCurrentPageInfo(res.data.data.events);
          setData(res.data.data.events.data);
        }
      } catch (error) {
        setLoading(false);
      }
    } catch (error) {}
  };

  return (
    <section className="w-full  tablet:px-3 z-20 sticky px-10 h-max bg-white items-center overflow-hidden large:pb-[168px] tablet:pb-14 pb-24 flex flex-col">
      <h2 className="text-center mb-5 font-semibold text-2xl tablet:text-lg large:text-32 text-black">
        Explore All <span className="text-background-darkYellow">Events</span>
      </h2>
      <p className="text-primary-boulder400 mb-12 large:mb-16 tablet:text-sm text-base large:text-xl text-center font-normal">
        Explore upcoming tailored events.
      </p>
      <div className="relative w-full overflow-hidden mb-10">
        <div className="flex flex-wrap tablet:gap-y-10 gap-y-14 transition-transform duration-500">
          {data.map((item: any, index: number) => {
            return <EventGridTile item={item} index={index} key={index} />;
          })}
        </div>
      </div>
      {currentPageInfo?.next_page_url && (
        <button
          onClick={handleFetchMore}
          disabled={loading}
          id="viewMoreButton"
          className={`outline-none mx-auto bg-transparent text-background-darkYellow text-base large:text-xl font-medium pb-0.5 large:pb-2 border-b ${
            loading ? "border-transparent" : "border-b-background-darkYellow"
          }`}
        >
          {loading ? (
            <Image src={Spinner} alt="" className="h-max w-10" />
          ) : (
            "View More"
          )}
        </button>
      )}
    </section>
  );
}
