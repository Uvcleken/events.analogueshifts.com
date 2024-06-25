import { errorToast } from "./error-toast";

export const share = async (title: string, path: string, text?: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title || "",
        text: text || "",
        url: path || "",
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    errorToast("Error", "Sharing not supported on this device.");
  }
};
