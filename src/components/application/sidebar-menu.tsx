import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { handleSCroll, navLinks } from "@/utils/layout/sidebar";

import { LogOut } from "lucide-react";

export default function SidebarMenu({ handleLogout }: { handleLogout: any }) {
  const [logoScale, setLogoScale] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    handleSCroll(setLogoScale);
    window.addEventListener("scroll", () => handleSCroll(setLogoScale));
    return () => {
      window.removeEventListener("scroll", () => handleSCroll(setLogoScale));
    };
  }, []);

  return (
    <div className="w-16 z-30 h-screen fixed top-0 left-0 bg-gray-700/5 hidden mobile:flex flex-col">
      <div className="w-full h-16 flex justify-center items-center">
        <Link
          href="https://www.analogueshifts.com"
          className="bg-transparent hover:bg-white rounded-lg p-2.5"
        >
          <img
            style={{ transform: `scale(${logoScale})` }}
            src="/logo.png"
            className="w-5 h-5 duration-300"
            alt=""
          />
        </Link>
      </div>
      {navLinks.map((item) => {
        return (
          <div
            key={item.label}
            className="w-full h-16 flex justify-center items-center"
          >
            <Link
              href={item.path}
              className={`${
                item.path !== "" && pathname.startsWith(item.path)
                  ? "bg-white"
                  : "bg-transparent hover:bg-white text-primary-boulder500 "
              } rounded-lg p-2.5 `}
            >
              {item.icon}
            </Link>
          </div>
        );
      })}
      <div className="w-full absolute bottom-0 h-16 flex justify-center items-center">
        <button
          onClick={handleLogout}
          className="bg-transparent hover:bg-white rounded-lg p-2.5 text-primary-boulder500 "
        >
          <LogOut className="w-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}
