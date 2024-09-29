"use client";
import Link from "next/link";
import RightArrowWhite from "@/assets/images/right-arrow-white.svg";
import { Share2 } from "lucide-react";

import { share } from "@/configs/share";
import { useAuth } from "@/hooks/auth";
import Image from "next/image";

interface Params {
  item: any;
  index: number;
}

export default function EventGridTile({ item, index }: Params) {
  const { notifyUser } = useAuth();

  return (
    <div
      key={index}
      className={`flex-shrink-0 flex w-full sm:w-[calc(50%-20px)] lg:w-1/3 ${
        index === 0
          ? "pr-5 lg:pr-8 tablet:px-2"
          : index !== 1
          ? "pl-5 lg:pl-8 tablet:px-2"
          : ""
      }`}
    >
      <div className="flex relative event-grid flex-col w-full">
        <Link
          href={""}
          className="w-full tablet:h-[200px] h-[232px] rounded-2xl mb-6"
        >
          <img
            src={item?.img ? item.img : "/venue.jpeg"}
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
        <div className="w-full flex flex-col">
          <h2 className="large:text-xl font-medium text-[#111111] large:leading-[37px] mb-3 text-lg tablet:text-base">
            {item.title}
          </h2>
          <p className="truncate-2-lines text-primary-boulder400 h-[60px] tablet:leading-7 mb-[22px] leading-[33px] tablet:text-xs text-sm">
            {item.summary}
          </p>
          <p className="text-primary-boulder900 mb-[26px] font-medium leading-[33px] tablet:text-xs text-sm">
            {item.date} | {item.time} | {item.location}{" "}
          </p>
          <Link
            className="h-[53px] hover-text-button bg-background-darkYellow text-primary-boulder50 flex justify-center items-center gap-1 rounded-2xl text-sm large:text-base font-semibold"
            href=""
          >
            {" "}
            <div className="flex-col flex overflow-hidden relative h-4">
              {" "}
              <span className="h-5 leading-4 overflow-hidden duration-300">
                {" "}
                Events details
              </span>{" "}
              <span className="h-5 leading-4 overflow-hidden absolute translate-y-4 duration-300">
                {" "}
                Events details
              </span>
            </div>
            <Image
              src={RightArrowWhite}
              alt=""
              className="h-max large:w-max w-4"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
