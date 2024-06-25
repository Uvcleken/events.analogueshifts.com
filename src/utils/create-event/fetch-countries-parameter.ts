import { errorToast } from "../error-toast";
import { clearUserSession } from "../clear-user-session";

export const fetchCountriesParameters = async (
  user: any,
  setLoading: any,
  setData: any
) => {
  const axios = require("axios");
  let config = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/event/parameter",
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };
  try {
    setLoading(true);
    let request = await axios.request(config);
    setData(request.data.data.countries);
    setLoading(false);
  } catch (error: any) {
    setLoading(false);
    errorToast(
      "Uh oh! Error fetching Countries.",
      error?.response?.data?.message ||
        error.message ||
        "Failed To Countries Parameter"
    );
    if (error.response.status === 401) {
      clearUserSession();
    }
  }
};
