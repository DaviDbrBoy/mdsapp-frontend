"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-extrabold text-blue-500 tracking-wider"
          >
            Mds App
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
