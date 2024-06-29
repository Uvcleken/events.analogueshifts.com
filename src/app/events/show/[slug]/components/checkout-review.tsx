"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { storeRegistration } from "@/utils/show-event/store-registration";

export default function CheckoutReview({
  event,
  close,
  eventSlug,
  setLoading,
}: any) {
  const [opacity, setOpacity] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    setOpacity(1);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    storeRegistration(eventSlug, name, email, contact, setLoading);
  };

  return (
    <section
      style={{ opacity: opacity }}
      className="fixed duration-300 top-0 left-0 z-40 bg-black/10 w-screen h-screen flex justify-center items-center"
    >
      <div className="tablet:w-4/5 w-[90%] tablet:h-[94vh] h-[70vh] bg-white flex flex-col-reverse tablet:flex-row">
        <div className="tablet:w-[70%] w-full h-[70%] tablet:h-full">
          <div className="w-full pl-5 border-b h-20 flex items-center">
            <h3 className="text-base font-medium text-primary-boulder700">
              <b>Checkout Review</b>
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full overflow-y-auto h-max max-h-[calc(100%-80px)] px-6 md:px-10 py-6 flex flex-wrap gap-y-5 gap-x-3"
          >
            <p className="text-sm text-primary-boulder500 font-medium">
              You&apos;re about to purchase a Ticket for <b>{event.title}.</b>{" "}
              Please enter your Personal Details in the Form Below.
            </p>
            <h3 className="text-primary-boulder900 font-medium text-base tablet:text-xl">
              <b>Personal Information</b>
            </h3>
            <p className="text-sm text-primary-boulder500 font-medium">
              We&apos;ll send you an Email with your Ticket Details once
              you&apos;ve purchased The Ticket
            </p>
            <Input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-none h-12 text-primary-boulder900"
              placeholder="Full Name"
            />
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="md:w-[calc(50%-6px)] w-full rounded-none h-12 text-primary-boulder900"
              placeholder="Email"
            />
            <Input
              required
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="md:w-[calc(50%-6px)] w-full rounded-none h-12 text-primary-boulder900"
              placeholder="Contact"
            />
            <button className="w-full h-12 flex justify-center items-center hover:bg-background-darkYellow/90 bg-background-darkYellow outline-none text-white font-bold text-sm">
              Register
            </button>
          </form>
        </div>
        <div className="tablet:w-[30%] w-full relative h-[30%] tablet:h-full bg-background-darkPurple border-l">
          <img
            alt=""
            src={event.thumbnail.length > 0 ? event.thumbnail : "/concert.jpg"}
            className="w-full h-[30%] object-cover hidden tablet:block"
          />
          <div
            onClick={() => close()}
            className="w-11 text-primary-boulder900 cursor-pointer h-11 rounded-full hover:bg-white/70 bg-white/60 flex justify-center items-center absolute right-2 top-2"
          >
            <X width={16} />
          </div>
          <div className="tablet:h-[70%] h-full w-full pt-5 px-6">
            <p className="text-primary-boulder900 text-sm font-medium pb-5">
              <b>Order summary</b>
            </p>
            <p className="text-primary-boulder900 mb-5 text-sm font-medium pb-3.5 border-b flex justify-between items-center">
              <span> 1 x Ticket</span>
              <span>${event.price}</span>
            </p>
            <p className="text-primary-boulder900 text-base font-medium flex justify-between items-center">
              <b>Total</b>
              <b>${event.price}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
