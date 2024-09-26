import Carousel from "./carousel-slide";
import CategorySelector from "./category-selector";

import posts from "../utilities/dummy-events.json";

export default function ExploreEvents({ events }: { events: any[] }) {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full px-[66px] max-w-[1800px] tablet:px-6 large:px-[104px] h-max bg-white items-center large:py-[168px] tablet:py-14 py-24 flex flex-col">
        <h2 className="text-center mb-5 font-semibold text-2xl tablet:text-lg large:text-32 text-black">
          Explore <span className="text-background-darkYellow">Events</span>
        </h2>
        <p className="text-primary-boulder400 mb-6 large:mb-8 tablet:text-sm text-base large:text-xl text-center font-normal">
          Explore upcoming tailored events.
        </p>
        <CategorySelector />
        <Carousel posts={posts} />
      </div>
    </section>
  );
}
