import React from "react";
import { motion } from "framer-motion";

export default function SkeletonLoader() {
  const skeletonAnimate = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex h-screen w-full bg-black text-gray-600">
      {/* Sidebar Skeleton */}
      {/* <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.1 }}
        variants={skeletonAnimate}
        className="w-1/4 h-full p-6 bg-black border-r border-gray-800 flex flex-col gap-4"
      >
        <div className="h-10 bg-gray-900 rounded-lg skeleton-animate"></div>
        <div className="h-6 bg-gray-900 rounded-lg skeleton-animate"></div>
        <div className="h-6 bg-gray-900 rounded-lg skeleton-animate"></div>
        <div className="h-6 bg-gray-900 rounded-lg skeleton-animate"></div>
        <div className="h-6 bg-gray-900 rounded-lg skeleton-animate"></div>
      </motion.div> */}

      {/* Main Feed Skeleton */}
      <div className="flex-1 p-6 overflow-y-scroll">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={skeletonAnimate}
          className="p-4 max-w-2xl mx-auto border border-gray-800 rounded-lg mb-6"
        >
          {/* Header Skeleton */}
          <div className="flex gap-4 items-center mb-6">
            <div className="rounded-full bg-gray-900 w-14 h-14 skeleton-animate"></div>
            <div className="flex flex-col gap-2">
              <div className="w-24 h-5 rounded-lg bg-gray-900 skeleton-animate"></div>
              <div className="w-16 h-4 rounded-lg bg-gray-800 skeleton-animate"></div>
            </div>
          </div>

          {/* Post Skeleton */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.2 * i }}
              variants={skeletonAnimate}
              className="p-4 border border-gray-800 rounded-lg mb-6 flex flex-col gap-4"
            >
              <div className="w-full h-5 rounded-lg bg-gray-900 skeleton-animate"></div>
              <div className="w-5/6 h-5 rounded-lg bg-gray-900 skeleton-animate"></div>
              <div className="w-4/6 h-5 rounded-lg bg-gray-900 skeleton-animate"></div>

              <div className="flex items-center mt-2 gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-900 skeleton-animate"></div>
                <div className="w-8 h-8 rounded-full bg-gray-900 skeleton-animate"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
