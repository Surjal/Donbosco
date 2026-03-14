"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import Preview from "../ui/Editor";

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  /** Optional: gradient background override */
  pattern?: boolean;
  isHome?: boolean;
  href?: string;
}

export function PageHero({
  eyebrow,
  isHome,
  href,
  title,
  description,
  breadcrumbs = [],
  pattern = true,
}: Props) {
  return (
    <section className="relative pt-32 pb-20 bg-primary-dark overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 mb-8 text-sm text-white/50"
          >
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-accent transition-colors"
            >
              <Home size={13} />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={13} />
                {crumb.href && i < breadcrumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-accent transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80 font-medium">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-10 h-[2px] bg-accent" />
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent">
            {eyebrow}
          </span>
        </motion.div>
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          {isHome && (
            <Link
              href={href as string}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white  transition-colors group"
            >
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to {eyebrow}
            </Link>
          )}
        </motion.div>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight max-w-3xl"
        >
          {title}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-5 text-lg text-white/60 max-w-2xl leading-relaxed"
          >
            <Preview value={description} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
