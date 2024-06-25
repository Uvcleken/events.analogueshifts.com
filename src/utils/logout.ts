import Cookies from "js-cookie";
import { errorToast } from "./error-toast";

export const logout = async (setLoading: any, user: any) => {
  const axios = require("axios");
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/logout";
  let config = {
    url: url,
    method: "POST",
    headers: {
      Authorization: "Bearer " + user?.token,
    },
  };
  setLoading(true);

  try {
    await axios.request(config);
    Cookies.remove("analogueshifts");
    window.location.href = "/login";
  } catch (error) {
    setLoading(false);
    errorToast("Error logging out", "There was a problem with your request.");
  }
};
