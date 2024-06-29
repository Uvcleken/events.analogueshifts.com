import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import SearchBar from "./searchbar";

export default function MobileMenu({
  user,
  handleLogout,
}: {
  user: any;
  handleLogout: any;
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu width={18} className="text-primary-boulder900" />
      </SheetTrigger>
      <SheetContent className="w-screen ">
        <div className="-translate-y-2 w-4/5">
          <SearchBar />
        </div>
        <div className="w-full flex flex-col items-center gap-5 pt-5">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-4 w-11/12 flex py-2.5 hover:bg-gray-700/5 font-medium rounded-full bg-transparent text-[13px] text-primary-boulder900 items-center gap-1"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="px-4 w-11/12 flex py-2.5 hover:bg-gray-700/5 font-medium rounded-full bg-transparent text-[13px] text-primary-boulder900 items-center gap-1"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <SheetTrigger
                onClick={handleLogout}
                className="px-4 w-11/12 flex py-2.5 hover:bg-gray-700/5 font-medium rounded-full bg-transparent text-[13px] text-primary-boulder900 items-center gap-1"
              >
                Logout
              </SheetTrigger>
              <Link
                href="/events"
                className="px-4 w-11/12 flex py-2.5 hover:bg-gray-700/5 font-medium rounded-full bg-transparent text-[13px] text-primary-boulder900 items-center gap-1"
              >
                My Events
              </Link>
            </>
          )}
          <Link
            href="/events/create"
            className="px-4 w-11/12 flex py-2.5 hover:bg-gray-700/5 font-medium rounded-full bg-transparent text-[13px] text-primary-boulder900 items-center gap-1"
          >
            Create Event
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
