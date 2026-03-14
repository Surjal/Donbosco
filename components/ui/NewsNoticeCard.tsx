"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Tag, ArrowRight, Sparkles } from "lucide-react";
import defaultNewsImg from "@/public/news.png";
import type { NewsItem, NoticeApiItem } from "@/lib/types";
import Preview from "./Editor";

type CardItem = NewsItem | NoticeApiItem;

interface Props {
  item: CardItem;
  index?: number;
  type?: "News" | "Notice";
}

// Helper to get the summary/description text from either item type
function getItemSummary(item: CardItem): string {
  if ("summary" in item && item.summary) return item.summary;
  if ("description" in item && item.description) return item.description;
  return "";
}

function stripHtml(html: string) {
  if (typeof window === "undefined") return html;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function NewsNoticeCard({ item, index = 0, type = "News" }: Props) {
  // Category-specific styling using theme colors
  const categoryColors: Record<string, string> = {
    News: "bg-primary/10 text-primary border-primary/20",
    Notice: "bg-accent/10 text-accent-dark border-accent/20",
  };

  const category = type || ("category" in item ? item.category : "News");
  const badgeClass = categoryColors[category] || categoryColors["News"];
  const summaryText = getItemSummary(item);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(26,58,92,0.2)] hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
    >
      {/* Accent top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image */}
      {item.image && (
        <div className="relative overflow-hidden h-56">
          <Image
            src={item.image || defaultNewsImg}
            alt={item.title}
            width={600}
            height={224}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary-dark/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border backdrop-blur-sm ${badgeClass}`}
            >
              <Tag size={12} />
              {category}
            </span>
            {item.isNew && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-dark bg-accent/90 backdrop-blur-sm rounded-lg border border-accent">
                <Sparkles size={10} />
                New
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Date */}
        <div className="flex items-center gap-2 mb-3 text-xs text-text-muted">
          <span className="flex items-center gap-1.5 bg-light-primary px-2.5 py-1 rounded-md">
            <Calendar size={12} className="text-primary" />
            {item.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-lg font-display font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
          {item.title}
        </h3>

        {/* Summary */}
        <div className="mb-4 text-sm leading-relaxed text-text-muted flex-1 px-4">
          <Preview
            value={
              summaryText.length > 150
                ? summaryText.substring(0, 150) + " ..."
                : summaryText
            }
          />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <span className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:text-accent hover:gap-3">
            Read More
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
