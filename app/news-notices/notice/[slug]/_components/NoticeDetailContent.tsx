"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Bell, Download, FileText } from "lucide-react";
import { RecentUpdatesSidebar } from "@/components/ui/RecentUpdatesSidebar";
import type { NewsNoticeItem } from "@/lib/types";
import defaultNoticeImg from "@/public/notice.png";
import Preview from "@/components/ui/Editor";

interface Props {
  item: any;
  recentItems: NewsNoticeItem[];
}

export function NoticeDetailContent({ item, recentItems }: Props) {
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
            href="/news-notices"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to News & Notices
          </Link>
        </motion.div> */}

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          {/* Main content */}
          <div>
            {/* Notice badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-xl mb-6"
            >
              <Bell size={16} />
              <span className="text-sm font-bold">Official Notice</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl leading-tight mb-6"
            >
              {item.title}
            </motion.h1>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-4 flex-wrap mb-8 pb-6 border-b border-gray-200"
            >
              <span className="inline-flex items-center gap-1.5 text-sm text-text-muted">
                <Calendar size={14} />
                Published: {item?.date}
              </span>
              {item?.isNew && (
                <span className="px-2.5 py-1 text-xs font-bold bg-accent/10 text-accent-dark rounded-full">
                  NEW
                </span>
              )}
            </motion.div>

            {/* Image */}
            {item?.image && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-8 rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={item?.image || defaultNoticeImg}
                  alt={item?.title}
                  width={1200}
                  height={600}
                  className="w-full h-[400px] object-cover"
                />
              </motion.div>
            )}

            {/* Summary box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-light-primary rounded-2xl p-6 mb-8 border-l-4 border-primary"
            >
              <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                <FileText size={18} />
                Notice Summary
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <Preview value={item?.summary} />
              </p>
            </motion.div>

            {/* Notice body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <Preview value={item?.content ?? ""} />
            </motion.div>

            {/* Download/Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-4"
            >
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all">
                <Download size={16} />
                Download Notice (PDF)
              </button>
              <Link
                href="/news-notices"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
              >
                <ArrowLeft size={16} />
                All Notices
              </Link>
            </motion.div>
          </div>

          {/* Sidebar */}
          <RecentUpdatesSidebar
            items={recentItems}
            title="Recent Notices"
            currentItemId={item?.id}
          />
        </div>
      </div>
    </section>
  );
}
