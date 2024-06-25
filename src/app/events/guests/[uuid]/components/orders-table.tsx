import { MoreHorizontal, Eye } from "lucide-react";
import Image from "next/image";
import EmptyBox from "@/assets/images/empty-box.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OrdersTable({ orders }: any) {
  return (
    <div className="w-full max-w-full py-6 mt-7  bg-white overflow-x-auto rounded-3xl border">
      <h3 className="text-primary-boulder700 px-6 text-lg font-medium pb-2 w-full">
        {orders.length} <small>ORDERS</small>
      </h3>
      <table className="w-full min-w-[800px] ">
        <thead>
          <tr className="w-full h-11">
            <th className="text-[15px] pl-6 text-primary-boulder900 w-2/5 font-normal text-start ">
              Email
            </th>
            <th className="text-[15px] text-primary-boulder900 w-[35%] font-normal text-start">
              Date
            </th>
            <th className="text-[15px] text-primary-boulder900 w-[15%] font-normal text-start">
              Contact
            </th>
            <th className="text-[15px] pr-6 text-primary-boulder900 w-[10%] font-normal text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item: any, index: number) => {
            return (
              <tr
                key={crypto.randomUUID()}
                className={`w-full h-11 ${
                  index % 2 === 0 ? "bg-primary-boulder300/10" : ""
                }`}
              >
                <td className="text-sm pl-6 text-primary-boulder900 w-2/5 font-normal text-start ">
                  {item.email}
                </td>
                <td className="text-sm text-primary-boulder900 w-[35%] font-normal text-start">
                  {item.created_at}
                </td>
                <td className="text-sm text-primary-boulder900 w-[15%] font-normal text-start">
                  {item.contact}
                </td>
                <td className="text-sm text-primary-boulder900 w-[10%] font-normal text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="outline-none w-max h-max cursor-pointer border-none  py-1 px-2 mx-auto rounded-full">
                        <MoreHorizontal
                          width={15}
                          className="text-primary-boulder500"
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 rounded-2xl">
                      <DropdownMenuLabel className="text-primary-boulder950 py-3">
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="text-primary-boulder700 focus:bg-background-lightYellow/20 py-2">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Open Response</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {orders.length === 0 && (
        <div className="w-full flex justify-center items-center pt-6">
          <Image
            src={EmptyBox}
            alt="Empty Box"
            className="max-h-emptyBox w-max"
          />
        </div>
      )}
    </div>
  );
}
