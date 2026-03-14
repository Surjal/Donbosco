"use client";

import { motion } from "framer-motion";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  text?: string;
}

export const Loading = ({
  className = "",
  size = "md",
  variant = "spinner",
  text,
}: LoadingProps) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-4 h-4",
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {variant === "spinner" && (
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-primary border-t-transparent`}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      )}

      {variant === "dots" && (
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`${dotSizeClasses[size]} rounded-full bg-primary`}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {variant === "pulse" && (
        <motion.div
          className={`${sizeClasses[size]} rounded-lg bg-primary/20`}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {text && (
        <motion.p
          className="text-sm font-medium text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loading;
