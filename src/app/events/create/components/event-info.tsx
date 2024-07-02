"use client";
import { useState } from "react";
import React from "react";
import { Plus, Check, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/comobox";
import { Button } from "@/components/ui/button";
import { errorToast } from "@/utils/error-toast";
import { Switch } from "@/components/ui/switch";

interface EventInfo {
  isOpen: boolean;
  toggleSection: any;
  title: string;
  contact: string;
  summary: string;
  setTitle: any;
  setSummary: any;
  price: string;
  email: string;
  setEmail: any;
  setContact: any;
  setPrice: any;
  contriesPrices: any[];
  setContriesPrices: any;
  countriesParameters: any[];
}

const EventInfo: React.FC<EventInfo> = ({
  isOpen,
  toggleSection,
  title,
  contact,
  summary,
  setTitle,
  setSummary,
  price,
  email,
  setEmail,
  setContact,
  setPrice,
  contriesPrices,
  setContriesPrices,
  countriesParameters,
}) => {
  const [countryCodeValue, setCountryCodeValue] = useState("");
  const [countryPriceValue, setCountryPriceValue] = useState("");
  const [addCountryPrices, setAddCountryPrices] = useState(false);

  // Checks If All the required info field Has been Field
  const validate = () => {
    if (
      title.trim().length &&
      summary.trim().length &&
      email.trim().length &&
      price.trim().length
    ) {
      return true;
    } else {
      return false;
    }
  };

  const countriesCodes = countriesParameters.map((item: any) => {
    return {
      value: `${item.name} (${item.code})`,
      label: item.name + " " + item.code,
    };
  });

  // Add A country Price To the List
  const handleAddCountryPrice = () => {
    // Validate If The user Entered A Country Code And a Price
    if (countryCodeValue === "" || countryPriceValue === "") {
      errorToast("Missing Field", "Please Enter a country and a Price.");
      return;
    }

    // Add The Price
    setContriesPrices((prev: any) => [
      ...prev,
      {
        code: countryCodeValue.split(" ")[1].slice(1, 3),
        price: countryPriceValue,
      },
    ]);

    setCountryCodeValue("");
    setCountryPriceValue("");
  };

  // Remove A country Price From the List
  const handleRemoveCountryPrice = (countryCode: string) => {
    setContriesPrices((prev: any) =>
      prev.filter((item: any) => item.code !== countryCode)
    );
  };

  return (
    <div
      className={`section w-full rounded-lg border-2 hover:border-background-darkYellow ${
        isOpen
          ? "open border-background-darkYellow"
          : "closed border-gray-700/10"
      }`}
      onClick={() => toggleSection("info")}
    >
      <div
        className={`rounded-lg overflow-hidden flex-col p-5 ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <div
          className={`ml-auto w-9 h-9 flex items-center justify-center rounded-full  ${
            validate()
              ? "bg-green-600 text-white"
              : "bg-gray-700/5 text-background-darkYellow"
          }`}
        >
          {validate() ? <Check width={20} /> : <Plus width={20} />}
        </div>
        <h2 className="text-primary-boulder900 text-xl tablet:text-3xl font-bold mb-3.5">
          <b>{title.trim().length ? title : "Event Title"}</b>
        </h2>
        <p className="text-primary-boulder900 font-medium text-sm">
          {summary.trim().length ? title : "Event Description"}
        </p>
      </div>
      {isOpen && (
        <div className="w-full rounded-lg overflow-hidden h-max p-6 flex flex-col">
          <h4 className="text-primary-boulder900 font-bold text-xl mb-6">
            Event Overview
          </h4>
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Your Email
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Enter your email address. Attendes will contact you with this email
            if they have any question.
          </p>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-6"
          />
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Your Contact
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Enter your contact. Attendes will contact you with this number if
            they have any question.
          </p>
          <Input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter Contact"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-6"
          />
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Event title
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Be clear and descriptive with a title that tells people what your
            event is about.
          </p>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-6"
          />
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Event Summary
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Grab people&apos;s attention with a description about your event.
            Attendees will see this at the top of your event page.
          </p>
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Event Summary"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-28 mb-6"
          />
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Event Price
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Enter a price for this Event Ticket. Enter &quot;0&quot; if your
            Ticket is Free.
          </p>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Event Price"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-3"
          />
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Please Note that Prices are in USD.
          </p>
          <div className="mb-3 flex items-center gap-3 flex-wrap">
            <p className="text-primary-boulder900 font-normal text-xs">
              Add USD Prices for other Countries.
            </p>{" "}
            <Switch
              onCheckedChange={(value: boolean) => setAddCountryPrices(value)}
            />
          </div>
          {addCountryPrices && (
            <div className="w-full mb-4 flex flex-wrap gap-y-3 justify-between items-center">
              <div className="flex sm:max-w-[calc(100%-150px)]   max-w-full flex-wrap gap-y-3 items-center gap-x-5">
                <div className="sm:w-[calc(50%-10px)] w-full">
                  <Combobox
                    value={countryCodeValue}
                    setValue={setCountryCodeValue}
                    list={countriesCodes}
                  />
                </div>
                <div className="sm:w-[calc(50%-10px)] w-full">
                  <Input
                    type="number"
                    value={countryPriceValue}
                    onChange={(e) => setCountryPriceValue(e.target.value)}
                    placeholder="Enter Price"
                    className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70"
                  />
                </div>
              </div>
              <Button
                onClick={handleAddCountryPrice}
                className="bg-background-darkYellow w-full sm:w-max hover:bg-background-darkYellow/80"
              >
                <Plus className="mr-1 " width={15} /> Add Price
              </Button>
            </div>
          )}
          <div className="w-full flex flex-col gap-3">
            {contriesPrices.map((item: any) => {
              return (
                <div
                  className="w-full flex justify-between items-center py-2 border-b px-3"
                  key={crypto.randomUUID()}
                >
                  <p className="text-primary-boulder900 font-normal text-xs">
                    {item.code}
                  </p>
                  <p className="text-primary-boulder900 font-normal text-xs">
                    {item.price}
                  </p>
                  <Button
                    className="unclose text-xs h-8 px-4 text-primary-boulder900"
                    onClick={() => handleRemoveCountryPrice(item.code)}
                    variant="outline"
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventInfo;
