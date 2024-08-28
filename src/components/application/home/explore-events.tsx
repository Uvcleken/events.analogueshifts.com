import Carousel from "./carousel-slide";

export default function ExploreEvents({ events }: { events: any[] }) {
  return (
    <section className="w-full  tablet:px-3 z-20 sticky px-10 h-max bg-white items-center overflow-hidden large:py-[168px] tablet:py-14 py-24 flex flex-col">
      <h2 className="text-center mb-5 font-semibold text-2xl tablet:text-lg large:text-32 text-black">
        Explore <span className="text-background-darkYellow">Events</span>
      </h2>
      <p className="text-primary-boulder400 mb-12 large:mb-16 tablet:text-sm text-base large:text-xl text-center font-normal">
        Explore upcoming tailored events.
      </p>
      <Carousel posts={events} />
    </section>
  );
}
