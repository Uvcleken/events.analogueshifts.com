import axios from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEventsContext } from "@/contexts/events";
import Cookies from "js-cookie";
import { clearUserSession } from "@/configs/clear-user-session";
import { useToast } from "@/contexts/toast";

interface GetEventsParams {
  url: string;
  setLoading: (loading: boolean) => void;
  setData: (data: any) => void;
  setPaginationData: (data: any) => void;
  userToken: string;
}

interface GetEventParams {
  uuid: string;
  setLoading: (loading: boolean) => void;
  setData: (data: any) => void;
  setCountries?: (data: any) => void;
}

interface DeleteEventParams {
  uuid: string;
  setLoading: (loading: boolean) => void;
  setData: (data: any) => void;
  url: string;
  setPaginationData: (data: any) => void;
}

interface CreateEventParams {
  data: any;
  method: string;
  setLoading: (loading: boolean) => void;
  uuid?: string;
}

interface AddEventPricesParams {
  setLoading: (loading: boolean) => void;
  eventUUID: string;
  data: any;
  setData: (data: any) => void;
  setCountries: (data: any) => void;
  type: string;
  priceUUID?: string;
}

interface DeleteEventPriceParams {
  setLoading: (loading: boolean) => void;
  eventUUID: string;
  setData: (data: any) => void;
  priceUUID: string;
}

interface StoreRegistrationParams {
  setLoading: (loading: boolean) => void;
  name: string;
  email: string;
  contact: string;
  package_uuid: string;
  handleSuccess: () => void;
}

interface GetOrdersParams {
  url: string;
  setData: (data: any) => void;
  setPaginationData: (data: any) => void;
  setLoading: (value: boolean) => void;
}

