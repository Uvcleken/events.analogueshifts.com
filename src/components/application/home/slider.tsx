"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import onBoardingInfo from "../utilities/dummy-events.json";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 12000);

    return () => {
      clearInterval(interval);
    };
  }, [activeIndex]);

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % onBoardingInfo.length);
  };

  const goToPrevSlide = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + onBoardingInfo.length) % onBoardingInfo.length
    );
  };

  const handleTouchStart = (e: any) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
    setPrevTranslate(currentTranslate);
  };

  const handleTouchMove = (e: any) => {
    if (isDragging) {
      const currentPosition = e.touches[0].clientX;
      const movement = currentPosition - startX;
      setCurrentTranslate(prevTranslate + movement);
    }
  };

  const handleTouchEnd = () => {
    const movement = currentTranslate - prevTranslate;

    if (movement < -100) {
      goToNextSlide();
    } else if (movement > 100) {
      goToPrevSlide();
    }

    setIsDragging(false);
    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  const handleMouseDown = (e: any) => {
    setStartX(e.clientX);
    setIsDragging(true);
    setPrevTranslate(currentTranslate);
  };

  const handleMouseMove = (e: any) => {
    if (isDragging) {
      const currentPosition = e.clientX;
      const movement = currentPosition - startX;
      setCurrentTranslate(prevTranslate + movement);
    }
  };

  const handleMouseUp = () => {
    const movement = currentTranslate - prevTranslate;

    if (movement < -100) {
      goToNextSlide();
    } else if (movement > 100) {
      goToPrevSlide();
    }

    setIsDragging(false);
    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  return (
    <div
      className={`flex max-w-[1650px] mx-auto h-max z-10 overflow-hidden ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative transform transition-all duration-50000 bg-white w-full tablet:h-[380px] h-[627px] overflow-hidden">
        <div className="overflow-x-hidden relative w-full h-full">
          <div
            className="flex transition-transform duration-500 h-full"
            style={{
              transform: `translateX(-${
                activeIndex * (100 / onBoardingInfo.length)
              }%)`,
              width: `${onBoardingInfo.length * 100}%`,
            }}
          >
            {onBoardingInfo.map((onBoardingtData, index) => (
              <div
                style={{ backgroundImage: `url(${onBoardingtData.img})` }}
                className="  w-full h-full bg-center bg-cover bg-no-repeat"
                key={index}
              >
                <div className="slideshow large:px-[115px] px-20 tablet:px-6  flex flex-col justify-center w-full h-full">
                  {" "}
                  <h3
                    className={`large:text-[32px] tablet:text-xl text-2xl font-extrabold mb-[15px] tablet:max-w-[80%] max-w-[40%] truncate text-white`}
                  >
                    {onBoardingtData.title}
                  </h3>
                  <p
                    className={`text-white truncate-2-lines mb-2 tablet:max-w-[80vw] max-w-[40%] large:text-xl text-base leading-9 large:leading-[48px] font-normal `}
                  >
                    {onBoardingtData.summary}
                  </p>
                  <p className="text-white font-medium mb-4 tablet:max-w-[80%] max-w-[40%] large:text-base text-sm leading-9 large:leading-[48px]">
                    {onBoardingtData.date} | {onBoardingtData.time} |{" "}
                    {onBoardingtData.location}{" "}
                  </p>
                  <button
                    className={`hover-text-button justify-center flex items-center py-2.5 h-12 large:h-14 px-12 bg-background-darkYellow rounded-2xl text-sm large:text-base text-primary-boulder50 font-semibold w-max `}
                  >
                    <div className="flex-col flex overflow-hidden relative h-4">
                      {" "}
                      <span className="h-5 leading-4 overflow-hidden duration-300">
                        {" "}
                        Register Now!
                      </span>{" "}
                      <span className="h-5 leading-4 overflow-hidden absolute translate-y-4 duration-300">
                        {" "}
                        Register Now!
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-[33px] flex justify-center items-center space-x-1 w-full">
          {onBoardingInfo.map((_, index) => {
            const width =
              index === activeIndex
                ? "w-[38px] bg-[#ffbb0a]"
                : "w-[13px] bg-white/30";
            return (
              <div
                key={index}
                className={`rounded-lg h-[6px] large:h-[7.7px] transition-all duration-500 ease-in-out ${width}`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
