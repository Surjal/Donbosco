"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import defaultNewsImg from "@/public/news.png";
import type { NewsNoticeItem } from "@/lib/types";

interface Props {
  items: any[];
  title?: string;
  currentItemId?: string;
}

export function RecentUpdatesSidebar({
  items,
  title = "Recent Updates",
  currentItemId,
}: Props) {
  const recentItems = items
    .filter((item) => item?.id !== currentItemId)
    .slice(0, 5);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="sticky top-28"
    >
      <div className="bg-light-primary rounded-2xl p-6 border border-gray-100">
        <h3 className="font-display text-xl font-bold text-primary mb-6">
          {title}
        </h3>
        <div className="space-y-4">
          {recentItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                href={`/news-notices/${item.category?.toLowerCase()}/${item?.slug ?? item?.id}`}
                className="group flex gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0 hover:opacity-80 transition-opacity"
              >
                {item.image && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item?.image || defaultNewsImg}
                      alt={item?.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-muted flex items-center gap-1">
                    <Calendar size={10} />
                    {item.date}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          href="/news-notices"
          className="group inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary hover:text-accent transition-colors"
        >
          View All Updates
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.aside>
  );
}
