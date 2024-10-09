"use client";
import Image from "next/image";
import Briefcase from "@/assets/images/briefcase.svg";
import Link from "next/link";

import { useUser } from "@/contexts/user";

export default function Landing() {
  const { user } = useUser();

  return (
    <section className="w-full overflow-hidden h-max large:pb-[156px] tablet:pb-[80px] pb-[110px] large:pt-[91px] pt-16 relative">
      <div className="w-full h-max  bg-transparent flex flex-col items-center justify-center">
        <div className="w-max max-w-full h-max tablet:mb-3 mb-5 rounded-full tablet:py-1 py-1.5 large:py-2.5 tablet:px-2.5 px-3.5 large:px-6 flex items-center tablet:gap-1 gap-2.5 bg-background-darkYellow/10">
          <Image
            className="large:w-max h-max tablet:w-2.5 w-4"
            src={Briefcase}
            alt=""
          />
          <p className="font-medium tablet:text-xs text-sm large:text-base text-background-darkYellow">
            All events
          </p>
        </div>
        <h1 className=" large:text-[32px] tablet:text-xl text-[26px] font-semibold tablet:mb-3 mb-4 large:mb-5 text-center large:leading-[48px] leading-9 tablet:px-5 px-0 text-black">
          Connecting you with tailored{" "}
          <span className="text-background-darkYellow">Events</span>
        </h1>
        <p className="text-center tablet:mb-5 mb-7 large:mb-10 tablet:max-w-full px-5 max-w-[750px] large:max-w-[800px] tablet:leading-7 leading-8 large:leading-[48px] font-normal tablet:text-sm text-base large:text-xl text-primary-boulder400">
          Create, manage, and promote your events with ease. Our platform
          empowers organizers to design unforgettable experiences, from small
          gatherings to large conferences. Connect with your audience, sell
          tickets, and track your event&apos;s success all in one place.
        </p>
        <div className="tablet:w-[90%] w-max max-w-full tablet:mb-5 mb-10 tablet:grid grid-cols-2 flex large:flex items-center large:h-14 h-14 tablet:h-max  gap-3">
          <input
            className="w-[415px] tablet:w-full tablet:col-span-2 tablet:h-12 h-full outline-none rounded-2xl border border-primary-boulder200 px-6 tablet:text-sm text-sm large:text-base font-normal text-primary-boulder700 placeholder:text-primary-boulder200"
            placeholder="Search for upcoming events"
          />
          <button className="rounded-2xl tablet:h-12  h-full bg-background-darkYellow flex justify-center items-center text-primary-boulder50 tablet:text-sm text-sm large:text-base font-semibold tablet:px-5 px-12">
            Search
          </button>
          <Link
            href={
              user
                ? "/events/create"
                : "https://auth.analogueshifts.app?app=events"
            }
            className="rounded-2xl tablet:h-12  h-full bg-transparent flex justify-center items-center text-background-darkYellow tablet:text-sm text-sm large:text-base font-semibold tablet:px-5 px-12 border border-background-darkYellow"
          >
            Create an event
          </Link>
        </div>
      </div>
    </section>
  );
}
