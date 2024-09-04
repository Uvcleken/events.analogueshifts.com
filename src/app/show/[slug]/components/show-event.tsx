"use client";

import TicketCard from "./ticket-card";
import CheckoutReview from "./checkout-review";

import { useAuth } from "@/hooks/auth";
import { useState } from "react";

import { share } from "@/configs/share";
import { convertDateFormat } from "@/app/events/resources/convert-date-format";

import { Share2, Clock, MapPin, Video } from "lucide-react";

interface Params {
  event: any;
}

export default function ShowEvent({ event }: Params) {
  const [checkoutModal, setCheckOutModal] = useState(false);

  const { notifyUser } = useAuth();

  return (
    <main className="w-full h-max">
      <CheckoutReview
        event={event}
        close={() => setCheckOutModal(false)}
        show={checkoutModal}
        prices={event?.prices || []}
      />

      {event ? (
        <div
          style={{ backgroundImage: "url(/curve.svg)" }}
          className="w-full max-w-[1500px] mx-auto tablet:h-[30vh] bg-cover bg-center h-[66vh]"
        >
          <div
            style={{
              backgroundImage: `url(${
                event.thumbnail.length > 0 && event.thumbnail !== "null"
                  ? event.thumbnail
                  : "/concert.jpg"
              })`,
            }}
            className="w-[90%] bg-cover tablet:h-64 translate-y-10 h-[72vh] max-w-desktop mx-auto rounded-3xl overflow-hidden"
          >
            <div className="w-full h-full backdrop-blur-lg ">
              <img
                src={
                  event.thumbnail.length > 0 && event.thumbnail !== "null"
                    ? event.thumbnail
                    : "/concert.jpg"
                }
                alt="Cover Photo"
                className=" tablet:w-4/5 w-9/12 max-w-full mx-auto h-full object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <h1 className="text-center text-2xl font-bold text-primary-boulder900">
            <b>Not Found</b>
          </h1>
        </div>
      )}
      {event && (
        <div className="pt-14  w-[90%] tablet:mt-[30px] tablet:pb-10  max-w-desktop mx-auto mt-[55px]">
          <div className="w-full mb-5 flex justify-between  items-center">
            <h1 className="text-primary-boulder900 tablet:text-3xl text-6xl font-sans">
              <b> {event.title}</b>
            </h1>
            <button
              onClick={() => {
                share(
                  event.title,
                  window.location.origin + `/show/${event.slug}`,
                  notifyUser
                );
              }}
              className="min-w-10 text-primary-boulder900 min-h-10 rounded-full bg-transparent outline-none flex justify-center items-center hover:bg-gray-700/10"
            >
              <Share2 width={18} />
            </button>
          </div>
          <div className="w-full grid grid-cols-6 tablet:grid-cols-1 tablet:gap-4 gap-16 items-start">
            <div className="col-span-4 max-w-full tablet:col-span-1 flex flex-col">
              <div
                dangerouslySetInnerHTML={{ __html: event.description }}
                className="text-primary-boulder700 font-normal text-base prose"
              ></div>

              <h2 className="text-primary-boulder900 mt-3 tablet:text-base text-2xl font-sans mb-5">
                <b>Registration Date and time of Event</b>
              </h2>
              <p className="text-primary-boulder700 max-w-full  font-medium text-sm flex flex-wrap gap-1 items-center">
                Starts: &nbsp; {convertDateFormat(event.starts_date)} &nbsp;{" "}
                <Clock width={16} /> {event.starts_date.split(" ")[1]} &nbsp;-
                &nbsp; Ends: &nbsp;
                {convertDateFormat(event.ends_date)} &nbsp; <Clock width={16} />{" "}
                {event.ends_date.split(" ")[1]}
              </p>

              <h2 className="text-primary-boulder900 mt-7 tablet:text-base text-2xl font-semibold mb-5">
                <b>Event Location</b>
              </h2>
              <p className="text-primary-boulder700 max-w-full  font-medium text-sm flex flex-wrap gap-1 items-center">
                {event.location_type === "physical" ? (
                  <>
                    <MapPin width={18} /> &nbsp; {event.location}
                  </>
                ) : (
                  <>
                    <Video width={18} /> &nbsp; This is an online event
                  </>
                )}
              </p>
            </div>

            {/* Ticket Section */}
            <TicketCard setCheckOutModal={setCheckOutModal} event={event} />
          </div>
        </div>
      )}
    </main>
  );
}
