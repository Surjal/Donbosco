import { motion } from "framer-motion";
import Preview from "./Editor";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  descriptionClassName,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-14 space-y-3"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-[2px] bg-accent" />
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <div className={descriptionClassName}>
          <Preview value={description} />
        </div>
      )}
    </motion.div>
  );
}
