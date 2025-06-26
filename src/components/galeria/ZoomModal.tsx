"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ZoomModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src={src}
            alt="Zoom"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
