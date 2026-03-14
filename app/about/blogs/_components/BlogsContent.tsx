"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  LayoutGrid,
  LayoutList,
  Inbox,
  Calendar,
  User,
  ArrowRight,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogItem, BlogsApiResponse } from "@/lib/types";
import Preview from "@/components/ui/Editor";
import { AppPagination } from "@/components/ui/AppPagination";
import { useRouter } from "next/navigation";
import { getPaginatedBlogs } from "@/lib/api";

interface Props {
  items: BlogsApiResponse;
}

const DEFAULT_BLOG_IMAGE = "https://placehold.co/600x400/png";

export function BlogsContent({ items }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(items.current_page || 1);
  const [lastPage, setLastPage] = useState(items.last_page || 1);
  const [total, setTotal] = useState(items.total || 0);
  const [perPage, setPerPage] = useState(items.per_page || 10);
  const [blogs, setBlogs] = useState(items.data);
  const handlePaginate = async (page: number) => {
    setCurrentPage(page);
    const { data, last_page, per_page, current_page, total } =
      await getPaginatedBlogs(page);
    setBlogs(data);
    setLastPage(last_page);
    setPerPage(per_page);
    setTotal(total);
    router.push(`/about/blogs?page=${page}`);
    setCurrentPage(current_page);
  };

  const filtered = useMemo(
    () =>
      blogs.filter((item) => {
        const q = search.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q)
        );
      }),
    [items, search],
  );
 

  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  }

  return (
    <section className="py-20 bg-white min-h-[60vh]">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-light-primary rounded-xl p-1 self-start">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-primary"
                  : "text-text-muted"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-primary"
                  : "text-text-muted"
              }`}
            >
              <LayoutList size={16} />
            </button>
          </div>
        </motion.div>

        {/* Count */}
        <p className="text-sm text-text-muted mb-8">
          Showing{" "}
          <span className="font-semibold text-primary">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "blog" : "blogs"}
        </p>

        {/* Results */}
        {filtered.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-6"
            }
          >
            {filtered.map((item, i) =>
              viewMode === "grid" ? (
                /* Grid Card */
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-transparent"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-56">
                    <Image
                      src={item.image || DEFAULT_BLOG_IMAGE}
                      alt={item.title}
                      width={600}
                      height={224}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      {/* <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border backdrop-blur-sm bg-emerald-500/10 text-emerald-600 border-emerald-200">
                        Blog
                      </span> */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary/80 backdrop-blur-sm-emerald-500/10 rounded-lg">
                        <Tag size={12} />
                        <p>Blog</p>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-3 text-sm text-text-muted">
                      <Calendar size={14} />
                      {formatDate(item.start_date)}
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-lg font-bold text-gray-800 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <div className="mb-4 text-sm leading-relaxed text-text-muted flex-1 px-4 ">
                      <Preview
                        value={
                          item?.summary?.length! > 100
                            ? item?.summary?.substring(0, 200) + " ...more"
                            : item?.summary || ""
                        }
                      />
                    </div>
                    {/* <p className="mb-4 text-sm leading-relaxed text-text-muted line-clamp-3 flex-1">
                      {stripHtml(item?.description || "")}
                    </p> */}

                    {/* Author */}
                    {item.name && (
                      <div className="flex items-center gap-2 mb-4 text-xs text-text-muted">
                        <User size={13} />
                        <span className="font-medium text-gray-600">
                          {item.name}
                        </span>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-gray-50">
                      <Link
                        href={`/about/blogs/${item.id}`}
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent cursor-pointer"
                      >
                        Read More
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover/link:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ) : (
                /* List View */
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group flex h-[200px] gap-6 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/10 transition-all duration-300"
                >
                  <div className="relative overflow-hidden w-48 flex-shrink-0">
                    <Image
                      src={item.image || DEFAULT_BLOG_IMAGE}
                      alt={item.title}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-5 pr-6 gap-2 flex-1">
                    {/* <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      Blog
                    </span> */}
                    <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* summary */}
                    <div className="mb-4 text-sm leading-relaxed text-text-muted flex-1 px-4 ">
                      <Preview
                        value={
                          item?.summary?.length! > 50
                            ? item?.summary?.substring(0, 320) + " ...more"
                            : item?.summary || ""
                        }
                      />
                    </div>
                    {/* <p className="text-sm text-text-muted line-clamp-2">
                      {stripHtml(item.summary)}
                    </p> */}
                    <div className="flex items-center gap-4 text-xs text-text-muted mt-1">
                      {/* <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(item.start_date)}
                      </span> */}
                      {item.name && (
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {item.name}
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/about/blogs/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
                      >
                        Read More
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-text-muted"
          >
            <Inbox size={44} className="mx-auto mb-4 text-gray-300" />
            <p className="font-semibold text-gray-500">No blogs found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </motion.div>
        )}
      </div>
      {total > perPage && (
        <div className="flex justify-center mt-8">
          <AppPagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={(page) => {
              handlePaginate(page);
            }}
          />
        </div>
      )}
    </section>
  );
}
