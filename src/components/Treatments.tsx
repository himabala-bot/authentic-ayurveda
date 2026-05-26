import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router-dom";
import { fadeUp } from "@/lib/animations";
import { treatments } from "@/lib/data";
import { WHATSAPP_URL } from "@/components/WhatsAppFloatingButton";

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
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-normal rounded-full
              hover:bg-primary-hover transition-all duration-300 shadow-sm hover:shadow-md
              active:scale-95 text-lg tracking-[-0.02em]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Book Appointment
          </a>
        </motion.div>
      </div>
    </section>
  );
}
