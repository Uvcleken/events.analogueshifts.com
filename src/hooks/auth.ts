import axios from "@/lib/axios";

import Cookies from "js-cookie";
import { clearUserSession } from "@/configs/clear-user-session";

import { useEvents } from "./events";
import { useUser } from "@/contexts/user";
import { useToast } from "@/contexts/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEventsContext } from "@/contexts/events";

interface GetUserParams {
  setLoading: (loading: boolean) => void;
  layout: string;
  token: string;
}

interface LogoutParams {
  setLoading: (loading: boolean) => void;
}

export const useAuth = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const { setMessage, setToast, setPosition }: any = useToast();
  const { getEvents } = useEvents();
  const { setEvents, setPaginationInfo, events } = useEventsContext();

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

  const validateApp = async ({ appToken }: { appToken: string }) => {
    let RedirectionLink = Cookies.get("RedirectionLink");
    try {
      const response = await axios.request({
        url: "/app/callback/" + appToken,
        method: "GET",
      });
      if (response.data?.success) {
        Cookies.set("analogueshifts", response.data?.data.token);
        notifyUser("success", "success", "right");
        window.location.href = RedirectionLink || "/";
      }
    } catch (error: any) {
      notifyUser("error", error.messsage || "Invalid Request", "right");
      router.push(RedirectionLink || "/");
      console.log(error);
    }
  };

  const getUser = async ({ setLoading, layout, token }: GetUserParams) => {
    setLoading(true);
    try {
      const response = await axios.request({
        url: "/user",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (token && !events) {
        await getEvents({
          setLoading,
          setPaginationData: setPaginationInfo,
          setData: setEvents,
          url: `/tools/event${page ? `?page=${page}` : ""}`,
          userToken: token,
        });
      }

      setUser(response.data);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status === 401 && layout !== "guest") {
        clearUserSession();
      }
    }
  };

  const logout = async ({ setLoading }: LogoutParams) => {
    const url = "/logout";

    const config = {
      url: url,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    setLoading(true);

    try {
      await axios.request(config);
      Cookies.remove("analogueshifts");
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      notifyUser("error", error?.response?.data?.data?.message, "right");
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  return {
    logout,
    getUser,
    notifyUser,
    validateApp,
  };
};
