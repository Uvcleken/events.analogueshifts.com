import { errorToast } from "../error-toast";
import { clearUserSession } from "../clear-user-session";

export const fetchEvents = async (
  getEventsUrl: string,
  user: any,
  setLoading: any,
  setEvents: any,
  setCurrentPageInfo: any
) => {
  const axios = require("axios");
  let config = {
    method: "GET",
    url: getEventsUrl,
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };
  try {
    setLoading(true);
    let request = await axios.request(config);
    setCurrentPageInfo(request.data.data.events);
    setEvents(request.data.data.events.data);
    setLoading(false);
  } catch (error: any) {
    setLoading(false);
    errorToast(
      "Uh oh! Error fetching events.",
      error?.response?.data?.message ||
        error.message ||
        "Failed To Fetch Events"
    );
    if (error.response.status === 401) {
      clearUserSession();
    }
  }
};
