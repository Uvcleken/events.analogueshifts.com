"use client";
import { useAuth } from "@/hooks/auth";
import { useEvents } from "@/hooks/events";
import { useEffect, useState } from "react";

import Link from "next/link";
import UploadImage from "./upload-image";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import EventInfo from "./event-info";
import DateAndLocation from "./date-and-location";

import Loading from "@/components/application/loading";
import { handleUpload } from "@/configs/upload-event/handle-upload";

import {
  handleClickOutside,
  toggleSection,
} from "@/configs/upload-event/layout-functions";

export default function CreatePage() {
  const [eventInfoData, setEventInfoData] = useState({
    email: "",
    contact: "",
    title: "",
    description: "",
    price: "0",
    maximum: "10",
    status: "public",
  });

  const [dateAndLocationInfo, setDateAndLocationInfo] = useState({
    startsDate: "",
    endsDate: "",
    locationType: "physical",
    location: "null",
    url_link: "",
    longitude: "",
    latitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [openSection, setOpenSection] = useState(null);

  const { notifyUser } = useAuth();
  const { uploadEvent } = useEvents();

  useEffect(() => {
    document.addEventListener("click", (e: any) =>
      handleClickOutside(e, setOpenSection)
    );
    return () => {
      document.removeEventListener("click", (e: any) =>
        handleClickOutside(e, setOpenSection)
      );
    };
  }, []);

  const handleCreateEvent = () => {
    handleUpload(
      "POST",
      setLoading,
      thumbnail,
      eventInfoData,
      dateAndLocationInfo,
      uploadEvent
    );
  };

  return (
    <main className="mt-10 pb-40  mx-auto w-[90%] max-w-createPage flex flex-col gap-3">
      {loading && <Loading />}
      <Link
        href="/events"
        className="flex items-center gap-1 text-background-darkYellow text-sm font-medium mb-2"
      >
        <ChevronLeft height={13} /> Back to Events
      </Link>
      <h3 className="text-primary-boulder900 font-bold text-3xl">
        Build your event page
      </h3>
      <p className="text-primary-boulder900 font-medium text-base mb-4">
        Add all of your event details and let attendees know what to expect
      </p>
      <section className="w-[90%] mx-auto flex flex-col gap-5">
        <EventInfo
          isOpen={openSection === "info"}
          toggleSection={(section: string) =>
            toggleSection(section, setOpenSection)
          }
          eventInfoData={eventInfoData}
          setEventInfoData={setEventInfoData}
        />

        <DateAndLocation
          isOpen={openSection === "date"}
          toggleSection={(section: string) =>
            toggleSection(section, setOpenSection)
          }
          dateAndLocationInfo={dateAndLocationInfo}
          setDateAndLocationInfo={setDateAndLocationInfo}
        />

        <UploadImage
          notifyUser={notifyUser}
          thumbnail={thumbnail}
          isOpen={openSection === "image"}
          toggleSection={(section: string) =>
            toggleSection(section, setOpenSection)
          }
          setLoading={setLoading}
          setThumbnail={setThumbnail}
        />
      </section>

      <section className="fixed z-20 bottom-0 left-0 w-screen bg-white py-5 flex justify-end tablet:pr-8 pr-5">
        <Button
          onClick={handleCreateEvent}
          className="bg-background-darkYellow hover:bg-background-darkYellow/80 tablet:px-8 tablet:py-3"
        >
          Create event
        </Button>
      </section>
    </main>
  );
}
