import { Input } from "@/components/ui/input";
import { MapPin, Video } from "lucide-react";
import LocationSearch from "./location-search";

interface LocationSectionInterface {
  location: string;
  locationType: string;
  url_link: string;
  setUrlLink: any;
  setLocation: any;
  setLocationType: any;
}

export default function LocationSection({
  url_link,
  location,
  locationType,
  setLocation,
  setUrlLink,
  setLocationType,
}: LocationSectionInterface) {
  return (
    <>
      <h4 className="text-primary-boulder900 font-bold text-xl mb-6">
        Event Location
      </h4>
      <div className="w-full flex items-center gap-3 mb-5">
        <button
          onClick={() => setLocationType("physical")}
          className={`w-max flex items-center rounded-full py-1.5 px-4 gap-2 text-sm font-medium ${
            locationType === "physical"
              ? "text-white bg-background-darkYellow"
              : "text-primary-boulder900 bg-gray-700/5"
          }`}
        >
          <MapPin height={22} width={19} /> Venue
        </button>
        <button
          onClick={() => setLocationType("virtual")}
          className={`w-max flex items-center rounded-full py-1.5 px-4 gap-2 text-sm font-medium ${
            locationType === "virtual"
              ? "text-white bg-background-darkYellow"
              : "text-primary-boulder900 bg-gray-700/5"
          }`}
        >
          <Video width={22} /> Online Event
        </button>
      </div>

      <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
        Event location
      </h6>

      {/* For Online Event */}
      {locationType === "virtual" && (
        <>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Enter the URL to your online event webinar. This isn&apos;t a
            required field, You can contact your Guests with a link to the event
            webinar.
          </p>
          <Input
            type="text"
            value={url_link}
            onChange={(e) => setUrlLink(e.target.value)}
            placeholder="Enter event URL"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-6"
          />
        </>
      )}

      {/* For Physical Event */}
      {locationType === "physical" && (
        <>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Enter your physical location For your Event.
          </p>
          <LocationSearch />
        </>
      )}
    </>
  );
}
