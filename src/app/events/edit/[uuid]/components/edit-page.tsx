"use client";
import { useAuth } from "@/hooks/auth";
import { useUser } from "@/contexts/user";
import { useEvents } from "@/hooks/events";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { Banknote, ChevronLeft } from "lucide-react";
import UploadImage from "@/app/events/create/components/upload-image";
import EventInfo from "@/app/events/create/components/event-info";
import DateAndLocation from "@/app/events/create/components/date-and-location";
import { Button } from "@/components/ui/button";
import Loading from "@/components/application/loading";
import {
  handleClickOutside,
  toggleSection,
} from "@/configs/upload-event/layout-functions";
import { handleUpload } from "@/configs/upload-event/handle-upload";

export default function EditPage({ uuid }: { uuid: string }) {
  const [loading, setLoading] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [thumbnail, setThumbnail] = useState("");

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

  const { user } = useUser();
  const { notifyUser } = useAuth();
  const { uploadEvent, getEvent } = useEvents();
  const router = useRouter();

  const prefillInputs = (data: any) => {
    setEventInfoData({
      email: data.email,
      contact: data.contact || "",
      title: data.title,
      description: data.description,
      price: "0",
      maximum: data.maximum,
      status: data.status ? "public" : "private",
    });
    setDateAndLocationInfo({
      startsDate: data.starts_date,
      endsDate: data.ends_date,
      locationType: data.location_type,
      location: data.location_type === "virtual" ? "null" : data.location,
      url_link: data.url_link || "",
      longitude: data.longitude || "",
      latitude: data.latitude || "",
    });
    setThumbnail(data.thumbnail);
  };

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

  useEffect(() => {
    if (user) {
      //  Get Event to edit
      getEvent({
        uuid,
        setLoading,
        setData: (data) => {
          prefillInputs(data);
        },
      });
    }
  }, [user]);

  const handleEditEvent = () => {
    handleUpload(
      "PUT",
      setLoading,
      thumbnail,
      eventInfoData,
      dateAndLocationInfo,
      uploadEvent,
      uuid
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
      <h3 className="text-primary-boulder900 font-bold text-3xl">Edit Event</h3>
      <p className="text-primary-boulder900 font-medium text-base mb-4">
        Make the adjustments and click on the Edit Event button below
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

      <section className="fixed z-20 items-center gap-5 bottom-0 left-0 w-screen bg-white py-5 flex justify-end tablet:pr-8 pr-5">
        <Button
          onClick={() => router.push(`/events/pricing/${uuid}`)}
          className="bg-white hover:bg-white flex items-center justify-center gap-2 border border-background-darkYellow text-background-darkYellow tablet:px-8 tablet:py-4"
        >
          <Banknote width={15} /> Manage pricing
        </Button>
        <Button
          onClick={handleEditEvent}
          className="bg-background-darkYellow hover:bg-background-darkYellow/80 tablet:px-8 tablet:py-4"
        >
          Edit event
        </Button>
      </section>
    </main>
  );
}
