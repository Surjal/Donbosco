"use client";

import { motion } from "framer-motion";

const shimmer = {
  initial: { x: "-100%" },
  animate: { x: "100%" },
};

const ShimmerEffect = () => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
    variants={shimmer}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

export const NewsCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="relative h-56 bg-gray-200 overflow-hidden">
        <ShimmerEffect />
      </div>
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="relative h-4 w-1/3 bg-gray-200 rounded overflow-hidden">
          <ShimmerEffect />
        </div>
        <div className="relative h-6 w-3/4 bg-gray-200 rounded overflow-hidden">
          <ShimmerEffect />
        </div>
        <div className="space-y-2">
          <div className="relative h-3 w-full bg-gray-200 rounded overflow-hidden">
            <ShimmerEffect />
          </div>
          <div className="relative h-3 w-5/6 bg-gray-200 rounded overflow-hidden">
            <ShimmerEffect />
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="relative h-4 w-1/4 bg-gray-200 rounded overflow-hidden">
            <ShimmerEffect />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
};
