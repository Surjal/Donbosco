"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import defaultNewsImg from "@/public/news.png";

interface Props {
  item: NewsItem;
  index?: number;
}

export function NewsCard({ item, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
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
            {item.category}
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
        <p className="mb-6 text-sm leading-relaxed text-text-muted line-clamp-3 flex-1">
          {item.summary}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-50">
          <Link
            href={`/news/${item.slug ?? item.id}`}
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
  );
}
