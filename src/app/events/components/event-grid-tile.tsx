"use client";
import { useAuth } from "@/hooks/auth";
import { useEvents } from "@/hooks/events";
import { useRouter } from "next/navigation";
import { useEventsContext } from "@/contexts/events";

import { convertDateFormat } from "../resources/convert-date-format";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  EllipsisVertical,
  Users,
  PartyPopper,
  Pencil,
  Share2,
  Trash,
  Banknote,
} from "lucide-react";
import { share } from "@/configs/share";
import IdiomProof from "@/components/application/idiom-proof";
import { useState } from "react";
import Cookies from "js-cookie";

export default function EventGridTile({ item, setLoading, url }: any) {
  const router = useRouter();
  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);
  const { setEvents, setPaginationInfo } = useEventsContext();

  const { notifyUser } = useAuth();
  const { deleteEvent } = useEvents();

  const token = Cookies.get("analogueshifts");

  const handleDelete = () => {
    setDeleteModalDisplay(false);
    deleteEvent({
      setData: setEvents,
      setLoading,
      setPaginationData: setPaginationInfo,
      url,
      uuid: item.uuid,
    });
  };

  return (
    <div className="w-full relative max-w-full p-0 overflow-hidden md:p-3 rounded-lg bg-white border flex justify-between items-center">
      {/* Delete Event Idiom Modal */}
      <IdiomProof
        action={handleDelete}
        close={() => setDeleteModalDisplay(false)}
        description={"Are you sure you want to delete the event " + item.title}
        label="Delete"
        open={deleteModalDisplay}
        title="Confirm delete"
      />

      <div className=" flex md:flex-row flex-col gap-3 overflow-x-hidden max-w-full md:max-w-[90%] items-center">
        <div className="w-full hidden h-10 md:flex flex-col justify-between">
          <p className="text-background-darkYellow text-xs font-semibold">
            {convertDateFormat(item.starts_date)?.slice(0, 3)?.toUpperCase()}
          </p>
          <p className="text-primary-boulder900 text-lg font-semibold">
            {convertDateFormat(item.starts_date)?.slice(4, 6)}
          </p>
        </div>{" "}
        <div className="md:w-20 w-full max-w-full h-36 min-w-20 md:max-w-20 overflow-hidden md:h-16">
          <img
            src={
              item.thumbnail.length > 0 && item.thumbnail !== "null"
                ? item.thumbnail
                : "/venue-little.jpeg"
            }
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full px-4 pt-1 pb-3 gap-1.5 md:gap-0 md:p-0 h-max md:h-10 flex flex-col justify-between">
          <p className="text-primary-boulder900 truncate  text-sm font-semibold">
            {item.title}
          </p>
          <p className="text-primary-boulder900 w-full md:truncate text-[13px] font-medium">
            <span className="text-background-darkYellow"> On Sale ·</span>&nbsp;
            Starts {convertDateFormat(item.starts_date)} · Ends{" "}
            {convertDateFormat(item.ends_date)}
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none rotate-90 bg-white md:rotate-0 absolute top-6 right-3 md:static outline-transparent md:hover:bg-black/5 -translate-y-4 sm:translate-y-0 h-8 w-8 flex items-center justify-center rounded-full">
          <EllipsisVertical className="text-primary-boulder900" height={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-full w-60">
          <DropdownMenuLabel className="text-primary-boulder900">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/events/pricing/${item.uuid}`)}
            className="py-3 cursor-pointer px-4 focus:bg-gray-700/5"
          >
            <Banknote className="mr-2 h-4 w-4" /> Manage Pricing
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/events/guests/${item.uuid}`)}
            className="py-3 cursor-pointer px-4 focus:bg-gray-700/5"
          >
            <Users className="mr-2 h-4 w-4" /> View Guests
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/show/${item.slug}`)}
            className="py-3 cursor-pointer px-3 focus:bg-gray-700/5"
          >
            <PartyPopper className="mr-2 h-4 w-4" /> View Event
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/events/edit/${item.uuid}`)}
            className="py-3 cursor-pointer px-3 focus:bg-gray-700/5"
          >
            <Pencil className="mr-2 h-4 w-4" /> Edit Event
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              share(
                item.title,
                window.location.origin + `/show/${item.slug}`,
                notifyUser
              );
            }}
            className="py-3 cursor-pointer px-3 focus:bg-gray-700/5"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share Event
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteModalDisplay(true)}
            className="py-3 cursor-pointer px-3 focus:bg-gray-700/5"
          >
            <Trash className="mr-2 h-4 w-4" /> Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
