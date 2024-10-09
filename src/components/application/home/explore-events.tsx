"use client";
import { useEffect, useState } from "react";
import Carousel from "./carousel-slide";
import CategorySelector from "./category-selector";

import axios from "@/lib/axios";
import { useToast } from "@/contexts/toast";

export default function ExploreEvents({ events }: { events: any[] }) {
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

  return (
    <section className="w-full flex justify-center">
      <div className="w-full px-[66px] max-w-[1800px] tablet:px-6 large:px-[104px] h-max bg-white items-center large:py-[168px] tablet:py-14 py-24 flex flex-col">
        <h2 className="text-center mb-5 font-semibold text-2xl tablet:text-lg large:text-32 text-black">
          Explore <span className="text-background-darkYellow">Events</span>
        </h2>
        <p className="text-primary-boulder400 mb-6 large:mb-8 tablet:text-sm text-base large:text-xl text-center font-normal">
          Explore upcoming tailored events.
        </p>
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Carousel posts={posts} />
      </div>
    </section>
  );
}
