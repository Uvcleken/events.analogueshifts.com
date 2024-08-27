import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function EventsPagination({ currentPageInfo }: any) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="hover:bg-gray-700/5"
            href={
              currentPageInfo?.prev_page_url
                ? "/events" + currentPageInfo?.prev_page_url?.slice(45)
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
                    href={item.url ? "/events" + item?.url?.slice(45) : ""}
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
                ? "/events" + currentPageInfo?.next_page_url?.slice(45)
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
