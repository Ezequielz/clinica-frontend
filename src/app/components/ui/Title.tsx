"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

interface Props {
  title: string;
  className?: string;
  colorTitle?: string;
  colorLine?: string
}

export const Title = ({ title, className, colorLine = 'bg-purple-500', colorTitle = 'text-cyan-500' }: Props) => {
  return (
    <div className="">
      {/* Título con animación */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={clsx(
          "font-bold",
          colorTitle,
          className?.includes("text-") ? className : `text-3xl md:text-4xl ${className}`
        )}
        
      >
        {title}
      </motion.h1>

      {/* Línea decorativa animada */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`h-1 w-12 ${colorLine} mt-2 origin-left`}
      />
    </div>
  );
};
