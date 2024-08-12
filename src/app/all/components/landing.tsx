export default function Landing() {
  return (
    <div
      style={{
        backgroundImage: "url(/venue.jpeg)",
      }}
      className="w-full h-max bg-left-bottom overflow-hidden rounded-3xl bg-cover bg-no-repeat mt-8"
    >
      <div
        style={{
          background: "linear-gradient(to right, #39364f, transparent)",
        }}
        className="w-full h-max py-8 md:py-12 px-5 md:px-10"
      >
        <div className="w-[400px] max-w-[80%] flex flex-col">
          <h2 className="text-white font-semibold text-lg md:text-2xl mb-1">
            Explore upcoming
          </h2>
          <h1 className="text-white font-bold text-2xl md:text-4xl mb-3 md:mb-6">
            <b>Events</b>
          </h1>
          <p className="md:text-sm text-xs text-white/90 font-normal md:leading-6 mb-10">
            Looking for events to attend? we&apos;ve got loads of great tips and
            events. You can explore and register for events.
          </p>
          <button className="w-40 hover-text-button h-11 border flex justify-center items-center text-white/90 rounded-full font-medium text-sm">
            <div className="relative h-4 flex flex-col w-full overflow-hidden">
              <span className="w-full h-full duration-500 flex  justify-center items-center">
                Explore events
              </span>{" "}
              <span className="w-full h-full flex duration-500 justify-center items-center absolute translate-y-4">
                Explore events
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
