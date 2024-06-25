import { useRouter } from "next/navigation";
import Image from "next/image";
import VenueLittle from "@/assets/images/venue-little.jpeg";
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
} from "lucide-react";
import { share } from "@/utils/share";

export default function EventGridTile({ item }: any) {
  const router = useRouter();

  return (
    <div className="w-full max-w-full p-3 rounded-lg bg-gray-700/5 flex justify-between items-center">
      <div className=" flex gap-3 overflow-x-hidden max-w-[90%] items-center">
        <div className="w-full h-10 flex flex-col justify-between">
          <p className="text-background-darkYellow text-xs font-semibold">
            {convertDateFormat(item.starts_date)?.slice(0, 3)?.toUpperCase()}
          </p>
          <p className="text-primary-boulder900 text-lg font-semibold">
            {convertDateFormat(item.starts_date)?.slice(4, 6)}
          </p>
        </div>{" "}
        <Image src={VenueLittle} alt="" className="w-20 h-16 object-cover" />
        <div className="w-full h-10 flex flex-col justify-between">
          <p className="text-primary-boulder900 text-sm font-semibold">
            {item.title}
          </p>
          <p className="text-primary-boulder900 w-full truncate text-[13px] font-medium">
            <span className="text-background-darkYellow"> On Sale ·</span>&nbsp;
            Starts {convertDateFormat(item.starts_date)} · Ends{" "}
            {convertDateFormat(item.ends_date)}
          </p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none outline-transparent hover:bg-black/5 -translate-y-4 sm:translate-y-0 h-8 w-8 flex items-center justify-center rounded-full">
          <EllipsisVertical className="text-primary-boulder900" height={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-full w-60">
          <DropdownMenuLabel className="text-primary-boulder900">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/events/guests/${item.uuid}`)}
            className="py-3 cursor-pointer px-4 focus:bg-gray-700/5"
          >
            <Users className="mr-2 h-4 w-4" /> View Guests
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/events/show/${item.slug}`)}
            className="py-3 cursor-pointer px-3 focus:bg-gray-700/5"
          >
            <PartyPopper className="mr-2 h-4 w-4" /> View Event
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3 cursor-pointer px-3 focus:bg-gray-700/5">
            <Pencil className="mr-2 h-4 w-4" /> Edit Event
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              share(
                item.title,
                window.location.origin + `/events/show/${item.slug}`
              );
            }}
            className="py-3 cursor-pointer px-3 focus:bg-gray-700/5"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share Event
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3 cursor-pointer px-3 focus:bg-gray-700/5">
            <Trash className="mr-2 h-4 w-4" /> Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
