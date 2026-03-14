"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User, Share2 } from "lucide-react";
import { RecentUpdatesSidebar } from "@/components/ui/RecentUpdatesSidebar";
import defaultNewsImg from "@/public/news.png";
import Preview from "@/components/ui/Editor";

interface Props {
  item: any;
  recentItems: any[];
}

export function NewsDetailContent({ item, recentItems }: Props) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-light-primary/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 relative">
        {/* Back link */}

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
          {/* Main content */}
          <div>
            {/* Hero image */}
            {item.image && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={item.image || defaultNewsImg}
                  alt={item.title}
                  width={1200}
                  height={600}
                  className="w-full h-[400px] object-cover"
                />
              </motion.div>
            )}

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-4 flex-wrap mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-lg border border-primary/20">
                <Tag size={12} />
                {item.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted">
                <Calendar size={12} />
                {item.date}
              </span>
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
              className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl leading-tight mb-6"
            >
              {item.title}
            </motion.h1>

            {/* Lead/Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-accent/30 pl-6"
            >
              <Preview value={item.summary} />
            </motion.p>

            {/* Article body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
              <Preview value={item.content || ""} />
            </motion.div>

            {/* Tags/Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12 pt-8 border-t border-gray-100"
            >
              <p className="text-sm font-semibold text-text-muted mb-3">
                Related Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Industrial Development",
                  "Summit 2025",
                  "Sustainability",
                  "Trade",
                  "Koshi Province",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Back link bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-8"
            >
              <Link
                href="/news-notices"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-primary/5 rounded-xl transition-all hover:bg-primary hover:text-white"
              >
                <ArrowLeft
                  size={15}
                  className="transition-transform group-hover:-translate-x-1"
                />
                View All News & Notices
              </Link>
            </motion.div>
          </div>

          {/* Sidebar */}
          <RecentUpdatesSidebar
            items={recentItems}
            title="Recent News"
            currentItemId={item.id}
          />
        </div>
      </div>
    </section>
  );
}
