import type { Variants, BezierDefinition } from "motion/react";

const easeCustom: BezierDefinition = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: easeCustom,
    },
  }),
};

export const transitionSmooth = {
  duration: 0.7,
  ease: easeCustom,
};
