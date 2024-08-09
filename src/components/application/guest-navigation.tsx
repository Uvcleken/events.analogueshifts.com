import Link from "next/link";
import ApplicationLogo from "./application-logo";
import ProfileDropdown from "./profile-dropdown";
import SearchBar from "./searchbar";
import MobileMenu from "./mobile-menu";

export default function GuestNavigation({
  user,
  handleLogout,
  showSearch,
}: any) {
  return (
    <nav className="w-full z-40 fixed left-0 top-0 h-16 px-6 flex items-center justify-between bg-white">
      <Link href="/">
        <ApplicationLogo />
      </Link>
      <div
        className="hidden desktop:block w-[45%]"
        onClick={() => showSearch(true)}
      >
        <SearchBar />
      </div>
      <div className="desktop:flex hidden items-center gap-1">
        <Link
          href={user ? "/events/create" : "/login"}
          className="px-4 flex py-2.5 hover:bg-gray-700/5 font-medium rounded-full bg-transparent text-[13px] text-primary-boulder900 items-center gap-1"
        >
          Create Events
        </Link>
        <Link
          href="/all"
          className="px-4 flex py-2.5 hover:bg-gray-700/5 font-medium rounded-full bg-transparent text-[13px] text-primary-boulder900 items-center gap-1"
        >
          Find Event
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
        <MobileMenu
          showSearch={showSearch}
          user={user}
          handleLogout={handleLogout}
        />
      </div>
    </nav>
  );
}
