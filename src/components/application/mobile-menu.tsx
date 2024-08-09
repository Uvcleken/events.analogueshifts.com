"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import SearchBar from "./searchbar";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenu({
  user,
  handleLogout,
  showSearch,
}: {
  user: any;
  handleLogout: any;
  showSearch: any;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
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
        <AnimatePresence>
          {open && (
            <motion.div
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              initial={{ x: "-100%" }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 top-0 bg-white w-4/5 h-screen p-5 flex flex-col gap-5"
            >
              {pathname.startsWith("/events") ? (
                <></>
              ) : (
                <div className="w-full h-max" onClick={() => showSearch(true)}>
                  <SearchBar />
                </div>
              )}
              <Link
                href="/all"
                className="text-primary-boulder700 font-medium text-sm w-max pl-3"
              >
                Find event
              </Link>
              <Link
                href={user ? "/events/create" : "/login"}
                className="text-primary-boulder700 font-medium text-sm w-max pl-3"
              >
                Create event
              </Link>
              {user ? (
                <>
                  {" "}
                  <Link
                    href="/events"
                    className="text-primary-boulder700 font-medium text-sm w-max pl-3"
                  >
                    Manage events
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-medium text-sm w-max absolute bottom-20 left-8"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <Link
                    href="/login"
                    className="text-primary-boulder700 font-medium text-sm w-max pl-3"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-primary-boulder700 font-medium text-sm w-max pl-3"
                  >
                    Sig Up
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
