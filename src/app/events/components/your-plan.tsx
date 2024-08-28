import { Check } from "lucide-react";
import planBenefits from "../resources/free-plan.json";

import Link from "next/link";
import { CalendarPlus } from "lucide-react";

export default function YourPlan() {
  return (
    <div className="col-span-2 tablet:col-span-7 flex flex-col gap-7">
      <div className="p-5 rounded-md border">
        <div className="w-full mb-5 flex justify-between items-center">
          <div className="px-2 py-1.5 rounded-lg bg-gray-700/5">
            <p className="text-background-darkYellow text-[13px] font-medium">
              Current plan
            </p>
          </div>
          <Link href="">
            <h3 className="cursor-pointer text-background-darkYellow text-[13px] font-medium">
              Manage
            </h3>
          </Link>
        </div>
        <h3 className="text-xl text-primary-boulder700 font-bold mb-5">Free</h3>
        <div className="w-full flex flex-col gap-2">
          {planBenefits.map((item) => {
            return (
              <div
                key={item.value}
                className="w-full flex items-center gap-2 text-primary-boulder700"
              >
                <Check width={17} />
                <p className="text-sm font-normal">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-5 rounded-md border">
        <h3 className="text-lg text-primary-boulder700 font-bold mb-5">
          Help-ful Links
        </h3>
        <div className="w-full flex flex-col gap-3">
          <Link
            href="/events/create"
            className="helpful-link w-full bg-transparent hover:bg-background-darkYellow/5 border hover:border-2 rounded-xl hover:border-background-darkYellow h-max py-5 flex flex-col justify-center items-center gap-3"
          >
            <div className="w-14 h-14 rounded-full bg-background-darkYellow/5 flex justify-center items-center text-background-darkYellow">
              <CalendarPlus width={25} />
            </div>
            <p className="text-sm text-primary-boulder900 font-medium">
              Create An Event
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
