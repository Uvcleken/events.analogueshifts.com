"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const onBoardingInfo = ["/hero_2.webp", "/hero.webp", "/hero.jpg"];

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % onBoardingInfo.length);
  };

  return (
    <div className="flex h-max z-10 overflow-hidden border-t">
      <div className="relative transform transition-all duration-50000 bg-white w-full h-[30vh] tablet:h-[60vh] overflow-hidden">
        <div className="overflow-x-hidden relative w-full h-full">
          <div
            className="flex  transition-transform duration-500 h-full"
            style={{
              transform: `translateX(-${
                activeIndex * (100 / onBoardingInfo.length)
              }%)`,
              width: `${onBoardingInfo.length * 100}%`,
            }}
          >
            {onBoardingInfo.map((onBoardingtData, index) => (
              <div
                style={{ backgroundImage: `url(${onBoardingtData})` }}
                className="relative w-full h-full bg-center bg-cover bg-no-repeat"
                key={index}
              ></div>
            ))}
          </div>{" "}
          <Link
            href="/events/create"
            className="text-sm px-6 py-3 rounded bg-white/90 hover:bg-white text-primary-boulder700 font-semibold absolute bottom-7 left-5 tablet:left-20"
          >
            Create your next event
          </Link>
        </div>
        <div className="absolute bottom-10 flex tablet:justify-center justify-end pr-5 tablet:pr-0 items-center mt-20 space-x-1 w-full">
          {onBoardingInfo.map((_, index) => {
            const width =
              index === activeIndex
                ? "w-[58px] bg-white"
                : "w-[5px] bg-white/50";
            return (
              <div
                key={index}
                className={`rounded-lg h-[5px] transition-all duration-500 ease-in-out ${width}`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
