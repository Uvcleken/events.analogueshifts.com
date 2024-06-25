import Image from "next/image";
import Dashboard from "@/assets/images/dashboard.svg";
import HelpSign from "@/assets/images/help-sign.svg";
import Setting from "@/assets/images/settings.svg";

export const handleSCroll = (setLogoScale: any) => {
  if (window.scrollY >= 27) {
    setLogoScale(1);
  } else {
    setLogoScale(0);
  }
};

export const navLinks = [
  {
    label: "Events",
    path: "/events",
    icon: <Image src={Dashboard} alt="" className="w-5 h-max" />,
  },

  {
    label: "Help Center",
    path: "",
    icon: <Image src={HelpSign} alt="" className="w-5 h-max" />,
  },
  {
    label: "Settings",
    path: "",
    icon: <Image src={Setting} alt="" className="w-5 h-max" />,
  },
];
