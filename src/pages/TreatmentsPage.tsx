import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { treatments as allTreatments } from "@/lib/data";
import { WHATSAPP_URL } from "@/components/WhatsAppFloatingButton";

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-8 md:px-12 lg:px-20 pt-20 md:pt-24 pb-8 md:pb-12 max-w-[1440px] mx-auto">
        <div className="relative aspect-auto min-h-[320px] sm:min-h-[380px] md:aspect-[16/7] w-full rounded-3xl md:rounded-[2.5rem] overflow-hidden flex items-center justify-start p-6 sm:p-12 md:p-16 lg:p-24 shadow-card">
          <img 
            src="/images/balance-hero.png" 
            alt="Ayurvedic Healing" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 md:bg-gradient-to-r md:from-black/85 md:via-black/45 md:to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl text-white space-y-4 md:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A Return to Balance:<br className="hidden md:inline" />
              <span className="text-accent">Ancient Ayurvedic Healing</span> for Modern Life
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-medium leading-relaxed max-w-xl"
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
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 max-w-[1440px] mx-auto py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span className="text-primary">Our Treatments</span>
          </h2>
        </div>

        {/* Grid of Treatment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-12">
          {allTreatments.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 bg-muted shadow-sm hover:shadow-hover transition-shadow duration-500">
                <img 
                  src={t.image} 
                  alt={t.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="space-y-1 md:space-y-2 px-1">
                <h3 
                  className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-foreground"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
                  {t.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Link */}
        <div className="mt-12 md:mt-20 flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 md:px-12 md:py-5 bg-primary text-primary-foreground font-normal rounded-full hover:bg-primary-hover transition-all duration-300 shadow-card hover:shadow-hover text-base md:text-lg tracking-[-0.02em]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Book Appointment
          </a>
        </div>
      </section>
    </div>
  );
}
