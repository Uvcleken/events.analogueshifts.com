import axios from "@/lib/axios";

import Cookies from "js-cookie";
import { clearUserSession } from "@/configs/clear-user-session";

import { useEvents } from "./events";
import { useUser } from "@/contexts/user";
import { useToast } from "@/contexts/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEventsContext } from "@/contexts/events";

interface RegisterParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  device_token: string;
  setLoading: (loading: boolean) => void;
}

interface LoginParams {
  email: string;
  password: string;
  setLoading: (loading: boolean) => void;
}

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

  const authConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      secret_key: process.env.NEXT_PUBLIC_SECRET_KEY!,
    },
  };

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

  const register = async ({
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
    device_token,
    setLoading,
  }: RegisterParams) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/register",
        {
          first_name,
          last_name,
          email,
          password,
          password_confirmation,
          device_token,
        },
        authConfig
      );
      Cookies.set("analogueshifts", response?.data[0]?.data?.token);
      setUser(response?.data[0]?.data?.token);

      notifyUser("success", "Account created successfully", "right");
      router.push("/events");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notifyUser(
        "error",
        error?.response?.data?.message || "Failed To Create Account",
        "right"
      );
    }
  };

  const login = async ({ email, password, setLoading }: LoginParams) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        authConfig
      );
      Cookies.set("analogueshifts", response.data.data.token);
      await getUser({
        layout: "authenticated",
        setLoading,
        token: response.data.data.token || "",
      });
      notifyUser("success", "Logged in successfully", "right");
      router.push("/events");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      notifyUser(
        "error",
        error?.response?.data?.message || "Failed To Login",
        "right"
      );
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
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      notifyUser("error", error?.response?.data?.data?.message, "right");
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  return {
    register,
    login,
    logout,
    getUser,
    notifyUser,
  };
};
