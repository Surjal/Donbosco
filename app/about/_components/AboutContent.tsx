"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { MissionCard } from "@/components/ui/MissionCard";
import type { TeamMember, AboutStat, JourneyMilestone } from "@/lib/types";
import { Timeline } from "@/components/ui/Timeline";
import Preview from "@/components/ui/Editor";

interface AboutStory {
  content?: string;
  features?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  is_home?: boolean;
  title?: string;
}

interface Props {
  missions: any;
  team: TeamMember[];
  stats: AboutStat[];
  aboutStory?: AboutStory | null; // ✅ allow undefined/null safely
  journey: JourneyMilestone[];
}

export function AboutContent({
  missions,
  team,
  stats,
  aboutStory,
  journey,
}: Props) {
  // ✅ Parse <li> safely using regex (works in both SSR and browser)
  const listItems = useMemo(() => {
    const html = aboutStory?.features ?? "";
    if (!html) return [];

    const matches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) ?? [];
    return matches.map((item) => item.replace(/<\/?li[^>]*>/gi, "").trim());
  }, [aboutStory?.features]);

  // ✅ Optional: show a friendly loading state if aboutStory isn't ready yet
  if (!aboutStory) {
    return (
      <main>
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="text-center text-text-muted">Loading...</div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* ── Story Section ── */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-light-primary/50 to-transparent pointer-events-none" />
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <SectionHeader
                eyebrow="Our Story"
                title="Building a Stronger Industrial Ecosystem"
                description={aboutStory.content || ""}
                descriptionClassName=" px-2"
              />

              <ul className="space-y-3">
                {listItems.map((item, i) => (
                  <motion.li
                    key={i} // ✅ key added
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="flex-shrink-0 mr-2 text-accent"
                    />
                    <Preview value={item} />
                  </motion.li>
                ))}

                {/* ✅ In case features has no <li> */}
                {listItems.length === 0 && (
                  <li className="text-sm text-text-muted px-4">
                    {/* optional fallback message */}
                  </li>
                )}
              </ul>

              <Link
                href="#team"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-xl transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
              >
                Meet Our Team
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {/* Image grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden group rounded-2xl shadow-lg">
                  <Image
                    src={
                      aboutStory.image_1 ||
                      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
                    }
                    width={400}
                    height={200}
                    className="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-110"
                    alt="CNI Office"
                  />
                </div>

                <div className="overflow-hidden group rounded-2xl shadow-lg">
                  <Image
                    src={
                      aboutStory.image_2 ||
                      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80"
                    }
                    width={400}
                    height={224}
                    className="object-cover w-full h-56 transition-transform duration-700 group-hover:scale-110"
                    alt="Team collaboration"
                  />
                </div>
              </div>

              <div className="overflow-hidden group rounded-2xl shadow-lg">
                <Image
                  src={
                    aboutStory.image_3 ||
                    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80"
                  }
                  width={400}
                  height={500}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  alt="Industry"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Band ── */}
      {/* <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-evenly flex-wrap gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-center"
              >
                <p className="font-display text-3xl lg:text-4xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-white/60 font-medium tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── Mission Section ── */}
      <section id="mission" className="py-20 lg:py-28 bg-light-primary">
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Stand For"
            title="Our Mission & Values"
            description="Three pillars that guide everything we do at Don Bosco."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {missions?.data?.map((m: any, i: number) => (
              <MissionCard key={m.id ?? i} mission={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Journey Section ── */}
      <section id="journey" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Story"
            title="Our Journey"
            description="Key milestones in Don Bosco's growth and development"
          />
          <Timeline data={journey} />
        </div>
      </section>

      {/* ── Team Section ── */}
      <section id="team" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <SectionHeader
              eyebrow="Our Staff"
              title="Staffs"
              description="The dedicated leaders steering Don Bosco forward."
            />
            <Link
              href="/about/team"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-xl transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 mb-14"
            >
              View Full Team
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.slice(0, 3).map((member, i) => (
              <motion.div
                key={member.id ?? i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
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

                {member.bio && (
                  <div className="p-5 border-t border-gray-50">
                    <div className="text-sm text-text-muted leading-relaxed px-4">
                      <Preview
                        value={
                          member.bio.length > 20
                            ? member.bio.substring(0, 170) + ""
                            : member.bio
                        }
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
