import React from "react";
import { motion } from "framer-motion";

/**
 * ScrollReveal Component
 * - Animasi scroll yang elegan dan halus menggunakan Framer Motion.
 * - Default displacement lembut (y: 24), durasi optimal (0.55s), dan easing cubic-bezier premium.
 * - once: true memastikan animasi tidak berulang/flicker saat user scroll bolak-balik.
 * - amount: 0.15 memastikan animasi langsung ter-trigger begitu 15% elemen masuk viewport (tanpa terkesan delay/loading lama).
 */
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.55,
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'none'
  distance = 24,
  once = true,
  amount = 0.15,
  ...props
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = { opacity: 0, ...getInitialOffset() };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Cubic-bezier: smooth start, natural decelerate
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScrollStagger Container
 * - Untuk membungkus daftar card, badge, atau grid sehingga item muncul berurutan (stagger) secara rapi.
 */
export const ScrollStagger = ({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0.04,
  once = true,
  amount = 0.15,
  ...props
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScrollStaggerItem
 * - Item individual di dalam ScrollStagger.
 */
export const ScrollStaggerItem = ({
  children,
  className = "",
  duration = 0.5,
  distance = 20,
  ...props
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

