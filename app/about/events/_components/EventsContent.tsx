"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  LayoutGrid,
  LayoutList,
  Inbox,
  Calendar,
  MapPin,
  ArrowRight,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { EventApiResponse, EventItem } from "@/lib/types";
import Preview from "@/components/ui/Editor";
import { AppPagination } from "@/components/ui/AppPagination";
import { getPaginatedEvents } from "@/lib/api";

interface Props {
  items: EventApiResponse;
}

const DEFAULT_EVENT_IMAGE =
  "https://placehold.co/600x400/1a3a5c/c8a85c?text=Event";

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

function getDateParts(dateStr: string) {
  if (!dateStr) return { month: "", day: "" };
  try {
    const d = new Date(dateStr);
    return {
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: d.getDate().toString(),
    };
  } catch {
    return { month: "", day: "" };
  }
}

function isUpcoming(dateStr: string) {
  if (!dateStr) return false;
  try {
    return new Date(dateStr) >= new Date();
  } catch {
    return false;
  }
}

function stripHtml(html: string) {
  if (typeof window === "undefined") return html;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

/* ─── Event Image Block (shared between grid & list) ─── */
function EventImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <Image
      src={src || DEFAULT_EVENT_IMAGE}
      alt={alt}
      width={width}
      height={height}
      className={
        className ??
        "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      }
    />
  );
}

