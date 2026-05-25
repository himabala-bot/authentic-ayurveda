import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp } from "@/lib/animations";

const stats = [
  { value: "25+", label: "Years of Clinical Experience" },
  { value: "25+", label: "Health Conditions Managed" },
  { value: "10+", label: "Years of Clinical Research Experience" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="tradition"
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-40 md:w-80 h-40 md:h-80 rounded-full bg-primary/5 blur-[60px] md:blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 rounded-full bg-accent/10 blur-[40px] md:blur-[80px] translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div className="space-y-6">
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-foreground leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Rooted in Ancient
              <br />
              <span className="text-primary">Medical Science of Ayurveda.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-muted-foreground leading-relaxed text-base md:text-lg"
            >
              For over five millennia, Ayurveda has offered profound insights
              into the harmony between body, mind, and spirit. Our practice
              honors these time-tested principles while integrating them with
              contemporary wellness science.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-muted-foreground leading-relaxed text-base md:text-lg"
            >
              We believe that true healing begins with understanding your
              unique constitution. Through personalized consultations,
              therapeutic treatments, and mindful living guidance, we empower
              you to reclaim vibrant health — naturally.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div
                    className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-primary"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual card */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden bg-card border border-border
                shadow-[var(--shadow-card)] flex flex-col h-full"
            >
              {/* Vibrant Header Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <img
                  src="/images/about-vibrant.png"
                  alt="Vibrant Ayurvedic Tradition"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent" />
              </div>

              {/* Proverb Content */}
              <div className="flex-1 p-8 flex flex-col justify-center bg-card">
                <p
                  className="text-lg md:text-xl text-foreground italic leading-relaxed font-medium"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  "When diet is wrong, medicine is of no use. When diet is
                  correct, medicine is of no need."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px w-8 bg-primary/30" />
                  <p className="text-sm text-primary font-medium tracking-wide">
                    Ancient Ayurvedic principle
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
