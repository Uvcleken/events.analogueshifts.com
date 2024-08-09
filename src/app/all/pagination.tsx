import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Params {
  currentPageInfo: any;
}

export default function AllEventsPagination({ currentPageInfo }: Params) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="hover:bg-gray-700/5"
            href={
              currentPageInfo?.prev_page_url
                ? "/all" + currentPageInfo?.prev_page_url?.slice(40)
                : ""
            }
          />
        </PaginationItem>

        {currentPageInfo?.links &&
          currentPageInfo.links
            .slice(1, currentPageInfo.links.length - 1)
            .map((item: any) => {
              return (
                <PaginationItem key={crypto.randomUUID()}>
                  <PaginationLink
                    className="hover:bg-gray-700/5"
                    isActive={item.active}
                    href={item.url ? "/all" + item?.url?.slice(40) : ""}
                  >
                    {item.label}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

        <PaginationItem>
          <PaginationNext
            className="hover:bg-gray-700/5"
            href={
              currentPageInfo?.next_page_url
                ? "/all" + currentPageInfo?.next_page_url?.slice(40)
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
