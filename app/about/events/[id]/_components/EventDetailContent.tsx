"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Share2,
  ArrowRight,
} from "lucide-react";
import type { EventItem } from "@/lib/types";
import Preview from "@/components/ui/Editor";

interface Props {
  item: EventItem;
  recentItems: EventItem[];
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

function isUpcoming(dateStr: string) {
  if (!dateStr) return false;
  try {
    return new Date(dateStr) >= new Date();
  } catch {
    return false;
  }
}

export function EventDetailContent({ item, recentItems }: Props) {
  const upcoming = isUpcoming(item.end_date);
  const recent = recentItems.filter((e) => e.id !== item.id).slice(0, 5);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-light-primary/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 relative">
        {/* Back link */}
        {/* <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/about/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Events
          </Link>
        </motion.div> */}

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          {/* Main content */}
          <div>
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <Image
                src={item.image || DEFAULT_EVENT_IMAGE}
                alt={item.title}
                width={1200}
                height={600}
                className="w-full h-[400px] object-cover"
              />
              {/* Status badge overlay */}
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md shadow-sm ${
                    upcoming
                      ? "bg-emerald-500/20 text-emerald-100 border border-emerald-400/30"
                      : "bg-white/20 text-white/90 border border-white/20"
                  }`}
                >
                  <Clock size={12} />
                  {upcoming ? "Upcoming" : "Past Event"}
                </span>
              </div>
            </motion.div>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-4 flex-wrap mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-lg border border-primary/20">
                Event
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted bg-light-primary rounded-md">
                <Calendar size={12} className="text-primary" />
                {formatDate(item.start_date)}
              </span>
              <span className="text-gray-300">→</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted bg-light-primary rounded-md">
                <Calendar size={12} className="text-primary" />
                {formatDate(item.end_date)}
              </span>
              {item.location && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent-dark bg-accent/10 rounded-md">
                  <MapPin size={12} />
                  {item.location}
                </span>
              )}
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted hover:text-primary transition-colors">
                <Share2 size={12} />
                Share
              </button>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl leading-tight mb-8"
            >
              {item.title}
            </motion.h1>

            {/* Article body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              {item.summary ? (
                <Preview value={item.summary} />
              ) : (
                <p className="text-gray-500 italic">
                  No description available for this event.
                </p>
              )}
            </motion.div>

            {/* Back link bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12"
            >
              <Link
                href="/about/events"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-primary/5 rounded-xl transition-all hover:bg-primary hover:text-white"
              >
                <ArrowLeft
                  size={15}
                  className="transition-transform group-hover:-translate-x-1"
                />
                View All Events
              </Link>
            </motion.div>
          </div>

          {/* Sidebar — Recent Events */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:block sticky top-28"
          >
            <div className="bg-light-primary/40 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-display text-lg font-bold text-primary mb-6 flex items-center gap-2">
                Recent Events
              </h3>
              <div className="space-y-4">
                {recent.map((event) => {
                  const eventUpcoming = isUpcoming(event.end_date);
                  return (
                    <Link
                      key={event.id}
                      href={`/about/events/${event.id}`}
                      className="group flex gap-4 p-3 rounded-xl hover:bg-white/80 transition-all duration-300"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={event.image || DEFAULT_EVENT_IMAGE}
                          alt={event.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-text-muted flex items-center gap-1">
                            <Calendar size={10} />
                            {formatDate(event.start_date)}
                          </p>
                          <span
                            className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                              eventUpcoming
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {eventUpcoming ? "Soon" : "Past"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
