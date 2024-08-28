import React from "react";
import { Plus, Check, Calendar } from "lucide-react";
import { convertDateFormat } from "../../resources/convert-date-format";
import {
  validate,
  DateAndLocationInterface,
} from "@/configs/upload-event/date-and-location";
import { Input } from "@/components/ui/input";
import LocationSection from "./location-section";

const DateAndLocation: React.FC<DateAndLocationInterface> = ({
  isOpen,
  toggleSection,
  dateAndLocationInfo,
  setDateAndLocationInfo,
}) => {
  const checkValidation = () =>
    validate(
      dateAndLocationInfo.startsDate,
      dateAndLocationInfo.endsDate,
      dateAndLocationInfo.location,
      dateAndLocationInfo.locationType
    );

  // Update Value of dateAndLocationInfo
  const updateValue = (label: string, value: string) => {
    setDateAndLocationInfo((prev: any) => {
      return { ...prev, [label]: value };
    });
  };

  return (
    <div
      className={`section w-full rounded-lg border-2 hover:border-background-darkYellow ${
        isOpen
          ? "open border-background-darkYellow"
          : "closed border-gray-700/10"
      }`}
      onClick={() => toggleSection("date")}
    >
      <div
        className={`rounded-lg overflow-hidden flex-col p-5 ${
          isOpen ? "hidden" : "flex"
        }`}
      >
        <div
          className={`ml-auto w-9 h-9 flex items-center justify-center rounded-full  ${
            checkValidation()
              ? "bg-green-600 text-white"
              : "bg-gray-700/5 text-background-darkYellow"
          }`}
        >
          {checkValidation() ? <Check width={20} /> : <Plus width={20} />}
        </div>
        <h2 className="text-primary-boulder900 tablet:text-xl text-3xl font-bold mb-3.5">
          <b>Registration Date & Event Location</b>
        </h2>
        <p className="text-primary-boulder900 font-medium text-sm flex gap-1 items-center">
          <Calendar width={18} />{" "}
          {checkValidation()
            ? convertDateFormat(dateAndLocationInfo.startsDate)
            : "Day, Month, Year"}
        </p>
      </div>
      {isOpen && (
        <div className="w-full rounded-lg overflow-hidden h-max p-6 flex flex-col">
          <h4 className="text-primary-boulder900 font-bold text-xl mb-6">
            Event Registration Date
          </h4>
          <div className="w-full grid tablet:grid-cols-1 grid-cols-2 gap-5 mb-8">
            <div className="col-span-1 flex flex-col">
              <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
                Starts Date
              </h6>
              <p className="text-primary-boulder900 font-normal text-xs mb-3">
                Enter the date and time the registration for your event starts.
              </p>
              <Input
                type="datetime-local"
                value={dateAndLocationInfo.startsDate}
                onChange={(e) => updateValue("startsDate", e.target.value)}
                placeholder=""
                className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12"
              />
            </div>
            <div className="col-span-1 flex flex-col">
              <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
                Ends Date
              </h6>
              <p className="text-primary-boulder900 font-normal text-xs mb-3">
                Enter the date and time the registration for your event ends.
              </p>
              <Input
                type="datetime-local"
                value={dateAndLocationInfo.endsDate}
                onChange={(e) => updateValue("endsDate", e.target.value)}
                placeholder=""
                className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12"
              />
            </div>
          </div>

          {/* Location */}
          <LocationSection
            url_link={dateAndLocationInfo.url_link}
            location={dateAndLocationInfo.location}
            locationType={dateAndLocationInfo.locationType}
            setLocation={(value: string) => updateValue("location", value)}
            setUrlLink={(value: string) => updateValue("url_link", value)}
            setLocationType={(value: string) =>
              updateValue("locationType", value)
            }
          />
        </div>
      )}
    </div>
  );
};

export default DateAndLocation;
