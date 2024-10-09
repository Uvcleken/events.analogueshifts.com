"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import EventGridTile from "@/components/application/home/event-grid-tile";

import Image from "next/image";
import Spinner from "@/assets/images/event-types/spinner.svg";

import CategorySelector from "@/components/application/home/category-selector";
import { useToast } from "@/contexts/toast";

export default function RenderEvents({ events }: { events: any }) {
  const [loading, setLoading] = useState(false);
  const [currentPageInfo, setCurrentPageInfo] = useState(events);
  const [posts, setPosts] = useState(events);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { notifyUser }: any = useToast();

  const filterByCategory = async () => {
    try {
      const request = await axios.get("/event?category=" + selectedCategory);
      if (request?.data?.success) {
        setPosts(request?.data?.data?.events?.data);
      }
    } catch (error: any) {
      notifyUser(
        "error",
        error?.response?.data?.message ||
          error?.response?.data?.data?.message ||
          error?.message ||
          "Failed to fetch events",
        "right"
      );
    }
  };

  useEffect(() => {
    if (selectedCategory === "All") {
      setPosts(events);
    } else {
      filterByCategory();
    }
  }, [selectedCategory]);

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
          setPosts(res.data.data.events.data);
        }
      } catch (error) {
        setLoading(false);
      }
    } catch (error) {}
  };

  return (
    <section className="w-full max-w-[1650px] mx-auto tablet:px-5 z-20 sticky px-10 h-max bg-white items-center overflow-hidden large:pb-[168px] tablet:pb-14 pb-24 flex flex-col">
      <h2 className="text-center mb-5 font-semibold text-2xl tablet:text-lg large:text-32 text-black">
        Explore <span className="text-background-darkYellow">Events</span>
      </h2>
      <p className="text-primary-boulder400 mb-8 large:mb-10 tablet:text-sm text-base large:text-xl text-center font-normal">
        Explore upcoming tailored events.
      </p>
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="relative w-full overflow-hidden mb-10">
        <div className="flex flex-wrap tablet:gap-y-10 gap-y-14 transition-transform duration-500">
          {posts.map((item: any, index: number) => {
            return <EventGridTile item={item} index={index} key={index} />;
          })}
        </div>
        {posts.length === 0 && (
          <div className="w-full py-10 flex justify-center items-center">
            <p className=" text-primary-boulder400  tablet:text-sm text-base">
              No event found.
            </p>
          </div>
        )}
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
