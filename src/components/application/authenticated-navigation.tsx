import Link from "next/link";
import ApplicationLogo from "./application-logo";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { handleSCroll } from "@/utils/layout/navbar";

import ProfileDropdown from "./profile-dropdown";
import SearchBar from "./searchbar";
import MobileMenu from "./mobile-menu";

export default function AuthenticationNavigation({ user, handleLogout }: any) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    handleSCroll(setPosition);
    window.addEventListener("scroll", () => handleSCroll(setPosition));
    return () => {
      window.removeEventListener("scroll", () => handleSCroll(setPosition));
    };
  }, []);

  return (
    <nav
      style={{ top: `${position}px` }}
      className="w-full z-40 absolute left-0 duration-300 h-16 px-6 flex items-center justify-between border-b bg-white"
    >
      <Link href="/">
        <ApplicationLogo />
      </Link>
      <div className="hidden desktop:block w-[45%]">
        <SearchBar />
      </div>
      <div className="desktop:flex hidden items-center gap-7">
        <Link
          href="/events/create"
          className="px-4 py-2.5 flex hover:bg-background-darkYellow/10 rounded-full bg-transparent border border-background-darkYellow text-[13px] text-background-darkYellow items-center gap-1"
        >
          <Plus width={15} /> Create
        </Link>

        <ProfileDropdown handleLogout={handleLogout} user={user} />
      </div>
      <div className="desktop:hidden flex">
        <MobileMenu user={user} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}
