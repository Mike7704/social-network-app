"use client";
import { motion } from "framer-motion";

export default function AnimateIn({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 400 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
      {children}
    </motion.div>
  );
}
