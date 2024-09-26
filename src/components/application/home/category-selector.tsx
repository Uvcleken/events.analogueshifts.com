"use client";
import Caret from "@/assets/images/home/caret.svg";
import Image from "next/image";

import { categories } from "@/configs/categories";
import { useState, useEffect } from "react";

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState("Trending Events");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4); // Default to 3 items per slide (desktop)
  const itemGap = 24; // Gap between slides in pixels

  // Function to determine number of items per slide based on screen width
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setItemsPerSlide(1); // Mobile: 1 item per view
      } else if (screenWidth < 1024) {
        setItemsPerSlide(2); // Tablet: 2 items per view
      } else {
        setItemsPerSlide(4); // Desktop: 3 items per view
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);

    return () => {
      window.removeEventListener("resize", updateItemsPerSlide);
    };
  }, []);

  // Total number of slides
  const totalItems = categories.length;

  // Calculate the maximum number of slides you can have (minus the number of items per slide)
  const maxSlides = totalItems - itemsPerSlide;

  // Function to handle arrow clicks
  const handlePrevClick = () => {
    setCurrentSlide((prev) => (prev === 0 ? maxSlides : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev === maxSlides ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-[1154px] large:mb-[72px] mb-[57px] h-max border border-[#0000001C] rounded-[32px] tablet:px-4 tablet:py-5 tablet:gap-2.5 px-8 py-[35px] flex gap-[20px] items-center overflow-hidden">
      {/* Left arrow button */}
      <button
        onClick={handlePrevClick}
        className="min-w-6 tablet:min-w-4 tablet:w-4 h-max outline-none border-none bg-none"
      >
        <Image src={Caret} alt="" className="w-full h-max" />
      </button>

      {/* Slider container */}
      <div className="w-full overflow-hidden">
        <div
          className="flex items-center transition-transform duration-500 ease-in-out gap-[24px]"
          style={{
            transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)`,
          }}
        >
          {categories.map((item: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(item)}
              className={`text-[#292929] font-medium large:text-xl text-lg duration-300 flex-shrink-0`}
              style={{
                flexBasis: `calc(${100 / itemsPerSlide}% - ${itemGap}px)`, // Calculate each item's width with gap subtracted
              }}
            >
              <div
                className={`w-full large:h-[60px] tablet:h-12 duration-300 font-medium large:text-xl text-base tablet:text-xs h-14 flex justify-center items-center rounded-3xl ${
                  selectedCategory === item
                    ? "bg-[#FFBB0A3D]"
                    : "bg-transparent"
                }`}
              >
                {item}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right arrow button */}
      <button
        onClick={handleNextClick}
        className="min-w-6 tablet:min-w-4 tablet:w-4 h-max outline-none border-none bg-none"
      >
        <Image src={Caret} alt="" className="w-full h-max rotate-180" />
      </button>
    </div>
  );
}
