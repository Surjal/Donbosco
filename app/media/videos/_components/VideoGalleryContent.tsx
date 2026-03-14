"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X, Clock, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import type { Video } from "@/lib/types";

interface Props {
  videos: Video[];
}

const ITEMS_PER_PAGE = 6;

export function VideoGalleryContent({ videos }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(videos.map((v) => v.category).filter(Boolean)))],
    [videos]
  );

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? videos
        : videos.filter((v) => v.category === activeCategory),
    [videos, activeCategory]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedVideos = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="py-20 bg-white min-h-[60vh]">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-10 flex-wrap"
        >
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Filter size={16} />
            <span className="font-semibold">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as string);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-text-muted hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Video grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {paginatedVideos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} onClick={() => setSelectedVideo(video)} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Video modal */}
        <AnimatePresence>
          {selectedVideo && (
            <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Video Card ── */
function VideoCard({
  video,
  index,
  onClick,
}: {
  video: Video;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-56">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          width={600}
          height={224}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
            <Play size={24} className="text-white ml-1" fill="white" />
          </div>
        </div>

        {/* Duration */}
        {video.duration && (
          <div className="absolute bottom-4 right-4">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded">
              <Clock size={10} />
              {video.duration}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        {video.category && (
          <span className="inline-block px-3 py-1 text-xs font-semibold text-accent bg-accent/10 rounded-full mb-3">
            {video.category}
          </span>
        )}
        <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-sm text-text-muted line-clamp-2 mb-3">{video.description}</p>
        <p className="text-xs text-text-muted">{video.date}</p>
      </div>
    </motion.article>
  );
}

/* ── Video Modal ── */
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <X size={20} />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={video.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-6 text-white">
          <h3 className="font-display text-2xl font-bold mb-2">{video.title}</h3>
          <p className="text-white/70 leading-relaxed">{video.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-white/50">
            {video.category && <span>• {video.category}</span>}
            <span>• {video.date}</span>
            {video.duration && <span>• {video.duration}</span>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Pagination ── */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2"
    >
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            page === currentPage
              ? "bg-primary text-white shadow-md"
              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </motion.div>
  );
}