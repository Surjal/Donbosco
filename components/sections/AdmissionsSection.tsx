"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, FileText, BadgeCheck } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "All Levels",
    description: "ECE through Secondary (Grade 10)",
  },
  {
    icon: FileText,
    title: "Simple Process",
    description: "4 easy steps from form to enrollment",
  },
  {
    icon: BadgeCheck,
    title: "Quality Education",
    description: "Rooted in Salesian values & excellence",
  },
];

export function AdmissionsSection() {
  return (
    <section className="py-20 bg-primary-dark text-white relative overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
          className="w-full h-full"
        />
      </div>

      {/* Decorative accent blob */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary-light/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold tracking-wider uppercase mb-5">
              Enrollments Open
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-5">
              Begin Your Journey <br />
              <span className="text-accent">at Don Bosco</span>
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-8">
              We welcome students who are ready to grow academically, morally,
              and socially. Join a community built on faith, reason, and loving
              kindness.
            </p>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/25"
            >
              Learn About Admissions <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={22} className="text-accent" />
                </div>
                <div>
                  <p className="font-bold text-white">{item.title}</p>
                  <p className="text-white/55 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
