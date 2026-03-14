"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { HomeArrayMission, Mission } from "@/lib/types";
import Preview from "../ui/Editor";

type Props = {
  homeMissions: HomeArrayMission;
};
export function MissionSection({ homeMissions }: Props) {


  return (
    <section
      id="mission"
      className="py-20 lg:py-28 bg-light-primary relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a3a5c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-0.5 bg-accent" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
                  What We Stand For
                </span>
              </div>
              <h2 className="mb-6 font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                Our Mission
              </h2>
              <div className="text-justify leading-relaxed text-gray-600 mb-8">
                <Preview value={homeMissions?.data?.content as string} />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-text-muted">
                  <span className="font-semibold text-primary">500+</span>{" "}
                  Parents Trust Us with Their Children's Future
                </p>
              </div>
            </motion.div>

            {/* Image Collage */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden group rounded-2xl shadow-lg">
                  <Image
                    src={
                      homeMissions?.data?.image_1 ||
                      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
                    }
                    width={400}
                    height={192}
                    className="object-cover w-full h-36 sm:h-44 md:h-48 transition-transform duration-700 ease-out group-hover:scale-110"
                    alt="Office"
                  />
                </div>
                <div className="overflow-hidden group rounded-2xl shadow-lg">
                  <Image
                    src={
                      homeMissions?.data?.image_2 ||
                      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80"
                    }
                    width={400}
                    height={224}
                    className="object-cover w-full h-44 sm:h-52 md:h-56 transition-transform duration-700 ease-out group-hover:scale-110"
                    alt="Team"
                  />
                </div>
              </div>
              <div className="overflow-hidden group rounded-2xl shadow-lg mt-2 mb-2 sm:mt-4 sm:mb-4 min-h-[200px] sm:min-h-[300px]">
                <Image
                  src={
                    homeMissions?.data?.image_3 ||
                    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80"
                  }
                  width={400}
                  height={500}
                  className="object-cover w-full h-full min-h-[200px] sm:min-h-[300px] transition-transform duration-700 ease-out group-hover:scale-110"
                  alt="Industry"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
