import { TestimonialsColumn } from "@/components/ui/TestimonialsColumn";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "I consulted Dr. Dixit for my digestion issues. Within a few weeks of following his diet and medicines, I felt a clear improvement.",
    name: "S. Ramesh Kumar",
  },
  {
    text: "Very calm and patient doctor. He listens properly and explains everything in a simple way.",
    name: "P. Lakshmi Devi",
  },
  {
    text: "I had severe hair fall and tried many treatments before. His Ayurvedic approach actually worked for me.",
    name: "K. Srinivas Rao",
  },
  {
    text: "The medicines are gentle and effective. No side effects like I faced with other treatments.",
    name: "M. Anitha Reddy",
  },
  {
    text: "Dr. Dixit focuses on lifestyle changes along with medicines, which made a big difference in my health.",
    name: "V. Suresh Babu",
  },
  {
    text: "I visited for stress and sleep issues. His treatment helped me relax and sleep better naturally.",
    name: "G. Swathi",
  },
  {
    text: "Good experience overall. The consultation felt unhurried and detailed.",
    name: "N. Praveen Kumar",
  },
  {
    text: "My skin condition improved a lot after following his treatment for a month.",
    name: "T. Harika",
  },
  {
    text: "He doesn't rush into giving too many medicines. Keeps things simple and practical.",
    name: "D. Venkatesh",
  },
  {
    text: "I like how he explains the root cause instead of just treating symptoms.",
    name: "B. Kavya Reddy",
  },
  {
    text: "I went for joint pain, and the relief I got from his treatment was really noticeable.",
    name: "A. Narasimha Rao",
  },
  {
    text: "The clinic is clean and well-managed. Staff is also polite.",
    name: "Y. Meghana",
  },
  {
    text: "Very genuine doctor. Doesn't suggest unnecessary treatments.",
    name: "C. Rajesh Kumar",
  },
  {
    text: "His diet advice was easy to follow and actually suited my daily routine.",
    name: "P. Sirisha",
  },
  {
    text: "I saw gradual but steady improvement in my health, which felt more sustainable.",
    name: "K. Chaitanya",
  },
  {
    text: "Good for chronic issues. I went for acidity and it has reduced significantly.",
    name: "R. Padmaja",
  },
  {
    text: "He gives enough time to each patient, which is rare these days.",
    name: "V. Mahesh",
  },
  {
    text: "I appreciated the natural approach instead of heavy medications.",
    name: "S. Deepika",
  },
  {
    text: "My overall energy levels improved after starting his treatment.",
    name: "G. Naveen Kumar",
  },
  {
    text: "Would definitely recommend him if you're looking for a holistic and long-term solution.",
    name: "L. Anusha",
  },
];

const firstColumn = testimonials.slice(0, 5);
const secondColumn = testimonials.slice(5, 10);
const thirdColumn = testimonials.slice(10, 15);
const fourthColumn = testimonials.slice(15, 20);

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-background py-16 md:py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-40 md:w-80 h-40 md:h-80 rounded-full bg-primary/5 blur-[60px] md:blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 rounded-full bg-accent/10 blur-[40px] md:blur-[80px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] mt-5 text-foreground text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Stories of <span className="text-primary">Transformation</span>
          </h2>
          <p className="text-center mt-5 text-muted-foreground text-base md:text-lg">
            Hear from patients who found lasting wellness through personalized
            Ayurvedic care with Dr. Dixit.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 sm:gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[500px] sm:max-h-[640px] md:max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={16}
          />
          <TestimonialsColumn
            testimonials={fourthColumn}
            className="hidden xl:block"
            duration={20}
          />
        </div>
      </div>
    </section>
  );
}
