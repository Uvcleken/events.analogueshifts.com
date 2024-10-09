import Cookies from "js-cookie";
import { clearUserSession } from "../clear-user-session";

export const uploadImage = async (
  value: any,
  setLoading: any,
  setThumbnail: any,
  notifyUser: any
) => {
  const token = Cookies.get("analogueshifts");

  const url = process.env.NEXT_PUBLIC_FILE_UPLOAD_URL + "/upload";
  const axios = require("axios");
  const formData = new FormData();
  formData.append("upload", value);
  formData.append("type", "image");
  let config = {
    method: "POST",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token || "",
    },
    data: formData,
  };

  setLoading(true);
  try {
    const data = await axios.request(config);
    setThumbnail(data.data.data.full_path);
    setLoading(false);
  } catch (error: any) {
    setLoading(false);
    notifyUser(
      "error",
      error?.response?.data?.data?.message ||
        error?.response?.data?.message ||
        "Error Uploading Image",
      "right"
    );
    if (error?.response?.status === 401) {
      clearUserSession();
    }
  }
};
