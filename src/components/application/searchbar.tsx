import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="h-10 w-full  cursor-pointer hover:shadow hover:bg-gray-700/5 duration-200 rounded-full border border-[#dbdae3] flex items-center px-5 gap-3">
      <Search width={15} className="text-primary-boulder500" />
      <p className="text-[13px] font-medium text-primary-boulder500">
        Search events
      </p>
    </div>
  );
}
