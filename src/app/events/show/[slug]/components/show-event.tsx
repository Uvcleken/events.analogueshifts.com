"use client";
import { useEffect, useState } from "react";
import { Calendar, Share2, Clock, MapPin, Video } from "lucide-react";
import { share } from "@/utils/share";
import { fetchEventPublic } from "@/utils/show-event/fetch-event-public";
import { convertDateFormat } from "@/app/events/resources/convert-date-format";
import Loading from "@/components/application/loading";
import TicketCard from "./ticket-card";
import CheckoutReview from "./checkout-review";

export default function ShowEvent({ slug }: { slug: string }) {
  const [event, setEvent]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkoutModal, setCheckOutModal] = useState(false);

  useEffect(() => {
    fetchEventPublic(slug, setLoading, setEvent);
  }, []);

  return (
    <main className="w-full h-max">
      {loading && <Loading />}
      {checkoutModal && (
        <CheckoutReview
          event={event}
          close={() => setCheckOutModal(false)}
          eventSlug={slug}
          setLoading={setLoading}
        />
      )}
      <div
        style={{ backgroundImage: "url(/curve.svg)" }}
        className="w-full h-[30vh] bg-cover bg-center tablet:h-[66vh]"
      >
        {event && (
          <div
            style={{
              backgroundImage: `url(${
                event.thumbnail.length > 0 ? event.thumbnail : "/concert.jpg"
              })`,
            }}
            className="w-[90%] bg-cover h-64 translate-y-10 tablet:h-[72vh] max-w-desktop mx-auto rounded-3xl overflow-hidden"
          >
            <div className="w-full h-full backdrop-blur-lg ">
              <img
                src={
                  event.thumbnail.length > 0 ? event.thumbnail : "/concert.jpg"
                }
                alt="Cover Photo"
                className=" w-4/5 tablet:w-9/12 max-w-full mx-auto h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
      {event && (
        <div className="mt-10 tablet:mb-44 w-[90%] pb-[300px] translate-y-10 tablet:pb-0 max-w-desktop mx-auto tablet:translate-y-[calc(6vh+40px)]">
          <div className="w-full mb-5 flex justify-between  items-center">
            <h1 className="text-primary-boulder900 text-3xl tablet:text-6xl font-bold">
              <b> {event.title}</b>
            </h1>
            <button
              onClick={() => {
                share(
                  event.title,
                  window.location.origin + `/events/show/${event.slug}`
                );
              }}
              className="w-10 text-primary-boulder900 h-10 rounded-full bg-transparent outline-none flex justify-center items-center hover:bg-gray-700/10"
            >
              <Share2 width={18} />
            </button>
          </div>
          <div className="w-full grid tablet:grid-cols-6 grid-cols-1 tablet:gap-16 items-start">
            <div className="tablet:col-span-4 max-w-full col-span-1 flex flex-col">
              <p className="text-primary-boulder700 font-normal text-base mt-3">
                {event.description}
              </p>

              <h2 className="text-primary-boulder900 mt-7 text-base tablet:text-2xl font-semibold mb-5">
                <b>Date and time of Event</b>
              </h2>
              <p className="text-primary-boulder700 max-w-full  font-medium text-sm flex flex-wrap gap-1 items-center">
                <Calendar width={18} /> &nbsp;{" "}
                {convertDateFormat(event.starts_date)} &nbsp;{" "}
                <Clock width={16} /> {event.starts_date.split(" ")[1]} &nbsp;-
                &nbsp;
                {convertDateFormat(event.ends_date)} &nbsp; <Clock width={16} />{" "}
                {event.ends_date.split(" ")[1]}
              </p>

              <h2 className="text-primary-boulder900 mt-7 text-base tablet:text-2xl font-semibold mb-5">
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
