"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2, ArrowRight } from "lucide-react";
import type { BlogItem, BlogsApiResponse } from "@/lib/types";
import Preview from "@/components/ui/Editor";

interface Props {
  item: BlogItem;
  recentItems: BlogsApiResponse;
}

const DEFAULT_BLOG_IMAGE = "https://placehold.co/600x400/png";

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

export function BlogDetailContent({ item, recentItems }: Props) {
  console.log(recentItems.data)
  const recent = recentItems?.data?.filter((b) => b.id !== item.id).slice(0, 5);

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
            href="/about/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Blogs
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
              className="mb-8 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={item.image || DEFAULT_BLOG_IMAGE}
                alt={item.title}
                width={1200}
                height={600}
                className="w-full h-[400px] object-cover"
              />
            </motion.div>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-4 flex-wrap mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
                Blog
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted">
                <Calendar size={12} />
                {formatDate(item.start_date)}
              </span>
              {item.name && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted">
                  <User size={12} />
                  {item.name}
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
                  No content available for this blog post.
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
                href="/about/blogs"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-primary/5 rounded-xl transition-all hover:bg-primary hover:text-white"
              >
                <ArrowLeft
                  size={15}
                  className="transition-transform group-hover:-translate-x-1"
                />
                View All Blogs
              </Link>
            </motion.div>
          </div>

          {/* Sidebar — Recent Blogs */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden lg:block sticky top-28"
          >
            <div className="bg-light-primary/40 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-display text-lg font-bold text-primary mb-6 flex items-center gap-2">
                Recent Blogs
              </h3>
              <div className="space-y-4">
                {recent.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/about/blogs/${blog.id}`}
                    className="group flex gap-4 p-3 rounded-xl hover:bg-white/80 transition-all duration-300"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={blog.image || DEFAULT_BLOG_IMAGE}
                        alt={blog.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <Calendar size={10} />
                        {formatDate(blog.start_date)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
