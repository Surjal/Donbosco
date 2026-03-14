"use client";

import { motion } from "framer-motion";
import { Bell, ArrowRight, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import type { NoticeItem } from "@/lib/types";

interface Props {
  notices: NoticeItem[];
}

export function NoticesSection({ notices }: Props) {
  return (
    <section id="notices" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                Stay Updated
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
              Notices
            </h2>
            <p className="mt-3 text-base text-text-muted max-w-lg">
              Stay informed with the latest notices and important updates
            </p>
          </div>
          <Link
            href="/news-notices?filter=notice"
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-xl transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
          >
            View All Notices
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <div className="max-w-4xl">
          <div className="space-y-3">
            {notices.slice(0, 4).map((notice, i) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={`/news-notices/notice/${notice.slug ?? notice.id}`}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-white hover:bg-primary/[0.02] hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                      <Bell size={18} className="text-red-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors leading-snug">
                        {notice.title}
                      </h3>
                      {notice.isNew && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-dark bg-accent/10 rounded-full">
                          <Sparkles size={10} />
                          New
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-text-muted">
                      <Calendar size={14} />
                      {notice.date}
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="flex-shrink-0 mt-1 text-gray-300 group-hover:text-primary transition-all group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
