import GuestLayout from "@/components/application/layouts/guest";
import Link from "next/link";
import { EventTypes } from "@/utils/landing";
import Slider from "@/components/application/home/slider";

export default function Home() {
  return (
    <GuestLayout>
      <Slider />
      <section className="w-full min-h-screen bg-white z-20 sticky top-0 flex justify-center sm:justify-start flex-wrap gap-12 py-7 px-4">
        {EventTypes.map((item) => {
          return (
            <Link
              key={item.title}
              href="/events/create"
              className="flex flex-col items-center gap-3"
            >
              <div className=" w-107 h-107 rounded-full border flex justify-center items-center text-primary-boulder500 hover:bg-background-darkYellow/10 hover:text-background-darkYellow/80 hover:border-transparent">
                {item.icon}
              </div>
              <p className="text-xs text-center w-107 font-semibold text-primary-boulder900">
                {item.title}
              </p>
            </Link>
          );
        })}
      </section>
    </GuestLayout>
  );
}
