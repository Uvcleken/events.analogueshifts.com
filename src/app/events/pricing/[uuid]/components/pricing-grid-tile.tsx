"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";

import IdiomProof from "@/components/application/idiom-proof";
import { useState } from "react";
import { useEvents } from "@/hooks/events";

export default function PricingGridTile({
  item,
  setLoading,
  eventUUID,
  setData,
  setPriceToEdit,
}: any) {
  const { deleteEventPrice } = useEvents();
  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);

  const handleDelete = () => {
    setDeleteModalDisplay(false);
    deleteEventPrice({ setLoading, priceUUID: item.uuid, eventUUID, setData });
  };

  return (
    <div className="w-full max-w-full p-3 rounded-lg bg-white border flex justify-between items-center">
      {/* Delete Event Idiom Modal */}
      <IdiomProof
        action={handleDelete}
        close={() => setDeleteModalDisplay(false)}
        description={"Are you sure you want to delete the price " + item.name}
        label="Delete"
        open={deleteModalDisplay}
        title="Confirm delete"
      />

      <div className=" flex gap-3 overflow-x-hidden max-w-[90%] items-center">
        <div className="w-max h-max flex flex-col gap-2 justify-between">
          <p className="text-primary-boulder900 w-max text-base font-semibold">
            ${item.price}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-background-darkYellow tracking-wider text-xs font-semibold">
              {item.name.toUpperCase()}
            </p>
            {item.location !== "default" && (
              <>
                <p>-</p>
                <p className="text-primary-boulder700 tracking-wider text-xs font-semibold">
                  {item.location}
                </p>
              </>
            )}
          </div>
        </div>{" "}
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
            onClick={() => setPriceToEdit(item)}
            className="py-3 cursor-pointer px-4 focus:bg-gray-700/5"
          >
            <Pencil className="mr-2 h-4 w-4" /> Edit Pricing
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteModalDisplay(true)}
            className="py-3 cursor-pointer px-4 focus:bg-gray-700/5"
          >
            <Trash className="mr-2 h-4 w-4" /> Delete Pricing
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
