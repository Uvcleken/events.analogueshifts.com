import { errorToast } from "../error-toast";
import { clearUserSession } from "../clear-user-session";

export const getEventToEdit = async (
  setLoading: any,
  user: any,
  setData: any,
  setCountries: any,
  uuid: string
) => {
  const axios = require("axios");
  let config = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/event/" + uuid,
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };
  try {
    setLoading(true);
    let request = await axios.request(config);
    setCountries(request.data.data.countries);
    setData(request.data.data.event);
    setLoading(false);
  } catch (error: any) {
    setLoading(false);
    errorToast(
      "Uh oh! Error fetching Event.",
      error?.response?.data?.message || error.message || "Failed To Event"
    );
    if (error.response.status === 401) {
      clearUserSession();
    }
  }
};
