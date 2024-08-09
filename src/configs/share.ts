export const share = async (
  title: string,
  path: string,
  notifyUser: any,
  text?: string
) => {
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
    notifyUser("Eerror", "Sharing not supported on this device.", "right");
  }
};
