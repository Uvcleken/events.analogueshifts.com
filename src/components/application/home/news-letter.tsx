export default function NewsLetter() {
  return (
    <section
      style={{
        backgroundImage: "url(/lines-bg.png)",
      }}
      className="w-full max-w-[1650px] mx-auto bg-no-repeat bg-cover overflow-hidden bg-background-darkYellow large:py-[160px] tablet:py-14 py-24 px-6 items-center flex flex-col"
    >
      <h2 className="large:text-[32px] tablet:text-xl text-2xl text-center font-semibold text-black">
        Subscribe To <span className="text-white">Our Newsletter</span>
      </h2>
      <p className="max-w-[881px] tablet:max-w-full large:text-xl text-base leading-9 large:leading-[48px] font-normal text-[#907222]  text-center mt-5 mb-10">
        Stay updated with the latest event planning tips, exclusive platform
        features, and industry trends. Join our community today
      </p>
      <form className="flex gap-3 max-w-full justify-center tablet:flex-wrap items-center">
        <input
          type="email"
          required
          placeholder="Your Email Address..."
          className="border border-white/30 bg-white/10 rounded-2xl h-14 px-6 outline-none max-w-full w-[351px] text-base font-normal text-white/60 placeholder:text-white/60"
        />
        <button
          type="submit"
          className="h-14 hover-text-button px-12 tablet:w-[351px] max-w-full flex justify-center items-center bg-primary-boulder950 rounded-2xl text-base text-primary-boulder50 font-semibold"
        >
          <div className="flex-col flex overflow-hidden relative h-4">
            {" "}
            <span className="h-5 leading-4 overflow-hidden duration-300">
              {" "}
              Submit
            </span>{" "}
            <span className="h-5 leading-4 overflow-hidden absolute translate-y-4 duration-300">
              {" "}
              Submit
            </span>
          </div>
        </button>
      </form>
    </section>
  );
}
