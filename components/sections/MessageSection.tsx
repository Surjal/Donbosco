"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import type { Message } from "@/lib/types";

import Preview from "../ui/Editor";

interface Props {
  messages: Message[];
}

export function MessageSection({ messages }: Props) {
  const message = messages?.[0] ?? null; // Assuming we want to display the first message. Adjust as needed.
  if (!message) return null;
  return (
    <section
      id="message"
      className="py-16 lg:py-28 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 lg:w-1/3 h-full bg-gradient-to-l from-light-primary/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 lg:w-64 lg:h-64 bg-accent/5 rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 relative">
        <div className="grid gap-10 lg:gap-20 lg:grid-cols-2 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-primary/10">
                <Image

                  src={
                    message?.image ||
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                  }
                  alt={"Image"}
                  width={600}
                  height={500}
                  className="w-full h-[280px] sm:h-[380px] lg:h-[480px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />
                {/* Name badge over image */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg inline-flex flex-col">
                    <span className="text-sm font-bold text-primary leading-tight">
                      {message?.staff_name}
                    </span>
                    <span className="text-xs text-text-muted">{message?.designation}</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full rounded-2xl border-2 border-accent/20 -z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-6 lg:space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
               {message?.date || message?.tenure || "Message"}
              </span>
            </div>

            <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
              {message?.title || "A Message from Our Leadership"}
            </h2>

            <div className="relative">
              <Quote size={36} className="text-accent/20 mb-2 fill-accent/10" />
              <div className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                <Preview value={message?.content || "Your message content here..."  } />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
