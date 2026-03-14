"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";

interface Props {
  faq: Faq;
  isOpen: boolean;
  toggle: () => void;
  index: number;
}

export function FaqItem({ faq, isOpen, toggle, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
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
            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              isOpen ? "bg-primary text-white" : "bg-primary/5 text-primary"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-semibold transition-colors duration-300 ${
              isOpen ? "text-primary" : "text-gray-800"
            }`}
          >
            {faq.question}
          </span>
        </div>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 transition-all duration-300 ${
            isOpen ? "rotate-180 text-primary" : "text-gray-400"
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
