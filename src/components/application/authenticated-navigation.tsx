"use client";
import Link from "next/link";
import Image from "next/image";

import NavLogo from "@/assets/images/nav-logo.svg";
import { Plus } from "lucide-react";

import ProfileDropdown from "./profile-dropdown";
import ResponsiveNavBar from "./responsive-navbar";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AuthenticationNavigation({ user, handleLogout }: any) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  //Close the Nav bar whenever the pathname changes
  useEffect(() => {
    if (open) {
      setOpen((previous) => !previous);
    }
  }, [pathname]);

  return (
    <nav className="w-full max-w-[1650px] mx-auto h-20 px-6 sm:px-20 large:px-[112px] large:h-[104px] z-40 fixed backdrop-blur-lg bg-opacity-30 tablet:bg-opacity-100 top-0 left-0 duration-300 flex items-center justify-between border-b bg-white">
      <Link href="/">
        <Image
          src={NavLogo}
          alt=""
          className="large:w-[221px] w-40 sm:w-48 h-max"
        />
      </Link>

      <div className="lg:flex hidden items-center gap-7">
        <Link
          href="/events/create"
          className="px-4 py-2.5 flex hover:bg-background-darkYellow/10 rounded-full bg-transparent border border-background-darkYellow text-[13px] text-background-darkYellow items-center gap-1"
        >
          <Plus width={15} /> Create
        </Link>

        <ProfileDropdown handleLogout={handleLogout} user={user} />
      </div>
      {/* Hamburger */}
      <div className="flex items-center lg:hidden">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-[18px] flex flex-col gap-1.5 bg-transparent border-none outline-none"
        >
          <div
            className={`w-full h-[1px] bg-primary-boulder700 duration-300 ${
              open
                ? "rotate-[45deg] translate-y-[3.6px]"
                : "rotate-0 translate-y-0"
            }`}
          ></div>
          <div
            className={`w-full h-[1px] bg-primary-boulder700 duration-300 ${
              open
                ? "-rotate-[45deg] -translate-y-[3.6px]"
                : "rotate-0 translate-y-0"
            }`}
          ></div>
        </button>
      </div>

      <ResponsiveNavBar open={open} user={user} handleLogout={handleLogout} />
    </nav>
  );
}
