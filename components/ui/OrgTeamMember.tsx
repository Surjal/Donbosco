"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import type { OrgTeamMember } from "@/lib/types";
import Link from "next/link";

interface Props {
  member: OrgTeamMember;
  index?: number;
}

export function OrgTeamMember({ member, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden h-64">
        <Image
          src={
            member.image ??
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
          }
          alt={member.name}
          width={400}
          height={256}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display font-bold text-white text-lg leading-tight">
            {member.name}
          </h3>
          <p className="text-accent text-sm font-medium mt-0.5">
            {member.designation}
          </p>
        </div>
      </div>
      {member.email && (
        <div className="p-5 border-t border-gray-50">
          <Link
            href={`mailto:${member.email}`}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
          >
            <Mail size={14} />
            {member.email}
          </Link>
        </div>
      )}
    </motion.div>
  );
}
