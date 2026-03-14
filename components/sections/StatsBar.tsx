"use client";

import { motion } from "framer-motion";
import { Building2, CalendarDays, Award, MapPin } from "lucide-react";
import type { Stat } from "@/lib/types";
type Props = {
  stats: Stat[];
};
const iconMap: Record<string, React.ReactNode> = {
  building: <Building2 size={28} />,
  calendar: <CalendarDays size={28} />,
  award: <Award size={28} />,
  "map-pin": <MapPin size={28} />,
};

export function StatsBar({ stats }: Props) {
 

  return (
    <section className="relative -mt-20 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-white rounded-2xl shadow-2xl shadow-black/8 overflow-hidden border border-gray-100"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
              className={`flex flex-col items-center justify-center py-8 px-4 text-center group hover:bg-primary transition-all duration-500 ${
                i < stats.length - 1 ? "border-r border-gray-100" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-gray-100" : ""}`}
            >
              <div className="mb-3 text-accent group-hover:text-accent-light transition-colors duration-500">
                {iconMap[stat.icon]}
              </div>
              <span className=" text-3xl sm:text-4xl font-bold text-primary group-hover:text-white transition-colors duration-500 font-display">
                {stat.value}
              </span>
              <span className="mt-1 text-xs sm:text-sm text-text-muted group-hover:text-white/70 transition-colors duration-500 font-medium tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
