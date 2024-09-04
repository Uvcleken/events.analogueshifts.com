export default function TicketCard({
  event,
  setCheckOutModal,
}: {
  event: any;
  setCheckOutModal: any;
}) {
  return (
    <>
      <div className="col-span-2 tablet:col-span-1 w-full h-max p-5 bg-white border flex flex-col gap-5">
        <div className="w-full flex flex-col h-max p-4 border">
          <p className="text-base font-medium text-primary-boulder900">
            <b>Pricings</b>
          </p>

          <div className="mt-3 pt-3 border-t border-primary-boulder200/30">
            <div className="w-full flex flex-col gap-3">
              {event.prices.map((item: any) => {
                return (
                  <p
                    key={crypto.randomUUID()}
                    className="text-sm font-semibold text-primary-boulder900"
                  >
                    {" "}
                    {item.name}: ${item.price}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <button
          onClick={() => setCheckOutModal(true)}
          className="outline-none w-full text-center h-12 leading-10 hover:bg-background-darkYellow/80 text-sm font-bold text-white bg-background-darkYellow "
        >
          Reserve a spot
        </button>
      </div>
    </>
  );
}
