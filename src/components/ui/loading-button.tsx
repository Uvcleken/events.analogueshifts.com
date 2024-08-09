import Image from "next/image";
import Spinner from "@/assets/images/spinner.svg";

export default function ButtonLoadingSpinner() {
  return (
    <Image
      src={Spinner}
      alt=""
      className="w-max h-max max-h-full animate-spin"
    />
  );
}