export function EventsContent({ items }: Props) {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [lastPage, setLastPage] = useState(items.last_page || 1);
  const [total, setTotal] = useState(items.total || 0);
  const [perPage, setPerPage] = useState(items.per_page || 10);
  const [currentPage, setCurrentPage] = useState(items.current_page || 1);
  const [events, setEvents] = useState(items.data);
  const handlePaginate = async (page: number) => {
    const { data, last_page, per_page, current_page, total } =
      await getPaginatedEvents(page);
    setEvents(data);
    setLastPage(last_page);
    setPerPage(per_page);
    setTotal(total);
    setCurrentPage(current_page);
  };
  const filtered = useMemo(
    () =>
      events?.filter((item) => {
        const q = search.toLowerCase();
        return (
          item.title?.toLowerCase().includes(q) ||
          item.summary?.toLowerCase().includes(q) ||
          item.location?.toLowerCase().includes(q)
        );
      }),
    [items, events, search],
  );
  useEffect(() => {
    handlePaginate(Number(currentPage));
  }, [currentPage]);
  return (
    <section className="py-20 bg-gradient-to-b from-light-primary/40 to-white min-h-[60vh]">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
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
              placeholder="Search events by title, description, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm"
            />
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-white rounded-xl p-1 self-start shadow-sm border border-gray-100">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-primary text-white shadow-md"
                  : "text-text-muted hover:text-primary hover:bg-light-primary"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
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

        {/* Count */}
        <p className="text-sm text-text-muted mb-8">
          Showing{" "}
          <span className="font-semibold text-primary">{filtered?.length}</span>{" "}
          {filtered?.length === 1 ? "event" : "events"}
        </p>

        {/* Results */}
        {filtered?.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-6"
            }
          >
            {filtered.map((item, i) => {
              const upcoming = isUpcoming(item.end_date);
              const dateParts = getDateParts(item.start_date);

              return viewMode === "grid" ? (
                /* ════════════════════════════════════════
                   GRID CARD
                   ════════════════════════════════════════ */
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(26,58,92,0.2)] hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
                >
                  {/* Accent top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Image */}
                  <div className="relative overflow-hidden h-56">
                    <EventImage
                      src={item.image}
                      alt={item.title || stripHtml(item.summary).slice(0, 60)}
                      width={600}
                      height={224}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Date chip */}
                    <div className="absolute top-4 left-4 flex flex-col items-center bg-accent text-primary-dark rounded-xl px-3 py-2 shadow-lg min-w-[52px]">
                      <span className="text-[10px] font-bold tracking-widest leading-none">
                        {dateParts.month}
                      </span>
                      <span className="text-xl font-extrabold leading-tight">
                        {dateParts.day}
                      </span>
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md shadow-sm ${
                          upcoming
                            ? "bg-emerald-500/20 text-emerald-100 border border-emerald-400/30"
                            : "bg-white/20 text-white/90 border border-white/20"
                        }`}
                      >
                        <Clock size={10} />
                        {upcoming ? "Upcoming" : "Past"}
                      </span>
                    </div>

                    {/* Bottom location overlay */}
                    {item.location && (
                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-white/90 backdrop-blur-sm bg-black/20 rounded-full px-3 py-1">
                          <MapPin size={11} />
                          {item.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Date range */}
                    <div className="flex items-center gap-3 mb-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1.5 bg-light-primary px-2.5 py-1 rounded-md">
                        <Calendar size={12} className="text-primary" />
                        {formatDate(item.start_date)}
                      </span>
                      <span className="text-gray-300">→</span>
                      <span className="flex items-center gap-1.5 bg-light-primary px-2.5 py-1 rounded-md">
                        <Calendar size={12} className="text-primary" />
                        {formatDate(item.end_date)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-lg font-display font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <div className="mb-4 text-sm leading-relaxed text-text-muted flex-1 px-4 ">
                      <Preview
                        value={
                          item?.summary?.length! > 100
                            ? item?.summary?.substring(0, 200) + " ...more"
                            : item?.summary || ""
                        }
                      />
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link
                        href={`/about/events/${item.id}`}
                        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:text-accent hover:gap-3 cursor-pointer"
                      >
                        View Details
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ) : (
                //  LIST CARD
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group flex h-[200px] bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(26,58,92,0.15)]"
                >
                  {/* Accent left border */}
                  <div
                    className={`w-1.5 flex-shrink-0 ${upcoming ? "bg-gradient-to-b from-accent to-primary" : "bg-gradient-to-b from-gray-300 to-gray-400"}`}
                  />

                  {/* Date column */}
                  <div className="flex flex-col items-center justify-center px-5 py-4 bg-light-primary/50 flex-shrink-0 min-w-[80px]">
                    <span className="text-[10px] font-bold tracking-widest text-primary/60 leading-none">
                      {dateParts.month}
                    </span>
                    <span className="text-3xl font-extrabold text-primary leading-tight">
                      {dateParts.day}
                    </span>
                    <span
                      className={`mt-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        upcoming
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {upcoming ? "Soon" : "Past"}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative overflow-hidden w-52 flex-shrink-0">
                    <EventImage
                      src={item.image}
                      alt={item.title || stripHtml(item.summary).slice(0, 60)}
                      width={208}
                      height={200}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 group-hover:to-primary/10 transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center py-5 px-6 gap-2 flex-1 min-w-0">
                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-1">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <div className="mb-4 text-sm leading-relaxed text-text-muted flex-1 px-4 ">
                      <Preview
                        value={
                          item?.summary?.length! > 50
                            ? item?.summary?.substring(0, 320) + " ...more"
                            : item?.summary || ""
                        }
                      />
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center flex-wrap gap-4 text-xs text-text-muted mt-2">
                      <span className="flex items-center gap-1.5 bg-light-primary px-2.5 py-1 rounded-md">
                        <Calendar size={12} className="text-primary" />
                        {formatDate(item.start_date)}
                      </span>
                      <span className="text-gray-300">→</span>
                      <span className="flex items-center gap-1.5 bg-light-primary px-2.5 py-1 rounded-md">
                        <Calendar size={12} className="text-primary" />
                        {formatDate(item.end_date)}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1.5 bg-accent/10 text-accent-dark px-2.5 py-1 rounded-md font-medium">
                          <MapPin size={12} />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center pr-6 flex-shrink-0">
                    <Link
                      href={`/about/events/${item.id}`}
                      className="group/link flex items-center justify-center w-10 h-10 rounded-full bg-light-primary text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-light-primary mb-6">
              <Inbox size={36} className="text-primary/40" />
            </div>
            <p className="font-display font-bold text-xl text-gray-500">
              No events found
            </p>
            <p className="text-sm text-text-muted mt-2">
              Try a different search term
            </p>
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
