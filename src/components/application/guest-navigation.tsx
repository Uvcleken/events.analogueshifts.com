import Link from "next/link";
import ApplicationLogo from "./application-logo";
import ProfileDropdown from "./profile-dropdown";
import SearchBar from "./searchbar";
import MobileMenu from "./mobile-menu";

export default function GuestNavigation({ user, handleLogout }: any) {
  return (
    <nav className="w-full z-40 absolute left-0 top-0 h-16 px-6 flex items-center justify-between bg-white">
      <Link href="/">
        <ApplicationLogo />
      </Link>
      <div className="hidden desktop:block w-[45%]">
        <SearchBar />
      </div>
      <div className="desktop:flex hidden items-center gap-1">
        <Link
          href="/events/create"
          className="px-4 flex py-2.5 hover:bg-gray-700/5 font-medium rounded-full bg-transparent text-[13px] text-primary-boulder900 items-center gap-1"
        >
          Create Events
        </Link>
        {user ? (
          <ProfileDropdown handleLogout={handleLogout} user={user} />
        ) : (
          <>
            <Link
              href="/login"
              className="px-4 flex py-2.5 hover:bg-gray-700/5 font-medium rounded-full bg-transparent text-[13px] text-primary-boulder900 items-center gap-1"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="px-4 flex py-2.5 hover:bg-gray-700/5 font-medium rounded-full bg-transparent text-[13px] text-primary-boulder900 items-center gap-1"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      <div className="desktop:hidden flex">
        <MobileMenu user={user} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}
