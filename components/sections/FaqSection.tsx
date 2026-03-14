"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, MessageCircleQuestion } from "lucide-react";
import type { Faq } from "@/lib/types";

interface FaqItemProps {
  faq: Faq;
  isOpen: boolean;
  toggle: () => void;
  index: number;
}

function FaqItem({ faq, isOpen, toggle, index }: FaqItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
        ? "bg-white border-primary/20 shadow-lg shadow-primary/5"
        : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
        }`}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div className="flex items-center gap-4">
          <span
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${isOpen ? "bg-primary text-white" : "bg-primary/5 text-primary"
              }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-semibold transition-colors duration-300 ${isOpen ? "text-primary" : "text-gray-800"
              }`}
          >
            {faq.question}
          </span>
        </div>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-primary" : "text-gray-400"
            }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6">
              <div className="pl-12 border-l-2 border-accent/30 ml-[2px]">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface Props {
  faqs: Faq[];
}

export function FaqSection({ faqs }: Props) {
  const [openId, setOpenId] = useState<number | null>(1);


  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-light-primary relative overflow-hidden"
    >
      <div className="absolute top-20 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                FAQ
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-text-muted max-w-xl">
              Quick answers to common questions about Don Bosco and our services
            </p>
          </div>
          <Link
            href="/faq"
            className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-xl transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          <div className="space-y-3">
            {faqs?.map((faq, i) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                index={i}
                isOpen={openId === faq.id}
                toggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white sticky top-28"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <MessageCircleQuestion size={28} className="text-accent-light" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-display">
              Still have questions?
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Can&apos;t find the answer you&apos;re looking for? Our team is
              happy to help you with any questions you may have.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 w-full justify-center px-6 py-3.5 bg-accent text-primary-dark font-semibold rounded-xl transition-all hover:bg-accent-light hover:shadow-lg"
            >
              Contact Our Team
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
