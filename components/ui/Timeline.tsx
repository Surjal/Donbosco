"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  date: string;
  title: string;
  description: string;
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["5%", "40%"], // Start animation when section enters viewport, end when section exits
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative max-w-5xl mx-auto pb-20 px-4">
        {data.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative flex items-center justify-center mb-16 md:mb-20"
            >
              {/* Desktop Layout */}
              <div className="hidden md:flex w-full items-center">
                {isLeft ? (
                  <>
                    {/* Left Content */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-5/12 text-right pr-8"
                    >
                      <p className="text-sm md:text-base text-primary font-semibold mb-2">
                        {item.date}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>

                    {/* Center Dot */}
                    <div className="w-2/12 flex justify-center relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="w-5 h-5 rounded-full bg-primary border-4 border-white shadow-lg"
                      />
                    </div>

                    {/* Right Empty Space */}
                    <div className="w-5/12"></div>
                  </>
                ) : (
                  <>
                    {/* Left Empty Space */}
                    <div className="w-5/12"></div>

                    {/* Center Dot */}
                    <div className="w-2/12 flex justify-center relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="w-5 h-5 rounded-full bg-primary border-4 border-white shadow-lg"
                      />
                    </div>

                    {/* Right Content */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-5/12 text-left pl-8"
                    >
                      <p className="text-sm md:text-base text-primary font-semibold mb-2">
                        {item.date}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Mobile Layout - All Items on Right */}
              <div className="flex md:hidden w-full items-start">
                {/* Left: Dot */}
                <div className="flex flex-col items-center mr-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="w-4 h-4 rounded-full bg-accent border-2 border-white shadow-lg relative z-10"
                  />
                </div>

                {/* Right: Content */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1"
                >
                  <p className="text-xs text-primary font-semibold mb-1">
                    {item.date}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </div>
          );
        })}

        {/* Animated Vertical Line - Desktop (CONTAINED within timeline) */}
        <div
          style={{
            height: height + "px",
          }}
          className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[3px] bg-primary-light/30"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-primary via-primary-light to-primary"
          />
        </div>

        {/* Animated Vertical Line - Mobile (CONTAINED within timeline) */}
        <div
          style={{
            height: height + "px",
          }}
          className="block md:hidden absolute left-[9px] top-0 w-[3px] bg-primary-light/30"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-b from-primary via-primary-light to-primary"
          />
        </div>
      </div>
    </div>
  );
}
