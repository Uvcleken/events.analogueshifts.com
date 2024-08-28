"use client";
import { useUser } from "@/contexts/user";
import { useEvents } from "@/hooks/events";
import { useEffect, useState } from "react";

import { ChevronLeft, Plus } from "lucide-react";

import YourPlan from "@/app/events/components/your-plan";
import Image from "next/image";
import EmptyBox from "@/assets/images/empty-box.png";
import Link from "next/link";
import PricingGridTile from "./pricing-grid-tile";
import AddPricing from "./add-pricing";
import { Skeleton } from "@/components/ui/skeleton";

export default function Pricings({ uuid }: { uuid: string }) {
  const [loading, setLoading] = useState(false);
  const [pricings, setPricings]: any = useState(null);
  const [event, setEvent]: any = useState(null);
  const [countries, setCountries] = useState([]);
  const [priceToEdit, setPriceToEdit] = useState(null);

  const [showAddpricingModal, setShowAddPricingModal] = useState(false);

  const { user }: any = useUser();
  const { getEvent } = useEvents();

  useEffect(() => {
    if (user) {
      getEvent({
        setLoading,
        uuid,
        setData: (data) => {
          setEvent(data);
          setPricings(data?.event_pricing || null);
        },
        setCountries: (data) => setCountries(data),
      });
    }
  }, [user]);

  return (
    <>
      {/* Add & Edit Price Modal */}
      <AddPricing
        event={event}
        eventUUID={uuid}
        countries={countries}
        priceToEdit={priceToEdit}
        setCountries={setCountries}
        isVisible={showAddpricingModal}
        close={() => {
          setShowAddPricingModal(false);
          setPriceToEdit(null);
        }}
        setData={(data) => {
          setEvent(data);
          setPricings(data?.event_pricing || null);
        }}
      />

      <main className="my-10 items-start grid grid-cols-7 gap-7 mx-auto w-[90%] max-w-desktop">
        <div className="col-span-5 tablet:col-span-7 flex flex-col gap-5">
          <Link
            href="/events"
            className="flex items-center w-max gap-1 text-background-darkYellow text-sm font-medium"
          >
            <ChevronLeft height={13} /> Back to Events
          </Link>
          {!user || loading ? (
            <Skeleton className="w-full h-9" />
          ) : (
            <h1 className="text-primary-boulder700 mb-5 tablet:text-3xl text-5xl font-sans">
              <b> {event?.title}</b>
            </h1>
          )}

          <div className="p-6 rounded-md border h-max max-h-screen">
            <div className="w-full border-b h-16 justify-between flex items-center px-3">
              <h2 className="text-primary-boulder900 tablet:text-xl text-3xl font-sans">
                <b>Event Pricings</b>
              </h2>
              {event && (
                <button
                  onClick={() => setShowAddPricingModal(true)}
                  className="outline-none outline-transparent hover:bg-black/5  h-10 w-10 text-primary-boulder900 flex items-center justify-center rounded-full"
                >
                  <Plus width={18} />
                </button>
              )}
            </div>

            {/* List */}
            <div className="scroll-hidden w-full h-[70vh] overflow-y-auto">
              {!user || loading ? (
                <div className="w-full flex flex-col gap-5 py-5">
                  <Skeleton className="w-full h-11" />
                  <Skeleton className="w-full h-11" />
                  <Skeleton className="w-full h-11" />
                </div>
              ) : (
                <>
                  {pricings?.length === 0 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Image
                        src={EmptyBox}
                        alt="Empty Box"
                        className="max-h-emptyBox w-max"
                      />
                    </div>
                  ) : (
                    <div className="w-full flex flex-col gap-5 py-5">
                      {pricings?.map((item: any) => {
                        return (
                          <PricingGridTile
                            key={item.uuid}
                            item={item}
                            eventUUID={uuid}
                            setData={(data: any) => {
                              setEvent(data);
                              setPricings(data?.event_pricing || null);
                            }}
                            setPriceToEdit={setPriceToEdit}
                          />
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <YourPlan />
      </main>
    </>
  );
}
