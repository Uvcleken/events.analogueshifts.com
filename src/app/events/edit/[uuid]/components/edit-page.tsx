"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import UploadImage from "@/app/events/create/components/upload-image";
import EventInfo from "@/app/events/create/components/event-info";
import DateAndLocation from "@/app/events/create/components/date-and-location";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import Loading from "@/components/application/loading";
import { getEventToEdit } from "@/utils/edit-event/get-event";
import {
  handleClickOutside,
  toggleSection,
} from "@/utils/create-event/helper-functions";
import { createEvent } from "@/utils/create-event/create-event";
import { useRouter } from "next/navigation";

export default function EditPage({ uuid }: { uuid: string }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startsDate, setStartsDate] = useState("");
  const [endsDate, setEndsDate] = useState("");
  const [countriesPrices, setCountriesPrices] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [countriesParameters, setCountriesParameters] = useState([]);
  const [locationType, setLocationType] = useState("physical");
  const [location, setLocation] = useState("");

  const prefillInputs = (data: any) => {
    setEmail(data.email);
    setContact(data.contact);
    setTitle(data.title);
    setThumbnail(data.thumbnail);
    setDescription(data.description);
    setPrice(data.price);
    setStartsDate(data.starts_date);
    setEndsDate(data.ends_date);
    setCountriesPrices(data.countriesPrices);
    setLocationType(data.location_type);
    setLocation(data.location);
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
    const authSession = Cookies.get("analogueshifts");
    if (authSession) {
      setUser(JSON.parse(authSession));
      getEventToEdit(
        setLoading,
        JSON.parse(authSession),
        prefillInputs,
        setCountriesParameters,
        uuid
      );
    }
  }, []);

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
          countriesParameters={countriesParameters}
          setContriesPrices={setCountriesPrices}
          contriesPrices={countriesPrices}
          price={price}
          email={email}
          contact={contact}
          setContact={setContact}
          setEmail={setEmail}
          setPrice={setPrice}
          isOpen={openSection === "info"}
          toggleSection={(section: string) =>
            toggleSection(section, setOpenSection)
          }
          title={title}
          summary={description}
          setTitle={setTitle}
          setSummary={setDescription}
        />

        <DateAndLocation
          isOpen={openSection === "date"}
          toggleSection={(section: string) =>
            toggleSection(section, setOpenSection)
          }
          location={location}
          locationType={locationType}
          setLocation={setLocation}
          setLocationType={setLocationType}
          startsDate={startsDate}
          endsDate={endsDate}
          setStartsDate={setStartsDate}
          setEndsDate={setEndsDate}
        />

        <UploadImage
          user={user}
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
          onClick={() =>
            createEvent(
              setLoading,
              email,
              contact,
              title,
              thumbnail,
              description,
              price,
              startsDate,
              endsDate,
              countriesPrices,
              locationType,
              locationType,
              user,
              router,
              process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/event/" + uuid,
              "PUT"
            )
          }
          className="bg-background-darkYellow hover:bg-background-darkYellow/80 tablet:px-8 tablet:py-3"
        >
          Edit event
        </Button>
      </section>
    </main>
  );
}
