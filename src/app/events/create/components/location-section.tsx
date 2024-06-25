import { Input } from "@/components/ui/input";
import { MapPin, Video } from "lucide-react";

interface LocationSectionInterface {
  location: string;
  locationType: string;
  setLocation: any;
  setLocationType: any;
}

export default function LocationSection({
  location,
  locationType,
  setLocation,
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

      {/* For Online Event */}
      {locationType === "virtual" && (
        <h5 className="text-primary-boulder900 font-medium text-[13px]">
          Your event is Online, You&apos;re meant to Contact your Guests with a
          link to the event livestreams and more.
        </h5>
      )}

      {/* For Physical Event */}
      {locationType === "physical" && (
        <>
          <h6 className="text-primary-boulder900 font-semibold text-base mb-3">
            Event location
          </h6>
          <p className="text-primary-boulder900 font-normal text-xs mb-3">
            Enter your physical location For your Event.
          </p>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            className="text-sm font-medium text-primary-boulder900 placeholder:text-primary-boulder900/70 h-12 mb-6"
          />
        </>
      )}
    </>
  );
}
