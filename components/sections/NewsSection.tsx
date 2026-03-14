"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import defaultNewsImg from "@/public/news.png";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/lib/types";
import Preview from "../ui/Editor";

interface Props {
  news: NewsItem[];
}

export function NewsSection({ news }: Props) {
  return (
    <section id="news" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                Latest Updates
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
              News and Press Releases
            </h2>
            <p className="mt-3 text-base text-text-muted max-w-lg">
              Stay informed with the latest industry updates and developments
            </p>
          </div>
          <Link
            href="/news-notices?filter=news"
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-xl transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
          >
            All News
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-transparent"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.image || defaultNewsImg}
                  alt={item.title}
                  width={600}
                  height={224}
                  className="w-full h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary/80 backdrop-blur-sm rounded-lg">
                    <Tag size={12} />
                    <p>News</p>
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 mb-3 text-sm text-text-muted">
                  <Calendar size={14} />
                  {item.date}
                </div>
                <h3 className="mb-3 text-lg font-bold text-gray-800 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>
                {/* <p className="mb-6 text-sm leading-relaxed text-text-muted line-clamp-2 flex-1 "> */}
                {/* {item?.summary?.length! > 500 ? (
                    item?.summary?.substring(0, 200) + "....more"
                  ) : item?.summary ? (
                    <Preview value={item.summary} />
                  )  */}

                <div className="mb-6 text-sm leading-relaxed text-text-muted flex-1 px-4">
                  <Preview
                    value={
                      item?.summary?.length! > 100
                        ? item?.summary?.substring(0, 100) + " ..."
                        : item?.summary || ""
                    }
                  />
                </div>
                {/* </p> */}
                <div className="mt-auto pt-4 border-t border-gray-50">
                  {/* Use Link for internal news pages, href for external */}
                  <Link
                    href={`/news-notices/${item.category.toLowerCase()}/${item.slug ?? item.id}`}
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                  >
                    Read Full Article
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
