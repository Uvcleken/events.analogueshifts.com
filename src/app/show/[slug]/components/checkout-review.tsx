"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEvents } from "@/hooks/events";

import { AnimatePresence, motion } from "framer-motion";
import ButtonLoadingSpinner from "@/components/ui/loading-button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Params {
  event: any;
  close: () => void;
  show: boolean;
  prices: any[];
}

export default function CheckoutReview({ event, close, show, prices }: Params) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState(prices[0]);

  const { storeRegistration } = useEvents();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await storeRegistration({
        contact,
        email,
        name,
        setLoading,
        package_uuid: selectedPricing.uuid,
        handleSuccess: close,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
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
                  You&apos;re about to purchase a Ticket for{" "}
                  <b>{event.title}.</b> Please enter your Personal Details in
                  the Form Below.
                </p>

                <Input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-none h-12 text-primary-boulder500 placeholder:text-primary-boulder500"
                  placeholder="Full Name"
                />
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="md:w-[calc(50%-6px)] w-full rounded-none h-12 text-primary-boulder500 placeholder:text-primary-boulder500"
                  placeholder="Email"
                />
                <Input
                  required
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="md:w-[calc(50%-6px)] w-full rounded-none h-12 text-primary-boulder500 placeholder:text-primary-boulder500"
                  placeholder="Contact"
                />
                <Select
                  value={selectedPricing.uuid}
                  onValueChange={(value) => {
                    setSelectedPricing(
                      prices.find((item: any) => item.uuid === value)
                    );
                  }}
                >
                  <SelectTrigger className=" w-full rounded-none h-12 text-primary-boulder500">
                    <SelectValue placeholder="Select Pricing" />
                  </SelectTrigger>
                  <SelectContent>
                    {prices.map((item: any) => {
                      return (
                        <SelectItem
                          className="text-sm text-primary-boulder500 focus:text-primary-boulder700"
                          key={item.uuid}
                          value={item.uuid}
                        >
                          {item.name} - {item.location}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <button className="w-full h-12 flex justify-center items-center hover:bg-background-darkYellow/90 bg-background-darkYellow outline-none text-white font-bold text-sm">
                  {loading ? <ButtonLoadingSpinner /> : "Register"}
                </button>
              </form>
            </div>
            <div className="tablet:w-[30%] w-full relative h-[30%] tablet:h-full bg-background-darkPurple border-l">
              <motion.img
                initial={{ y: "-100%" }}
                animate={{
                  y: 0,
                }}
                transition={{ duration: 0.2 }}
                alt=""
                src={
                  event.thumbnail.length > 0 ? event.thumbnail : "/concert.jpg"
                }
                className="w-full h-[30%] object-cover hidden tablet:block"
              />
              <div
                onClick={close}
                className="w-11 text-primary-boulder900 cursor-pointer h-11 rounded-full hover:bg-white/70 bg-white/60 flex justify-center items-center absolute right-2 top-2"
              >
                <X width={16} />
              </div>
              <div className="tablet:h-[70%] h-full w-full pt-5 px-6">
                <p className="text-primary-boulder900 text-sm font-medium pb-5">
                  <b>Order summary</b>
                </p>
                <p className="text-primary-boulder900 mb-5 text-sm font-medium pb-3.5 border-b flex justify-between items-center">
                  <span>{selectedPricing.name}</span> <span> 1 x Ticket</span>
                </p>
                <p className="text-primary-boulder900 text-base font-medium flex justify-between items-center">
                  <b>Total</b>
                  <b>${selectedPricing.price}</b>
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
