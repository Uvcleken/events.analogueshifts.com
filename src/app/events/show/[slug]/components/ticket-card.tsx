export default function TicketCard({
  event,
  setCheckOutModal,
}: {
  event: any;
  setCheckOutModal: any;
}) {
  return (
    <>
      <div className="tablet:col-span-2 col-span-1 w-full max-h-[300px] left-0 fixed bottom-0 tablet:static p-5 bg-white border flex flex-col gap-5">
        <div className="w-full flex flex-col max-h-[200px] overflow-y-auto p-4 border">
          <p className="text-base font-medium text-primary-boulder900">
            <b>Ticket Fee: {"$" + event.price}</b>
          </p>

          {event.countriesPrices && (
            <div className="mt-5">
              <p className="text-sm border-b py-2 mb-3 font-medium text-primary-boulder900">
                <b>Price for other countries</b>
              </p>
              <div className="w-full flex flex-col gap-2">
                {event.countriesPrices.map((item: any) => {
                  return (
                    <p
                      key={crypto.randomUUID()}
                      className="text-sm font-medium text-primary-boulder900"
                    >
                      {" "}
                      <b>{item.code}: </b>${item.price}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
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
