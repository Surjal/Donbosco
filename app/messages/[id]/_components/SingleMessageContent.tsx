"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Message } from "@/lib/types";

interface Props {
  message: Message;
}

export function SingleMessageContent({ message }: Props) {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-light-primary/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8 relative">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/messages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to All Messages
          </Link>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[320px_1fr] items-start">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
                <Image
                  src={
                    message.image ??
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                  }
                  alt={message.staff_name}
                  width={600}
                  height={560}
                  className="w-full h-[480px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display font-bold text-white text-xl">
                    {message.staff_name}
                  </p>
                  <p className="text-accent text-sm mt-1 font-medium">
                    {message.designation.split(",")[0]}
                  </p>
                </div>
              </div>

              {/* Floating metadata */}
              <div className="mt-4 bg-light-primary rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Details
                  </span>
                </div>
                {message.tenure && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <Clock size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">
                        Tenure
                      </p>
                      <p className="font-semibold text-primary text-sm">
                        {message.tenure}
                      </p>
                    </div>
                  </div>
                )}
                {message.date && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <Calendar size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">
                        Published
                      </p>
                      <p className="font-semibold text-primary text-sm">
                        {message.date}
                      </p>
                    </div>
                  </div>
                )}
                <div className="pt-2">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                    Full Title
                  </p>
                  <p className="text-xs font-medium text-gray-700 leading-relaxed">
                    {message.designation}
                  </p>
                </div>
              </div>

              {/* Decorative border */}
              <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-accent/20 -z-10" />
            </div>
          </motion.div>

          {/* Message content column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-accent" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                Leadership Message
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl leading-tight">
              {message.title}
            </h1>

            {/* Designation badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-semibold text-primary">
                {message.designation}
              </span>
            </div>

            {/* Large decorative quote */}
            <div className="relative">
              <Quote
                size={64}
                className="absolute -top-4 -left-2 text-accent/10 fill-accent/10"
              />
              <div className="relative pl-8 border-l-4 border-accent/30 space-y-5">
                {/* Split into paragraphs for readability on full-page view */}
                {message.content.split(". ").reduce<string[][]>((acc, sentence, i) => {
                  const chunkIndex = Math.floor(i / 3);
                  if (!acc[chunkIndex]) acc[chunkIndex] = [];
                  acc[chunkIndex].push(sentence);
                  return acc;
                }, []).map((chunk, pi) => (
                  <motion.p
                    key={pi}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + pi * 0.1, duration: 0.5 }}
                    className="text-gray-600 leading-relaxed text-base lg:text-lg italic"
                  >
                    {chunk.join(". ")}{chunk[chunk.length - 1]?.endsWith(".") ? "" : "."}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Signature block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-8 border-t border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                  <Image
                    src={
                      message.image ??
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
                    }
                    alt={message.staff_name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-lg">
                    {message.staff_name}
                  </h4>
                  <p className="text-sm text-text-muted">{message.designation}</p>
                  {message.tenure && (
                    <p className="text-xs text-accent font-medium mt-0.5">
                      {message.tenure}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Nav to other messages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link
                href="/messages"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-primary bg-primary/5 rounded-xl transition-all hover:bg-primary hover:text-white"
              >
                <ArrowLeft
                  size={15}
                  className="transition-transform group-hover:-translate-x-1"
                />
                View All Messages
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}