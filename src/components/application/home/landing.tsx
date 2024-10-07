"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SectionMessage from "./section-message";
import Plus from "@/assets/images/plus.svg";
import Calendar from "@/assets/images/calendar.svg";
import Cookies from "js-cookie";

import Hero from "@/assets/images/home/hero.svg";

export default function Landing() {
  const router = useRouter();
  const token = Cookies.get("analogueshifts");

  return (
    <section className="w-full flex justify-center">
      <div className="w-full bg-white pl-[66px] max-w-[1800px] large:pl-[104px] tablet:flex-col-reverse flex-row justify-between pr-[55px] large:pr-[85px] tablet:px-6 gap-[51px] large:pt-[91px] pt-[71px] large:pb-[108px] pb-[88px] h-max items-center flex">
        <div className="w-max max-w-[calc(55%-51px)] tablet:max-w-full flex flex-col gap-6">
          <div className="w-max max-w-full h-max rounded-full tablet:py-1 py-1.5 large:py-2.5 tablet:px-2.5 px-3.5 large:px-6 flex items-center tablet:gap-1 gap-2.5 bg-background-darkYellow/10">
            <Image
              className="large:w-max h-max tablet:w-2.5 w-4"
              src={Calendar}
              alt=""
            />
            <p className="font-medium tablet:text-xs text-sm large:text-base text-background-darkYellow">
              Events
            </p>
          </div>
          <SectionMessage
            action={() => {
              router.push(
                token
                  ? "/events/create"
                  : "https://auth.analogueshifts.app?app=events"
              );
            }}
            title="Create, Share, and Post Events"
            highlighted="with Ease"
            buttonChildren={
              <>
                <Image src={Plus} alt="" className="animate-pulse" />
                <div className="flex-col flex overflow-hidden relative h-4">
                  {" "}
                  <span className="h-5 leading-4 overflow-hidden duration-300">
                    {" "}
                    Create event
                  </span>{" "}
                  <span className="h-5 leading-4 overflow-hidden absolute translate-y-4 duration-300">
                    {" "}
                    Create event
                  </span>
                </div>
              </>
            }
            description="Whether it's a tech event, webinar, or onsite gathering, our platform simplifies event creation and sharing. Start organizing impactful events today!"
          />
        </div>

        <Image src={Hero} alt="" className="w-[45%] h-max tablet:w-max" />
      </div>
    </section>
  );
}
