export const storeRegistration = async (
  slug: string,
  name: string,
  email: string,
  contact: string,
  setLoading: any
) => {
  const config = {
    method: "POST",
    url: process.env.NEXT_PUBLIC_BACKEND_URL + "/event/store/" + slug,
    headers: { "Content-Type": "application/json" },
    data: { name: name, email: email, contact: contact },
  };
  const axios = require("axios");
  try {
    setLoading(true);
    const request = await axios.request(config);
    console.log(request);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  } finally {
    setLoading(false);
  }
};
