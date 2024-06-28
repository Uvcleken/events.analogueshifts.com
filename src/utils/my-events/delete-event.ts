import { errorToast } from "../error-toast";
import { clearUserSession } from "../clear-user-session";
import { successToast } from "../success-toast";

export const deleteEvent = async (setLoading: any, user: any, uuid: string) => {
  const axios = require("axios");
  let config = {
    method: "DELETE",
    url: process.env.NEXT_PUBLIC_BACKEND_URL + "/tools/event/" + uuid,
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };
  try {
    setLoading(true);
    let request = await axios.request(config);

    successToast("Success", request?.data?.message || "");
  } catch (error: any) {
    setLoading(false);
    errorToast(
      "Uh oh! Error deleting Event.",
      error?.response?.data?.message || error.message || "Failed To Delete"
    );
    if (error.response.status === 401) {
      clearUserSession();
    }
  }
};
