import { clearUserSession } from "../clear-user-session";

export const fetchCountriesParameters = async (
  token: string,
  setLoading: any,
  setData: any,
  notifyUser: any
) => {
  const axios = require("axios");
  let config = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/event/parameter",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    setLoading(true);
    let request = await axios.request(config);
    setData(request.data.data.countries);
    setLoading(false);
  } catch (error: any) {
    setLoading(false);
    notifyUser(
      "error",
      error?.response?.data?.data?.message ||
        error.message ||
        "Failed To Countries Parameter",
      "right"
    );
    if (error.response.status === 401) {
      clearUserSession();
    }
  }
};
