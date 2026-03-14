"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Image as ImageIcon, Play, Clock } from "lucide-react";
import type { PhotoAlbum, Video } from "@/lib/types";

interface Props {
  albums: PhotoAlbum[];
  videos: Video[];
}

export function MediaOverviewContent({ albums, videos }: Props) {
  return (
    <main className="bg-light-primary">
      {/* ── Photo Albums Section ── */}
      <section className="py-20">
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-[2px] bg-accent" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                  Photo Gallery
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
                Photo Albums
              </h2>
              <p className="mt-2 text-text-muted">
                Recent event photos and highlights
              </p>
            </div>
            <Link
              href="/media/photos"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-xl transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            >
              View All Albums
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {albums.map((album, i) => (
              <AlbumPreviewCard key={album.id} album={album} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Gallery Section ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-[2px] bg-accent" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                  Video Gallery
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
                Video Library
              </h2>
              <p className="mt-2 text-text-muted">
                Event highlights and interviews
              </p>
            </div>
            <Link
              href="/media/videos"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-xl transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
            >
              View All Videos
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {videos.map((video, i) => (
              <VideoPreviewCard key={video.id} video={video} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Album Preview Card ── */
function AlbumPreviewCard({
  album,
  index,
}: {
  album: PhotoAlbum;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    >
      <Link href={`/media/photos/${album.id}`} className="block">
        {/* Main cover + grid */}
        <div className="grid grid-cols-2 gap-2 p-2">
          {/* Large cover */}
          <div className="col-span-2 relative overflow-hidden rounded-xl h-64">
            <Image
              src={album.cover_images[0]}
              alt={album.title}
              width={800}
              height={256}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 text-white/80 text-xs mb-2">
                <ImageIcon size={14} />
                <span>{album.totalimage} Photos</span>
              </div>
            </div>
          </div>

          {/* Thumbnail grid */}
          {album.cover_images.slice(0, 4).map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg h-20">
              <Image
                src={img}
                alt=""
                width={200}
                height={80}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-primary transition-colors">
            {album.title}
          </h3>
          <p className="text-sm text-text-muted line-clamp-2 mb-3">
            {album.description}
          </p>
          <p className="text-xs text-text-muted">{album.date}</p>

          <div className="mt-4 pt-4 border-t border-gray-50">
            <span className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary">
              View Gallery
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ── Video Preview Card ── */
function VideoPreviewCard({ video, index }: { video: Video; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
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

        {/* Duration badge */}
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
        <p className="text-sm text-text-muted line-clamp-2 mb-3">
          {video.description}
        </p>
        <p className="text-xs text-text-muted">{video.date}</p>
      </div>
    </motion.article>
  );
}
