"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import Loading from "@/components/application/loading";
import { errorToast } from "@/utils/error-toast";
import { clearUserSession } from "@/utils/clear-user-session";
import OrdersTable from "./orders-table";

export default function OrdersDashboard({ eventUUID }: { eventUUID: string }) {
  const [user, setUser]: any = useState(null);
  const pageQuery = useSearchParams().getAll("page");
  const [orders, setOrders]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPageInfo, setCurrentPageInfo]: any = useState({});
  const getOrdersUrl = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/tools/event/registrations/${eventUUID}${
    pageQuery.length ? `?page=${pageQuery[0]}` : ""
  }`;

  const fetchOrders = async () => {
    const axios = require("axios");
    let config = {
      method: "GET",
      url: getOrdersUrl,
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };
    try {
      setLoading(true);
      let request = await axios.request(config);
      console.log(request);
      setOrders([]);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      errorToast(
        "Uh oh! Error fetching orders.",
        error?.response?.data?.message ||
          error.message ||
          "Failed To Fetch Orders"
      );
      if (error.response.status === 401) {
        clearUserSession();
      }
    }
  };

  useEffect(() => {
    const authSession = Cookies.get("analogueshifts");
    if (authSession) {
      setUser(JSON.parse(authSession));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <main className="my-10 mx-auto w-[90%] max-w-desktop">
      {loading && <Loading />}
      <div className="flex flex-col gap-5">
        <h1 className="text-primary-boulder700 text-3xl tablet:text-5xl font-bold">
          <b>Order Management</b>
        </h1>
        <p className="text-primary-boulder400 font-medium text-lg">
          Manage all orders for your event ticket. This is a list of people that
          registered for your event with their contact Information. Contact them
          to carry out actions like Processing Refunds, etc.
        </p>
      </div>

      {orders && <OrdersTable orders={orders} />}
    </main>
  );
}