export const useEvents = () => {
  const router = useRouter();
  const { setEvents, setPaginationInfo } = useEventsContext();
  const { setMessage, setToast, setPosition }: any = useToast();

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const token = Cookies.get("analogueshifts");

  const notifyUser = (toast: string, message: string, position: string) => {
    setToast(toast);
    setMessage(message);
    setPosition(position);

    setTimeout(() => {
      setMessage("");
      setToast("");
      setPosition("right");
    }, 3000);
  };

  const fetchOrders = async ({
    setLoading,
    setData,
    setPaginationData,
    url,
  }: GetOrdersParams) => {
    try {
      setLoading(true);
      const response = await axios.request({
        url: url,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data?.data?.registered?.data);
      setPaginationData(response.data?.data?.registered);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notifyUser(
        "error",
        error?.response?.data?.data?.message || "Failed to fetch orders",
        "right"
      );
      console.log(error);

      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const storeRegistration = async ({
    setLoading,
    contact,
    email,
    name,
    package_uuid,
    handleSuccess,
  }: StoreRegistrationParams) => {
    try {
      setLoading(true);
      const response = await axios.request({
        url: "/event/register/" + package_uuid,
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { name, email, contact },
      });

      if (response.data.message === "Registration Successful!") {
        handleSuccess();
        notifyUser("success", response.data.message, "right");
      } else if (response.data?.data?.url) {
        window.open(response.data.data.url, "_parent");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notifyUser(
        "error",
        error?.response?.data?.data?.message || "Failed To Store Registration",
        "right"
      );
      console.log(error);
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const getEvents = async ({
    setLoading,
    url,
    setData,
    setPaginationData,
    userToken,
  }: GetEventsParams) => {
    try {
      setLoading(true);
      const response = await axios.request({
        url: url,
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });
      setPaginationData(response.data?.data?.events);
      setData(response.data?.data?.events?.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notifyUser(
        "error",
        error?.response?.data?.data?.message || "Failed To Fetch Events",
        "right"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const getEvent = async ({
    setLoading,
    setData,
    uuid,
    setCountries,
  }: GetEventParams) => {
    try {
      setLoading(true);
      const response = await axios.request({
        url: "/tools/event/" + uuid,
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.success) {
        setData(response?.data?.data?.event);
        if (setCountries) {
          setCountries(response?.data?.data?.countries);
        }
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notifyUser(
        "error",
        error?.response?.data?.data?.message || "Failed To Fetch Event",
        "right"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const deleteEvent = async ({
    setLoading,
    setData,
    uuid,
    url,
    setPaginationData,
  }: DeleteEventParams) => {
    try {
      setLoading(true);
      await axios.request({
        url: "/tools/event/" + uuid,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await getEvents({
        setLoading,
        setData,
        url,
        setPaginationData,
        userToken: token || "",
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notifyUser(
        "error",
        error?.response?.data?.message || "Failed to Delete Event",
        "right"
      );

      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const deleteEventPrice = async ({
    setData,
    setLoading,
    priceUUID,
    eventUUID,
  }: DeleteEventPriceParams) => {
    try {
      setLoading(true);
      await axios.request({
        url: "/tools/event/delete/" + priceUUID,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await getEvent({
        uuid: eventUUID,
        setData,
        setLoading,
      });
      setLoading(false);
      notifyUser("success", "Price Deleted", "right");
    } catch (error: any) {
      setLoading(false);
      notifyUser(
        "error",
        error?.response?.data?.message || "Failed to Delete Price",
        "right"
      );

      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const uploadEvent = async ({
    setLoading,
    data,
    method,
    uuid,
  }: CreateEventParams) => {
    let returnError = false;

    const eventInfoMissing = [
      data.email,
      data.title,
      data.description,
      data.price,
      data.maximum,
    ].some((item) => item.trim() === "");

    const dateAndLocationMissing = [data.starts_date, data.ends_date].some(
      (item) => item.trim() === ""
    );

    if (eventInfoMissing) {
      notifyUser("error", "Event Information Is not Complete", "right");
      returnError = true;
    } else if (
      !eventInfoMissing &&
      (dateAndLocationMissing ||
        (data.location_type === "physical" &&
          (data.location.trim() === "null" || data.location.trim() === "")))
    ) {
      notifyUser(
        "error",
        "Date and Location Information Is not Complete",
        "right"
      );
      returnError = true;
    } else if (
      !eventInfoMissing &&
      !dateAndLocationMissing &&
      data.thumbnail.trim().length === 0
    ) {
      notifyUser("error", "Event cover image is required", "right");
      returnError = true;
    }

    if (returnError) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.request({
        url: method === "POST" ? "/tools/event/create" : "/tools/event/" + uuid,
        method: method,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: data,
      });
      if (response.data.success) {
        notifyUser(
          "success",
          `Event ${method === "POST" ? "created" : "edited"} successfully`,
          "right"
        );
        await getEvents({
          setLoading,
          setPaginationData: setPaginationInfo,
          setData: setEvents,
          url: `/tools/event${page ? `?page=${page}` : ""}`,
          userToken: token || "",
        });
        router.push("/events");
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notifyUser(
        "error",
        error?.response?.data?.data?.message || "Failed To Create Event",
        "right"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  const addEventPrice = async ({
    data,
    setCountries,
    setData,
    setLoading,
    eventUUID,
    type,
    priceUUID,
  }: AddEventPricesParams) => {
    try {
      setLoading(true);
      const res = await axios.request({
        url:
          type === "add"
            ? "/tools/event/add/pricing/" + eventUUID
            : "/tools/event/update/" + priceUUID,
        method: type === "add" ? "POST" : "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        data,
      });

      if (res.data.success) {
        await getEvent({
          setData: setData,
          setLoading,
          setCountries,
          uuid: eventUUID,
        });
        notifyUser(
          "success",
          `Pricing ${type === "add" ? "Added" : "Edited"} Successfully`,
          "right"
        );
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notifyUser("error", error?.response?.data?.message, "right");

      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  return {
    getEvents,
    uploadEvent,
    getEvent,
    deleteEvent,
    addEventPrice,
    deleteEventPrice,
    storeRegistration,
    fetchOrders,
  };
};
