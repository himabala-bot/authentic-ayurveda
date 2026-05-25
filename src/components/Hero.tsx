import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { transitionSmooth } from "@/lib/animations";

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
            href="#treatments"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-primary text-primary-foreground font-normal rounded-full
              hover:bg-primary-hover transition-all duration-300 shadow-card hover:shadow-hover active:scale-95 text-base sm:text-lg"
          >
            Explore Treatments
          </a>
          <a
            href="#about"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-secondary/50 backdrop-blur-md text-secondary-foreground font-normal rounded-full
              hover:bg-primary/10 transition-all duration-300 active:scale-95
              border border-border text-base sm:text-lg"
          >
            Learn More
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
