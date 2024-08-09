"use client";
import { useState, useEffect } from "react";
import { useEvents } from "@/hooks/events";

import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AnimatePresence, motion } from "framer-motion";
import ButtonLoadingSpinner from "@/components/ui/loading-button";

interface Params {
  event: any;
  close: () => void;
  isVisible: boolean;
  countries: any[];
  setData: (data: any) => void;
  setCountries: (data: any) => void;
  eventUUID: string;
  priceToEdit: any;
}

export default function AddPricing({
  event,
  close,
  isVisible,
  countries,
  setData,
  setCountries,
  eventUUID,
  priceToEdit,
}: Params) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (priceToEdit) {
      setName(priceToEdit?.name);
      setDescription(priceToEdit?.description);
      setPrice(priceToEdit?.price);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setCountry("default");
    }
  }, [priceToEdit, isVisible]);

  const { addEventPrice } = useEvents();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let code = "default";
    let location = "default";
    if (country.length > 0 && country !== "default") {
      const selectedCountry = countries.find((item) => item.code === country);
      code = selectedCountry.code;
      location = selectedCountry.name;
    }

    try {
      await addEventPrice({
        setLoading,
        eventUUID,
        setData,
        setCountries,
        data: {
          name,
          code,
          price,
          location,
          description,
          packages: null,
        },
        type: priceToEdit ? "edit" : "add",
        priceUUID: priceToEdit ? priceToEdit.uuid : "",
      });
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {(isVisible || priceToEdit !== null) && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 z-40 bg-black/10 w-screen h-screen flex justify-center items-center"
        >
          <motion.div className="tablet:w-4/5 w-[90%] tablet:h-[94vh] h-[70vh] bg-white flex flex-col-reverse tablet:flex-row">
            <div className="tablet:w-[70%] w-full h-[70%] tablet:h-full">
              <div className="w-full pl-5 border-b h-20 flex items-center">
                <h3 className="text-base font-medium text-primary-boulder700">
                  <b>{priceToEdit ? "Edit" : "Add"} Pricing</b>
                </h3>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full overflow-y-auto h-max max-h-[calc(100%-80px)] px-6 md:px-10 py-6 flex flex-wrap gap-y-5 gap-x-3"
              >
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="rounded-none h-12 text-primary-boulder900 text-sm placeholder:text-primary-boulder500"
                  placeholder="Pricing name e.g Standard"
                />
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min={0}
                  type="number"
                  className="md:w-[calc(50%-6px)] w-full rounded-none text-sm h-12 text-primary-boulder500 placeholder:text-primary-boulder500"
                  placeholder="Price in USD"
                />

                <select
                  className="md:w-[calc(50%-6px)] border outline-none pl-2 text-sm w-full rounded-none h-12 text-primary-boulder500"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option
                    className="text-sm text-primary-boulder500"
                    value="default"
                  >
                    Select Country
                  </option>

                  {countries.map((item: any) => {
                    return (
                      <option
                        className="text-sm text-primary-boulder500"
                        key={item.code}
                        value={item.code}
                      >
                        {item.name}
                      </option>
                    );
                  })}
                </select>

                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className=" w-full rounded-none text-sm  text-primary-boulder500 placeholder:text-primary-boulder900"
                  placeholder="Pricing Description"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 flex justify-center items-center hover:bg-background-darkYellow/90 bg-background-darkYellow outline-none text-white font-bold text-sm"
                >
                  {loading ? (
                    <ButtonLoadingSpinner />
                  ) : (
                    `${priceToEdit ? "Edit" : "Add"} Pricing`
                  )}
                </button>
              </form>
            </div>
            <div className="tablet:w-[30%] overflow-hidden w-full relative h-[30%] tablet:h-full bg-background-darkPurple border-l">
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
              <div className="tablet:h-max h-full w-full pt-6 px-6">
                <p className="text-primary-boulder900 text-sm border-b mb-3 font-medium pb-3">
                  <b>{event.title}</b>
                </p>
                <p className="text-primary-boulder500/90 text-[13px] leading-5  font-normal">
                  {priceToEdit
                    ? "Editing this pricing option."
                    : "Add a new pricing option to this event."}{" "}
                  This can be a pricing for a specific country, or a pricing for
                  all countries.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
