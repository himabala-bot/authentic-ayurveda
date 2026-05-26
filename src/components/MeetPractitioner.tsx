import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { fadeUp } from "@/lib/animations";

export default function MeetPractitioner() {
  const bulletPoints = [
    "Prakriti based Personalised care (Chikitsa)",
    "Proper Diagnosis (Nidaan) for better outcomes",
    "Authentic Ayurvedic medicines and therapies",
    "Disease and Ritu based Diet and Lifestyle",
    "Consistent Follow up and support for better outcomes",
    "Practical lifestyle guidance",
  ];

  return (
    <section
      id="about"
      className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden"
    >
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
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-foreground mb-4 sm:mb-6 leading-[1.15] flex flex-wrap items-baseline gap-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              <span>
                Dr. M P Dixit
              </span>

              <span className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                B.Sc, B.A.M.S.
              </span>

              <span className="w-full text-primary">
                Hyderabad, India.
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#4b5c46] font-medium">
              I am{" "}
              <span className="font-bold text-foreground">
                Dr. M P Dixit
              </span>
              , practising Ayurveda for over
              <span className="font-semibold text-foreground">
                {" "}25 years{" "}
              </span>
              in Hyderabad, India.

              Having graduated in Ayurveda and Life Sciences, my endeavour is to enhance
              healing through the blend of
              <span className="italic"> ancient wisdom </span>
              and modern understanding, identifying the
              <span className="font-semibold text-foreground">
                {" "}root cause{" "}
              </span>
              of disease and offering personalised Ayurvedic treatments, including
              <span className="italic font-semibold text-foreground">
                {" "}Shamana Chikitsa{" "}
              </span>
              and
              <span className="italic font-semibold text-foreground">
                {" "}Shodhana Chikitsa (Panchakarma)
              </span>.
            </p> <p className="mt-5 mb-2 text-base sm:text-lg text-[#4b5c46] font-medium"></p>

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