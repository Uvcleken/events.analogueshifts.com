import { errorToast } from "../error-toast";
import { clearUserSession } from "../clear-user-session";

export const fetchEventPublic = async (
  slug: string,
  setLoading: any,
  setData: any
) => {
  const axios = require("axios");
  let config = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_BACKEND_URL + "/event/" + slug,
  };
  try {
    setLoading(true);
    let request = await axios.request(config);
    setData(request.data.data.event);
    setLoading(false);
  } catch (error: any) {
    setLoading(false);
    errorToast(
      "Uh oh! Error fetching Event.",
      error?.response?.data?.message || error.message || "Failed To Event."
    );
    if (error.response.status === 401) {
      clearUserSession();
    }
  }
};
