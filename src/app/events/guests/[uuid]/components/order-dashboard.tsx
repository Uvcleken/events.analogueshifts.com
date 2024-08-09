"use client";
import { useUser } from "@/contexts/user";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEvents } from "@/hooks/events";

import OrdersTable from "./orders-table";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import OrdersPagination from "./orders-pagination";

export default function OrdersDashboard({ eventUUID }: { eventUUID: string }) {
  const { user } = useUser();
  const pageQuery = useSearchParams().getAll("page");
  const [orders, setOrders]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const { fetchOrders } = useEvents();

  const [currentPageInfo, setCurrentPageInfo]: any = useState({});
  const getOrdersUrl = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/tools/event/registrations/${eventUUID}${
    pageQuery.length ? `?page=${pageQuery[0]}` : ""
  }`;

  const getOrders = () => {
    fetchOrders({
      setData: setOrders,
      setLoading,
      setPaginationData: setCurrentPageInfo,
      url: getOrdersUrl,
    });
  };

  useEffect(() => {
    if (user) {
      getOrders();
    }
  }, [user]);

  return (
    <main className="my-10 mx-auto w-[90%] max-w-desktop">
      <div className="flex flex-col gap-5">
        <Link
          href="/events"
          className="flex w-max items-center gap-1 text-background-darkYellow text-sm font-medium mb-2"
        >
          <ChevronLeft height={13} /> Back to Events
        </Link>
        <h1 className="text-primary-boulder700 text-3xl tablet:text-5xl font-bold">
          <b>Order Management</b>
        </h1>
        <p className="text-primary-boulder400 font-medium text-lg">
          Manage all orders for your event ticket. This is a list of people that
          registered for your event with their contact Information. Contact them
          to carry out actions like Processing Refunds, etc.
        </p>
      </div>

      <OrdersTable user={user} loading={loading} orders={orders} />
      <div className="w-max pt-6">
        <OrdersPagination currentPageInfo={currentPageInfo} />
      </div>
    </main>
  );
}
