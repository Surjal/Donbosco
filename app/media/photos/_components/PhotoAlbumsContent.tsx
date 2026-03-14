"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import type { Album, AlbumsApiResponse } from "@/lib/types";
import { AppPagination } from "@/components/ui/AppPagination";
import { useRouter } from "next/navigation";
import { getPaginatedAlbums } from "@/lib/api";

interface Props {
  albums: AlbumsApiResponse;
}

const ITEMS_PER_PAGE = 6;

export function PhotoAlbumsContent({ albums }: Props) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(albums.current_page || 1);
  const [lastPage, setLastPage] = useState(albums.last_page || 1);
  const [total, setTotal] = useState(albums.total || 0);
  const [perPage, setPerPage] = useState(albums.per_page || 10);
  const [albumsData, setAlbumsData] = useState(albums.data);
  const handlePaginate = async (page: number) => {
    setCurrentPage(page);
    const { data, last_page, per_page, current_page, total } =
      await getPaginatedAlbums(page);
    setAlbumsData(data);
    setLastPage(last_page);
    setPerPage(per_page);
    setTotal(total);
    router.push(`/media/photos?page=${page}`);
    setCurrentPage(current_page);
  };

  return (
    <section className="py-20 bg-light-primary min-h-[60vh]">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Albums grid */}
        <div className="grid gap-8 sm:grid-cols-2 mb-16">
          {albumsData.map((album: Album, i: number) => (
            <AlbumCard key={album.id} album={album} index={i} />
          ))}
        </div>

        {/* Pagination */}
        {total > perPage && (
          <div className="flex justify-center mt-8">
            <AppPagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={(page) => {
                handlePaginate(page);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Album Card ── */
function AlbumCard({ album, index }: { album: Album; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
    >
      {/* Grid preview */}
      <div className="grid grid-cols-2 gap-2 p-2">
        {/* Main large image */}
        <div className="col-span-2 relative overflow-hidden rounded-xl h-72">
          <Image
            src={album.cover_images[0]}
            alt={album.title}
            width={800}
            height={288}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Photo count badge */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold rounded-lg">
              <ImageIcon size={14} />
              {album.totalimage} Photos
            </span>
          </div>
        </div>

        {/* Thumbnail grid */}
        {album?.cover_images?.slice(1, 5)?.map((img: string, i: number) => (
          <div key={i} className="relative overflow-hidden rounded-lg h-24">
            <Image
              src={img}
              alt=""
              width={200}
              height={96}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-bold text-gray-800 text-xl mb-2 group-hover:text-primary transition-colors">
          {album.title}
        </h3>
        <p className="text-sm text-text-muted line-clamp-2 mb-3 leading-relaxed">
          {album.description}
        </p>
        <p className="text-xs text-text-muted mb-4">{album.date}</p>

        <Link
          href={`/media/photos/${album.id}`}
          className="group/link inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-xl transition-all hover:bg-primary-dark hover:shadow-lg"
        >
          View Gallery
          <ArrowRight
            size={14}
            className="transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}

/* ── Pagination ── */
// function Pagination({
//   currentPage,
//   totalPages,
//   onPageChange,
// }: {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }) {
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="flex items-center justify-center gap-2"
//     >
//       <button
//         onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//       >
//         <ChevronLeft size={16} />
//       </button>

//       {pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
//             page === currentPage
//               ? "bg-primary text-white shadow-md"
//               : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
//           }`}
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//       >
//         <ChevronRight size={16} />
//       </button>

//       <span className="ml-4 text-sm text-text-muted">Next</span>
//     </motion.div>
//   );
// }
