import { Skeleton } from "@/components/ui/skeleton";
import { convertDateFormat } from "@/app/events/resources/convert-date-format";

interface Params {
  orders: any[];
  loading: boolean;
  user: any;
}

export default function OrdersTable({ orders, loading, user }: Params) {
  return (
    <div className="w-full max-w-full py-6 mt-7  bg-white overflow-x-auto rounded-3xl border">
      <h3 className="text-primary-boulder700 px-6 text-lg font-medium pb-2 w-full">
        {orders?.length} <small>ORDERS</small>
      </h3>
      <table className="w-full min-w-[800px] ">
        <thead>
          <tr className="w-full h-14 border-t">
            <th className="text-[15px] pl-6 text-primary-boulder900  font-normal text-start ">
              Email
            </th>
            <th className="text-[15px] text-primary-boulder900  font-normal text-start ">
              Reference
            </th>
            <th className="text-[15px] text-primary-boulder900  font-normal text-start ">
              Price
            </th>
            <th className="text-[15px] text-primary-boulder900  font-normal text-start ">
              Location
            </th>
            <th className="text-[15px] text-primary-boulder900  font-normal text-start">
              Date
            </th>
            <th className="text-[15px] text-primary-boulder900 font-normal text-start">
              Contact
            </th>
          </tr>
        </thead>
        {orders && !loading && (
          <tbody>
            {orders.map((item: any, index: number) => {
              return (
                <tr
                  key={crypto.randomUUID()}
                  className={`w-full h-14 ${
                    index % 2 === 0 ? "bg-primary-boulder300/10" : ""
                  }`}
                >
                  <td className="text-sm pl-6 text-primary-boulder900 font-normal text-start ">
                    {item.email}
                  </td>
                  <td className="text-sm text-primary-boulder900 font-normal text-start">
                    {item.reference}
                  </td>
                  <td className="text-sm text-primary-boulder900 font-normal text-start">
                    ${item.amount}
                  </td>
                  <td className="text-sm text-primary-boulder900 font-normal text-start">
                    {item.location}
                  </td>
                  <td className="text-sm text-primary-boulder900  font-normal text-start">
                    {convertDateFormat(item.created_at)}
                  </td>
                  <td className="text-sm text-primary-boulder900 font-normal text-start">
                    {item.contact}
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {(loading || !user) && (
        <div className="w-full h-max flex items-center flex-col gap-3 px-5">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
      )}
    </div>
  );
}
