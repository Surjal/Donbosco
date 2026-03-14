"use client";

import { motion } from "framer-motion";
import { Target, Users, TrendingUp } from "lucide-react";
import type { Mission } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  target: <Target size={32} />,
  users: <Users size={32} />,
  "trending-up": <TrendingUp size={32} />,
};

interface Props {
  mission: Mission;
  index?: number;
}

export function MissionCard({ mission, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group relative px-8 py-10 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-light transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      <div className="mb-5 w-16 h-16 rounded-2xl group flex items-center justify-center bg-primary/5 group-hover:bg-primary text-primary  transition-all duration-500">
        <span className=" group-hover:text-white inline-flex text-3xl justify-center items-center iconify" data-icon={mission.icon}></span>
      </div>
      <h3 className="mb-3 text-sm font-bold tracking-[0.2em] text-primary uppercase">
        {mission.title}
      </h3>
      <p className="text-sm leading-relaxed text-text-muted">
        {mission.description}
      </p>
    </motion.div>
  );
}
