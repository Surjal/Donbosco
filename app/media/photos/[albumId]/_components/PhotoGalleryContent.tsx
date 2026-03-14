"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/lib/types";

interface Props {
  data: Photo[];
}

export function PhotoGalleryContent({ data }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Back link */}
        {/* <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            href="/media/photos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Albums
          </Link>
        </motion.div> */}

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((photo, i) => (
            <motion.button
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={photo.image}
                alt={photo.title ?? `Photo ${i + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.button>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              photos={data}
              currentIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onNext={() => setLightboxIndex((lightboxIndex + 1) % data.length)}
              onPrev={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + data.length) % data.length,
                )
              }
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Lightbox ── */
function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const photo = photos[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold rounded-lg">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Navigation */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.image}
          alt={photo.title ?? ""}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
        {photo.title && (
          <p className="mt-4 text-center text-white/80 text-sm">
            {photo.title}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
