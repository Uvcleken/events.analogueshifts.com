"use client";
import { useState } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";
import Spinner from "@/assets/images/spinner-boulder.svg";
import axios from "axios";
import EventGridTile from "../home/event-grid-tile";

// Pagination
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Params {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SearchModal({ open, setOpen }: Params) {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationInfo, setPaginationInfo]: any = useState(null);

  const handleSearch = async (url: string) => {
    const config = {
      method: "POST",
      url,
      headers: { "Content-Type": "application/json" },
      data: { search: keyword },
    };
    try {
      setLoading(true);
      const request = await axios.request(config);
      setLoading(false);
      setResult(request.data.data.events.data);
      setPaginationInfo(request.data.data.events);
      console.log(request);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSearch(process.env.NEXT_PUBLIC_BACKEND_URL + "/event/search");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          animate={{ y: 0 }}
          exit={{ y: "100%", transition: { delay: 0.7 } }}
          initial={{ y: "100%" }}
          transition={{ duration: 0.5, ease: "circIn" }}
          className="fixed bg-white w-screen h-screen top-0 left-0 z-50 bg-transparent"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full overflow-y-auto py-10 flex flex-col gap-10 items-center bg-transparent top-0 left-0 absolute"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 md:top-6 flex justify-center items-center w-10 h-10 right-2 md:right-6 md:w-16 md:h-16 rounded-full text-primary-boulder500/70 bg-primary-boulder700/10"
            >
              <X className="md:w-8 w-5" />
            </button>

            <form
              onSubmit={handleFormSubmit}
              className="h-12 w-8/12 md:w-6/12 overflow-hidden rounded-full border border-[#dbdae3] flex items-center pl-5 pr-1.5 gap-3"
            >
              {loading ? (
                <Image
                  src={Spinner}
                  alt=""
                  className="w-6 h-max animate-spin"
                />
              ) : (
                <div className="w-6 flex justify-center">
                  <Search className="w-4 text-primary-boulder400" />
                </div>
              )}

              <input
                value={keyword}
                placeholder="Enter keywords"
                onChange={(e) => setKeyword(e.target.value)}
                className="w-[calc(100%-56px)] placeholder:text-primary-boulder400 h-full outline-none border-none bg-transparent text-sm font-normal text-primary-boulder400"
              />

              <div className="h-full w-8 flex justify-center items-center">
                <AnimatePresence>
                  {keyword.trim().length > 0 && (
                    <motion.button
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      type="submit"
                      className="w-8 h-8 rounded-full bg-primary-boulder700/10 flex justify-center items-center text-sm font-medium text-primary-boulder400"
                    >
                      <ArrowRight width={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>
            <div className="w-full max-w-[1250px] px-5 grid xl:grid-cols-4 md:grid-cols-3 mobile:grid-cols-2 grid-cols-1 gap-y-10 gap-x-6">
              {result?.map((item: any) => {
                return <EventGridTile key={item.slug} item={item} />;
              })}
            </div>
            {paginationInfo && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem
                    onClick={() => {
                      if (paginationInfo?.prev_page_url) {
                        handleSearch(paginationInfo.prev_page_url);
                      }
                    }}
                  >
                    <PaginationPrevious className="hover:bg-gray-700/5 text-primary-boulder400 hover:text-primary-boulder400" />
                  </PaginationItem>

                  {paginationInfo?.links &&
                    paginationInfo.links
                      .slice(1, paginationInfo.links.length - 1)
                      .map((item: any) => {
                        return (
                          <PaginationItem
                            onClick={() => {
                              handleSearch(item.url);
                            }}
                            key={crypto.randomUUID()}
                          >
                            <PaginationLink
                              className="hover:bg-gray-700/5 cursor-pointer text-primary-boulder400 hover:text-primary-boulder400"
                              isActive={item.active}
                            >
                              {item.label}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                  <PaginationItem
                    onClick={() => {
                      if (paginationInfo?.next_page_url) {
                        handleSearch(paginationInfo.next_page_url);
                      }
                    }}
                  >
                    <PaginationNext className="hover:bg-gray-700/5 text-primary-boulder400 hover:text-primary-boulder400" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
