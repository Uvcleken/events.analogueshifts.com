"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import LeftArrow from "@/assets/images/left-arrow.svg";
import RightArrowYellow from "@/assets/images/home/right-arrow.svg";
import RightArrow from "@/assets/images/right-arrow.svg";
import EventGridTile from "./event-grid-tile";

const Carousel = ({ posts }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Set itemsPerView based on the window width
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerView(3); // Desktop
      } else if (width >= 640) {
        setItemsPerView(2); // Tablet
      } else {
        setItemsPerView(1); // Mobile
      }
    };

    updateItemsPerView(); // Initial check
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [posts]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 12000);

    return () => clearInterval(interval);
  }, [posts]);

  return (
    <div className="relative w-full flex flex-col large:gap-[122px] gap-[90px] tablet:gap-[60px] overflow-hidden">
      <div
        className="flex  transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
        }}
      >
        {posts.map((item: any, index: number) => (
          <EventGridTile item={item} index={index} key={index} />
        ))}
        {posts.length === 0 && (
          <div className="w-full py-10 flex justify-center items-center">
            <p className=" text-primary-boulder400  tablet:text-sm text-base">
              No event found.
            </p>
          </div>
        )}
      </div>

      <div className="w-full h-12 large:h-14 flex justify-between">
        <div className="w-max h-full flex items-center gap-2 sm:gap-6">
          <button
            className="large:w-14 large:h-14 w-12 h-12 rounded-full flex justify-center items-center bg-primary-boulder100"
            onClick={goToPrevious}
          >
            <Image src={LeftArrow} alt="" className="h-max large:w-max w-3" />
          </button>
          <button
            className="large:w-14 large:h-14 w-12 h-12 rounded-full flex justify-center items-center bg-primary-boulder100"
            onClick={goToNext}
          >
            <Image src={RightArrow} alt="" className="h-max large:w-max w-3" />
          </button>
        </div>
        <Link
          className="h-full hover-text-button px-10 large:px-12 bg-transparent border border-background-darkYellow text-background-darkYellow flex justify-center items-center gap-1 rounded-2xl text-sm large:text-base font-semibold"
          href="/all"
        >
          {" "}
          <div className="flex-col flex overflow-hidden relative h-4">
            {" "}
            <span className="h-5 leading-4 overflow-hidden duration-300">
              {" "}
              View More
            </span>{" "}
            <span className="h-5 leading-4 overflow-hidden absolute translate-y-4 duration-300">
              {" "}
              View More
            </span>
          </div>
          <Image
            src={RightArrowYellow}
            alt=""
            className="h-max large:w-max w-4"
          />
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
