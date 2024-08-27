import Link from "next/link";
import ApplicationLogo from "./application-logo";
import { Plus } from "lucide-react";

import ProfileDropdown from "./profile-dropdown";
import MobileMenu from "./mobile-menu";

export default function AuthenticationNavigation({ user, handleLogout }: any) {
  return (
    <nav className="w-full z-40 fixed backdrop-blur-lg bg-opacity-30 top-0 left-0 duration-300 h-16 px-6 flex items-center justify-between border-b bg-white">
      <Link href="/">
        <ApplicationLogo />
      </Link>

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
        <MobileMenu
          showSearch={false}
          user={user}
          handleLogout={handleLogout}
        />
      </div>
    </nav>
  );
}
