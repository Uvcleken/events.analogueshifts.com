"use client";
import { useAuth } from "@/hooks/auth";
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import LeftArrow from "@/assets/images/left-arrow.svg";
import RightArrow from "@/assets/images/right-arrow.svg";
import RightArrowWhite from "@/assets/images/right-arrow-white.svg";
import { convertDateFormat } from "@/app/events/resources/convert-date-format";
import { Share2 } from "lucide-react";
import { share } from "@/configs/share";

const Carousel = ({ posts }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  const { notifyUser } = useAuth();

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
  }, []);

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
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex  transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
        }}
      >
        {posts.map((item: any, index: number) => (
          <div
            key={index}
            className="sm:pr-5 lg:pr-10 pr-0  flex-shrink-0 flex w-full sm:w-1/2 lg:w-1/3"
          >
            <div className="flex relative event-grid flex-col w-full">
              <Link
                href={"/show/" + item.slug}
                className="w-full h-[220px] rounded-2xl mb-8"
              >
                <img
                  src={item?.thumbnail ? item.thumbnail : "/venue.jpeg"}
                  alt=""
                  className="rounded-2xl w-full h-full object-cover"
                />
              </Link>
              <div
                onClick={() =>
                  share(
                    item.title,
                    "https://events.analogueshifts.com/show/" + item.slug,
                    notifyUser
                  )
                }
                className="absolute duration-500 share-button top-10 text-primary-boulder700 cursor-pointer flex justify-center items-center right-2 bg-white border w-10 h-10 rounded-full"
              >
                <Share2 width={16} />
              </div>
              <div className="w-full flex gap-x-8 gap-y-5 flex-wrap items-center">
                <p className="text-[15px] text-primary-boulder400 font-normal">
                  {item.location_type === "virtual"
                    ? "Online Event"
                    : item.location}
                </p>
                <h2 className="large:text-[22px] w-full text-lg large:mb-2.5 leading-8 large:leading-10 font-medium text-primary-tan">
                  {item.title}
                </h2>
                <p className="text-primary-boulder400 mb-5 large:mb-8 font-normal text-[15px]">
                  {convertDateFormat(item.starts_date)}
                </p>
              </div>
            </div>
          </div>
        ))}
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
          className="h-full px-10 large:px-12 bg-background-darkYellow flex justify-center items-center gap-1 rounded-2xl text-sm large:text-base font-semibold text-primary-boulder50"
          href="/all"
        >
          View More{" "}
          <Image
            src={RightArrowWhite}
            alt=""
            className="h-max large:w-max w-4"
          />
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
