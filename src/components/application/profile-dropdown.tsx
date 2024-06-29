import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ChevronDown, Plus, LogOut, LayoutDashboard } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileDropdown({ user, handleLogout }: any) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none outline-white">
        <div className="flex gap-2 items-center cursor-pointer p-1 rounded-full bg-gray-700/5 hover:bg-gray-700/10">
          <Avatar className="w-8 h-8">
            <AvatarImage
              className="object-cover"
              src={user?.user?.profile}
              alt="Profile"
            />
            <AvatarFallback className="bg-background-darkYellow text-white text-sm font-bold">
              {user?.user?.email.slice(0, 1)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h4 className="text-xs  font-bold">
            {user?.user?.first_name}{" "}
            {user?.user?.last_name && " " + user.user.last_name}
          </h4>
          <div className="mr-2.5 ml-1">
            <ChevronDown width={15} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 max-w-full">
        <div className="w-full px-5 py-4 flex flex-col gap-5">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-base text-primary-boulder700 font-semibold">
              Free
            </h3>
            <div className="p-1.5 rounded-lg bg-gray-700/5">
              <p className="text-background-darkYellow text-xs fot-bold">
                Current plan
              </p>
            </div>
          </div>
          <Link
            className="w-full flex items-center h-12 text-sm text-primary-boulder950 font-semibold justify-center rounded-md border border-primary-boulder300 hover:bg-gray-700/5"
            href=""
          >
            Manage Plan
          </Link>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/events/create")}
          className="px-5 py-4 focus:bg-gray-700/5 cursor-pointer text-sm font-semibold text-primary-boulder950"
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>Create Event</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/events")}
          className="px-5 py-4 focus:bg-gray-700/5 cursor-pointer text-sm font-semibold text-primary-boulder950"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Manage Events</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="px-5 py-4 focus:bg-gray-700/5 cursor-pointer text-sm font-semibold text-primary-boulder950"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>
            Log out <br />{" "}
            <small className="truncate">{user?.user?.email}</small>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
