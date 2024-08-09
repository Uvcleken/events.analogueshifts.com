"use client";
import Link from "next/link";
import { convertDateFormat } from "@/app/events/resources/convert-date-format";
import { Share2 } from "lucide-react";

import { share } from "@/configs/share";
import { useAuth } from "@/hooks/auth";

interface Params {
  item: any;
}

export default function EventGridTile({ item }: Params) {
  const { notifyUser } = useAuth();

  return (
    <div className="w-full event-grid col-span-1 h-max flex flex-col duration-300 hover:shadow-xl rounded-b-3xl">
      <div className="relative rounded-md h-36 overflow-hidden">
        <Link href={"/show/" + item.slug} className="w-full h-full">
          <img
            src={item.thumbnail}
            alt=""
            className="w-full h-full rounded object-cover"
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
          className="absolute duration-500 share-button bottom-2 text-primary-boulder700 cursor-pointer flex justify-center items-center right-2 bg-white border w-10 h-10 rounded-full"
        >
          <Share2 width={16} />
        </div>
      </div>
      <div className="w-full flex flex-col px-4 py-3">
        <h2 className="text-primary-boulder900 font-semibold text-lg overflow-hidden text-ellipsis line-clamp-2">
          {item.title}
        </h2>
        <p className="text-sm font-medium mb-1 text-primary-boulder900">
          {convertDateFormat(item.starts_date)} •{" "}
          {item.starts_date.split(" ")[1]}
        </p>
        <p className="text-sm font-normal mb-2 text-primary-boulder500">
          {item.location_type === "virtual" ? "Online Event" : item.location}
        </p>
      </div>
    </div>
  );
}
