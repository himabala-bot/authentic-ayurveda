import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { fadeUp } from "@/lib/animations";

export default function MeetPractitioner() {
  const bulletPoints = [
    "Personalized one-on-one care",
    "Root-cause based treatment approach",
    "Traditional Ayurvedic methods",
    "Practical lifestyle guidance",
    "Consistent follow-up and support",
    "Focus on long-term results",
  ];

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-full h-full relative max-w-md lg:max-w-[460px] mx-auto lg:mx-0 lg:ml-auto"
          >
            <div className="aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-card">
              <img
                src="/images/practitioner.jpg"
                alt="Ayurvedic Practitioner"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative background element behind image */}
            <div className="absolute -bottom-6 -left-6 w-full h-full rounded-[2rem] border-2 border-primary/20 -z-10 hidden sm:block" />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            {/* Small Tag */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-border bg-card w-fit mb-8 shadow-sm">
              <span className="text-xs font-bold tracking-wider text-primary uppercase">
                About The Practitioner
              </span>
            </div>

            {/* Main Heading */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-foreground mb-4 sm:mb-6 leading-[1.15]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Dr. M P Dixit <br />
              <span className="text-primary">Khairatabad, Hyderabad.</span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed font-medium">
              I’m <span className="font-bold">Dr. M P Dixit</span>, an Ayurvedic doctor in Hyderabad with a background in <span className="italic">BAMS</span>.
              <br />

              I focus on identifying the root cause of health concerns and offering simple, personalized treatments based on <span className="font-bold italic">Ayurvedic principles</span>.
              <br />

              I guide patients toward long-term wellness through diet, lifestyle, and natural therapies.
              <br />

              Consultations are available at <span className="font-bold "> Kottakkal Arya Vaidyasala.</span>
            </p>
            {/* Bullet Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium text-sm md:text-base">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
