"use client";
import Link from "next/link";
import { convertDateFormat } from "@/app/events/resources/convert-date-format";
import { Share2 } from "lucide-react";

import { share } from "@/configs/share";
import { useAuth } from "@/hooks/auth";

interface Params {
  item: any;
  index: number;
}

export default function EventGridTile({ item, index }: Params) {
  const { notifyUser } = useAuth();

  return (
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
            {item.location_type === "virtual" ? "Online Event" : item.location}
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
  );
}
