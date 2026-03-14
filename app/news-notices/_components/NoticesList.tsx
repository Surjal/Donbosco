"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Preview from "@/components/ui/Editor";
import { NoticeApiResponse } from "@/lib/types";
import { AppPagination } from "@/components/ui/AppPagination";
import { useMemo, useState, useEffect } from "react";
import { getNoticesPaginate } from "@/lib/data/news-notices/notices";
import { Calendar, LayoutGrid, LayoutList, Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { NewsNoticeCard } from "@/components/ui/NewsNoticeCard";

interface Props {
  items: NoticeApiResponse;
}

export function NoticeList({ items }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const viewQuery = searchParams.get("view");

  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(items.current_page || 1);
  const [lastPage, setLastPage] = useState(items.last_page || 1);
  const [total, setTotal] = useState(items.total || 0);
  const [perPage, setPerPage] = useState(items.per_page || 10);
  const [notices, setNotices] = useState(items.data);
  const [search, setSearch] = useState("");

  // 🔥 Sync viewMode with URL
  useEffect(() => {
    if (viewQuery === "grid" || viewQuery === "list") {
      setViewMode(viewQuery);
    }
  }, [viewQuery]);

  const updateViewQuery = (mode: "grid" | "list") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", mode);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePaginate = async (page: number) => {
    const { data, last_page, per_page, current_page, total } =
      await getNoticesPaginate(page);

    setNotices(data);
    setLastPage(last_page);
    setPerPage(per_page);
    setTotal(total);
    setCurrentPage(current_page);
  };

  const filtered = useMemo(
    () =>
      notices?.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [notices, search],
  );

  return (
    <>
      {/* Count */}
      <div className="text-sm text-text-muted mb-8">
        Showing{" "}
        <span className="font-semibold text-primary">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "item" : "items"}
      </div>
      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-4 mb-10"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-white rounded-xl p-1 self-start shadow-sm border border-gray-100">
          <button
            onClick={() => {
              setViewMode("grid");
              updateViewQuery("grid");
            }}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-primary text-white shadow-md"
                : "text-text-muted hover:text-primary hover:bg-light-primary"
            }`}
          >
            <LayoutGrid size={16} />
          </button>

          <button
            onClick={() => {
              setViewMode("list");
              updateViewQuery("list");
            }}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              viewMode === "list"
                ? "bg-primary text-white shadow-md"
                : "text-text-muted hover:text-primary hover:bg-light-primary"
            }`}
          >
            <LayoutList size={16} />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <div
        className={
          viewMode === "grid"
            ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-6"
        }
      >
        {filtered?.map((item, i) =>
          viewMode === "grid" ? (
            <Link
              key={item.id}
              href={`/news-notices/notice/${item.slug ?? item.id}`}
            >
              <NewsNoticeCard type={"Notice"} item={item} index={i} />
            </Link>
          ) : (
            <Link
              key={item.id}
              href={`/news-notices/notice/${item.slug ?? item.id}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="group flex flex-col sm:flex-row gap-6 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-accent/30 transition-all duration-300 p-6"
              >
                <div className="flex flex-col justify-center gap-2 flex-1">
                  <span className="text-xs font-bold text-accent-dark uppercase tracking-wider">
                    Notice
                  </span>
                  <h3 className="font-display font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-sm text-text-muted line-clamp-2">
                    {/* <Preview value={item.description} /> */}
                    <div className="mb-4 text-sm leading-relaxed text-text-muted flex-1 px-4 ">
                      <Preview
                        value={
                          item?.description?.length! > 100
                            ? item?.description?.substring(0, 200) + " ...more"
                            : item?.description || ""
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-muted mt-1">
                    <span className="flex items-center gap-1.5 bg-light-primary px-2.5 py-1 rounded-md">
                      <Calendar size={12} className="text-primary" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ),
        )}
      </div>

      {total > perPage && (
        <div className="flex justify-center mt-8">
          <AppPagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePaginate}
          />
        </div>
      )}
    </>
  );
}
