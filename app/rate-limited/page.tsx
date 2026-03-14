"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RateLimitedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-16 bg-white overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.2,
          }}
          className="mx-auto w-24 h-24 sm:w-32 sm:h-32 bg-amber-100 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-amber-200/50"
        >
          <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500" />
        </motion.div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Too Many Requests
        </h1>

        <p className="text-lg sm:text-xl text-text-muted mb-8 leading-relaxed max-w-xl mx-auto px-4">
          Whoa there! It looks like you're tapping things a bit too fast. We've temporarily paused requests from your device to keep the system running smoothly for everyone.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 max-w-md mx-auto shadow-sm">
          <p className="text-amber-800 font-medium mb-2 flex items-center justify-center gap-2">
            <RefreshCw className={`w-5 h-5 ${countdown > 0 && "animate-spin-slow"}`} />
            Please wait before trying again
          </p>
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-amber-600 font-mono">
            <span>00</span>
            <span className="animate-pulse">:</span>
            <span>{countdown.toString().padStart(2, "0")}</span>
          </div>
          <p className="text-amber-600/70 text-sm mt-3">
            Estimated time until cooldown clears
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.back()}
            disabled={countdown > 0}
            className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
              countdown > 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
            }`}
          >
            <RefreshCw className={`w-5 h-5 ${countdown <= 0 && "group-hover:rotate-180 transition-transform duration-500"}`} />
            Try Again Now
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
