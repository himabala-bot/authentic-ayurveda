import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router-dom";
import { fadeUp } from "@/lib/animations";
import { treatments } from "@/lib/data";

export default function Treatments() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="treatments"
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 bg-muted overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute top-1/2 left-0 w-40 md:w-72 h-40 md:h-72 rounded-full bg-primary/5 blur-[60px] md:blur-[100px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-32 md:w-56 h-32 md:h-56 rounded-full bg-accent/10 blur-[40px] md:blur-[80px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Featured <span className="text-primary">Treatments</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-medium"
          >
            Each treatment is scientifically designed to address your specific
            health needs through time-tested Ayurvedic methods.
          </motion.p>
        </div>

        {/* Horizontal Marquee Container */}
        <div className="relative w-full overflow-hidden py-10 pause-marquee">
          <div
            className="flex gap-8 animate-marquee"
            style={{ width: "max-content" }}
          >
            {/* Double the top 6 treatments for seamless loop */}
            {[...treatments.slice(0, 6), ...treatments.slice(0, 6)].map((t, i) => (
              <div
                key={`${t.title}-${i}`}
                className="group flex flex-col w-56 sm:w-64 md:w-72 bg-card/40 border border-border/50 rounded-[1.8rem] p-3.5 transition-all duration-300 hover:bg-card/60 hover:shadow-card shrink-0"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-[1.3rem] overflow-hidden mb-4">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-col items-start px-2 pb-1">
                  <h3
                    className="text-base font-medium tracking-[-0.02em] text-foreground leading-snug"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    {t.title}
                  </h3>

                  <Link
                    to="/treatments"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-normal text-[#6A8F3C] transition-all duration-300 hover:opacity-80 group/link"
                  >
                    <span>View all</span>
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section CTA */}
        <motion.div
          variants={fadeUp}
          custom={10}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center mt-12"
        >
          <a
            href="#contact"
            className="px-10 py-4 bg-primary text-primary-foreground font-normal rounded-full
              hover:bg-primary-hover transition-all duration-300 shadow-sm hover:shadow-md
              active:scale-95 text-lg tracking-[-0.02em]"
          >
            Book Appointment
          </a>
        </motion.div>
      </div>
    </section>
  );
}
