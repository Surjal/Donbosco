"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowRight, Calendar, Clock, ChevronDown } from "lucide-react";
import type { Message } from "@/lib/types";

interface Props {
  messages: Message[];
}

export function MessagesContent({ messages }: Props) {
  const [activeId, setActiveId] = useState<number>(messages[0]?.id ?? 1);
  const active = messages.find((m) => m.id === activeId) ?? messages[0];

  return (
    <main>
      {/* ── Featured message (desktop two-col, mobile stacked) ── */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-light-primary/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 relative">
          <div className="grid gap-14 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] items-start">

            {/* ── Sidebar: speaker selector ── */}
            <motion.aside
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28 space-y-3"
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-5 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-accent inline-block" />
                Select Leader
              </p>

              {messages.map((msg, i) => (
                <motion.button
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  onClick={() => setActiveId(msg.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 group ${
                    activeId === msg.id
                      ? "bg-primary border-primary shadow-lg shadow-primary/15"
                      : "bg-white border-gray-100 hover:border-primary/20 hover:shadow-md"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                      <Image
                        src={
                          msg.image ??
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                        }
                        alt={msg.staff_name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    {activeId === msg.id && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`font-semibold text-sm truncate transition-colors ${
                        activeId === msg.id ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {msg.staff_name}
                    </p>
                    <p
                      className={`text-[11px] truncate mt-0.5 transition-colors ${
                        activeId === msg.id
                          ? "text-white/60"
                          : "text-text-muted"
                      }`}
                    >
                      {msg.designation.split(",")[0]}
                    </p>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`flex-shrink-0 ml-auto -rotate-90 transition-all ${
                      activeId === msg.id
                        ? "text-accent"
                        : "text-gray-300 group-hover:text-primary"
                    }`}
                  />
                </motion.button>
              ))}
            </motion.aside>

            {/* ── Main message panel ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <div className="grid gap-10 md:grid-cols-[280px_1fr] items-start">
                  {/* Photo */}
                  <div className="relative group">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
                      <Image
                        src={
                          active.image ??
                          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                        }
                        alt={active.staff_name}
                        width={600}
                        height={480}
                        className="w-full h-[420px] md:h-[480px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />

                      {/* Name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="font-display font-bold text-white text-base leading-tight">
                          {active.staff_name}
                        </p>
                        <p className="text-accent text-xs font-medium mt-0.5">
                          {active.designation.split(",")[0]}
                        </p>
                      </div>
                    </div>

                    {/* Floating metadata card */}
                    <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-xl p-4 border border-gray-100 z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Quote size={16} className="text-accent" />
                        </div>
                        <div>
                          {active.tenure && (
                            <p className="text-[10px] font-semibold text-primary flex items-center gap-1">
                              <Clock size={9} />
                              {active.tenure}
                            </p>
                          )}
                          {active.date && (
                            <p className="text-[9px] text-text-muted flex items-center gap-1 mt-0.5">
                              <Calendar size={9} />
                              {active.date}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Decorative border offset */}
                    <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-accent/20 -z-10" />
                  </div>

                  {/* Message text */}
                  <div className="space-y-7 pt-2">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-[2px] bg-accent" />
                      <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                        Leadership
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl leading-tight">
                      {active.title}
                    </h2>

                    {/* Designation badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-xs font-semibold text-primary">
                        {active.designation}
                      </span>
                    </div>

                    {/* Quote body */}
                    <div className="relative pl-6 border-l-2 border-accent/30">
                      <Quote
                        size={28}
                        className="absolute -top-2 -left-3 text-accent/20 fill-accent/10"
                      />
                      <p className="text-gray-600 leading-relaxed text-base lg:text-lg italic">
                        &ldquo;{active.content}&rdquo;
                      </p>
                    </div>

                    {/* Author footer */}
                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h4 className="font-bold text-primary text-lg">
                          {active.staff_name}
                        </h4>
                        <p className="text-sm text-text-muted mt-0.5">
                          {active.designation}
                        </p>
                      </div>
                      <Link
                        href={`/messages/${active.id}`}
                        className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-primary bg-primary/5 rounded-xl transition-all hover:bg-primary hover:text-white"
                      >
                        Full Message
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── All messages archive grid ── */}
      <section className="py-20 bg-light-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                Archive
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">
              All Messages
            </h2>
            <p className="mt-2 text-base text-text-muted max-w-xl">
              A record of guidance and vision from our leadership team
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {messages.map((msg, i) => (
              <MessageArchiveCard key={msg.id} message={msg} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Archive card sub-component ── */
function MessageArchiveCard({
  message,
  index,
}: {
  message: Message;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const preview = message.content.slice(0, 180);
  const isTruncated = message.content.length > 180;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-primary/10"
    >
      {/* Top strip */}
      <div className="h-1 bg-gradient-to-r from-accent to-accent-light transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      <div className="p-7">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={
                  message.image ??
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                }
                alt={message.staff_name}
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Header text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-display font-bold text-primary text-lg leading-tight">
                {message.staff_name}
              </h3>
            </div>
            <p className="text-xs text-text-muted">{message.designation}</p>
            {message.date && (
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-text-muted">
                <Calendar size={10} />
                {message.date}
              </div>
            )}
          </div>

          {/* Quote icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Quote size={18} className="text-accent" />
          </div>
        </div>

        {/* Title */}
        <h4 className="mt-5 font-semibold text-gray-800 group-hover:text-primary transition-colors">
          {message.title}
        </h4>

        {/* Content with expand */}
        <div className="mt-3 relative pl-4 border-l-2 border-accent/20">
          <p className="text-sm text-gray-600 leading-relaxed italic">
            &ldquo;
            {expanded || !isTruncated ? message.content : `${preview}…`}
            &rdquo;
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
          {isTruncated && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-semibold text-primary hover:text-accent transition-colors flex items-center gap-1"
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDown
                size={13}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
          <Link
            href={`/messages/${message.id}`}
            className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-colors ml-auto"
          >
            Full Message
            <ArrowRight
              size={13}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}