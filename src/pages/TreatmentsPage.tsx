import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { treatments as allTreatments } from "@/lib/data";

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-12 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <div className="relative aspect-[16/7] w-full rounded-[2.5rem] overflow-hidden flex items-center justify-start p-8 md:p-16 lg:p-24 shadow-card">
          <img 
            src="/images/balance-hero.png" 
            alt="Ayurvedic Healing" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl text-white space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A Return to Balance:<br />
              <span className="text-accent">Ancient Ayurvedic Healing</span> for Modern Life
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-xl"
            >
              You don’t need complicated treatments to heal. Through personalized Ayurvedic care, we focus on restoring balance, improving lifestyle, and supporting your body’s natural ability to heal.
            </motion.p>
          </div>
          
          <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center size-16 rounded-full border border-white/20 hover:bg-white/10 transition-colors cursor-pointer">
            <ArrowRight className="size-8 text-white" />
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto py-12">
        <div className="mb-12">
          <h2 
            className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span className="text-primary">Our Treatments</span>
          </h2>
        </div>

        {/* Grid of Treatment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {allTreatments.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-muted shadow-sm hover:shadow-hover transition-shadow duration-500">
                <img 
                  src={t.image} 
                  alt={t.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="space-y-2 px-1">
                <h3 
                  className="text-2xl font-semibold tracking-[-0.02em] text-foreground"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.title}
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {t.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Link */}
        <div className="mt-20 flex justify-center">
          <Link
            to="/#contact"
            className="px-12 py-5 bg-primary text-primary-foreground font-normal rounded-full hover:bg-primary-hover transition-all duration-300 shadow-card hover:shadow-hover text-lg tracking-[-0.02em]"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
