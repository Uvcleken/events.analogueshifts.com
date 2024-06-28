import { errorToast } from "../error-toast";
import { clearUserSession } from "../clear-user-session";
import { successToast } from "../success-toast";

function convertDateFormat(inputDateTime: string) {
  let datetime = new Date(inputDateTime);

  let year = datetime.getFullYear();
  let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
  let day = ("0" + datetime.getDate()).slice(-2);

  // Extract time components
  let hours = ("0" + datetime.getHours()).slice(-2);
  let minutes = ("0" + datetime.getMinutes()).slice(-2);
  let seconds = ("0" + datetime.getSeconds()).slice(-2);

  // Construct formatted date-time string
  let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

export const createEvent = async (
  setLoading: any,
  email: string,
  contact: string,
  title: string,
  thumbnail: string,
  description: string,
  price: string,
  startsDate: string,
  endsDate: string,
  countriesPrices: any,
  locationType: string,
  location: any,
  user: any,
  router: any,
  url: string,
  method: string
) => {
  let returnValue = true;
  [
    { label: "Email", value: email },
    { label: "Title", value: title },
    { label: "Description", value: description },
    { label: "Price", value: price },
    { label: "Starts Date", value: startsDate },
    { label: "Ends Date", value: endsDate },
  ].forEach((item) => {
    if (item.value.trim().length <= 0) {
      errorToast("Missing Field", item.label);
      returnValue = false;
    }
  });

  if (!returnValue) {
    return;
  }

  const axios = require("axios");
  const data = {
    email: email,
    contact: contact,
    title: title,
    thumbnail: thumbnail,
    description: description,
    price: price,
    starts_date: convertDateFormat(startsDate),
    ends_date: convertDateFormat(endsDate),
    countriesPrices: countriesPrices,
    location_type: locationType,
    location: location,
  };

  const config = {
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
    data: data,
  };

  try {
    setLoading(true);
    let request = await axios.request(config);

    if (request?.data?.success) {
      successToast("Success", request?.data?.message || "");
      router.push("/events");
    }
  } catch (error: any) {
    setLoading(false);
    errorToast(
      "Uh oh! Error.",
      error?.response?.data?.message || error.message || "Failed"
    );
    if (error.response.status === 401) {
      clearUserSession();
    }
  } finally {
    setLoading(false);
  }
};
