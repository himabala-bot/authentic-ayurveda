import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { transitionSmooth } from "@/lib/animations";
import { WHATSAPP_URL } from "./WhatsAppFloatingButton";

const ScrollingRow = ({
  images,
  direction = "left",
  speed = 40,
}: {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const displayImages = [...images, ...images, ...images];

  return (
    <div className="flex overflow-hidden w-full py-2 md:py-4">
      <motion.div
        className="flex gap-4 md:gap-6 whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {displayImages.map((src, index) => (
          <div
            key={index}
            className="relative w-44 h-56 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 rounded-2xl overflow-hidden shadow-card flex-shrink-0"
          >
            <img
              src={src}
              alt="Ayurveda Aesthetic"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const row1Images = [
    "/images/treatments/hormonal.png",
    "/images/treatments/rejuvenation.png",
    "/images/treatments/immunity.png",
  ];
  const row2Images = [
    "/images/treatments/stress-lifestyle.png",
    "/images/treatments/digestive.png",
    "/images/treatments/sleep-stress.png",
  ];

  return (
    <div
      id="home"
      ref={containerRef}
      className={cn(
        "relative w-full min-h-screen flex flex-col lg:flex-row items-center overflow-hidden",
        "bg-background pt-20 lg:pt-0"
      )}
    >
      {/* Lightweight static grid pattern — no per-frame animation on mobile */}
      {!isMobile && (
        <div
          className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}

      {/* Hero Content Left */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12 md:py-20 lg:py-0 text-left space-y-6 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transitionSmooth}
          className="space-y-4 md:space-y-6"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-6xl font-semibold tracking-[-0.02em] text-foreground leading-[1.1]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Heal Naturally,
            <br />
            <span className="bg-gradient-to-r from-primary via-chart-2 to-primary-light bg-clip-text text-transparent">
              Live Better
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-sans">
            Through scientific Ayurvedic medical care that is safe, effective, and suitable for all age groups and health conditions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSmooth, delay: 0.3 }}
          className="flex flex-wrap gap-3 md:gap-5"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-primary text-primary-foreground font-normal rounded-full
              hover:bg-primary-hover transition-all duration-300 shadow-card hover:shadow-hover active:scale-95 text-base sm:text-lg flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Book Consultation
          </a>
          <a
            href="#treatments"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-secondary/50 backdrop-blur-md text-secondary-foreground font-normal rounded-full
              hover:bg-primary/10 transition-all duration-300 active:scale-95
              border border-border text-base sm:text-lg"
          >
            Explore Treatments
          </a>
        </motion.div>
      </div>

      {/* Hero Visuals Right */}
      <div className="relative w-full lg:w-1/2 h-full lg:h-screen flex flex-col justify-center space-y-2 md:space-y-4 overflow-hidden py-6 md:py-10 lg:py-0">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <ScrollingRow images={row1Images} direction="left" speed={isMobile ? 50 : 30} />
        <ScrollingRow images={row2Images} direction="right" speed={isMobile ? 55 : 35} />

        {/* Floating Accent Blobs — smaller on mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10 blur-[60px] md:blur-[100px] opacity-20">
          <div className="absolute top-0 right-0 w-40 md:w-72 h-40 md:h-72 bg-primary rounded-full" />
          <div className="absolute bottom-0 left-0 w-40 md:w-72 h-40 md:h-72 bg-accent rounded-full" />
        </div>
      </div>
    </div>
  );
}
