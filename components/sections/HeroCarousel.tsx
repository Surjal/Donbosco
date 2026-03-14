"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import type { HeroSlide } from "@/lib/types";
import Link from "next/link";
import Preview from "../ui/Editor";
type Props = {
  heroSlides: HeroSlide[];
};
export function HeroCarousel({ heroSlides }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % heroSlides?.length);
  }, [heroSlides?.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + heroSlides?.length) % heroSlides?.length);
  }, [heroSlides?.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[current];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };


  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide?.image}')` }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex items-center h-full">
        <div className="w-full px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <motion.div
              key={`badge-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest text-accent-light uppercase bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Don Bosco school and Institute, Tankisinwari
              </span>
            </motion.div>

            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mb-6 font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] drop-shadow-lg"
            >
              {slide?.title}
            </motion.h1>

            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-10 text-lg text-white/80 sm:text-xl md:text-2xl max-w-2xl leading-relaxed px-5"
            >
              <Preview value={slide?.content} />
            </motion.p>

            <motion.div
              key={`cta-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/about"
                className="group relative overflow-hidden px-8 py-4 bg-accent text-primary-dark font-semibold rounded-xl transition-all duration-300 hover:bg-accent-light hover:shadow-xl hover:shadow-accent/20 shimmer-hover"
              >
                Explore More
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 transition-all duration-300 hover:bg-white/20 hover:border-white/50"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 z-20 hidden md:flex justify-between pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 transition-all hover:bg-white/20 hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 transition-all hover:bg-white/20 hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide? Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`transition-all duration-500 rounded-full ${i === current
                ? "w-10 h-3 bg-accent"
                : "w-3 h-3 bg-white/40 hover:bg-white/60"
              }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 z-20 hidden lg:block"
      >
        <a
          href="#message"
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </a>
      </motion.div> */}
    </section>
  );
}
