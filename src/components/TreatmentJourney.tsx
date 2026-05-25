import { motion } from "motion/react";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import { Check, LoaderCircleIcon } from 'lucide-react';

const steps = [
  {
    title: 'Consultation',
    description: 'Understanding your health concerns in detail through a focused, one-on-one session.'
  },
  {
    title: 'Diagnosis',
    description: 'Identifying your body constitution and underlying imbalances.'
  },
  {
    title: 'Personalized Treatment',
    description: 'Detox therapies, Safe and Effective Ayurveda Medicines,  Lifestyle regulation and Disease Specific Diet'
  },
  {
    title: 'Follow-Up & Care',
    description: 'Monitoring progress and refining the approach for lasting results.'
  }
];

export default function TreatmentJourney() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-1/2 right-1/4 w-40 md:w-72 h-40 md:h-72 rounded-full bg-primary/5 blur-[60px] md:blur-[100px] -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-foreground mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Treatment <span className="text-primary">Journey</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-medium">
            A comprehensive, patient-centered approach designed to guide you toward optimal well-being.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-card w-full max-w-3xl mx-auto h-[400px] sm:h-[360px] flex flex-col"
        >
          <Stepper
            defaultValue={1}
            indicators={{
              completed: <Check className="w-4 h-4" />,
              loading: <LoaderCircleIcon className="w-4 h-4 animate-spin" />,
            }}
            className="flex flex-col h-full justify-between space-y-6"
          >
            <StepperNav className="flex flex-row w-full justify-between items-center gap-0 overflow-visible">
              {steps.map((_, index) => (
                <StepperItem key={index} step={index + 1} className="relative flex-1">
                  <StepperTrigger className="flex flex-col justify-center items-center gap-1 sm:gap-2 p-2 rounded-xl group/trigger w-full">
                    <StepperIndicator className="w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base group-aria-selected/trigger:shadow-lg group-aria-selected/trigger:scale-110 transition-all duration-300">
                      {index + 1}
                    </StepperIndicator>
                    <StepperTitle className="hidden sm:block text-center mt-2 text-sm">
                      {steps[index].title}
                    </StepperTitle>
                  </StepperTrigger>

                  {steps.length > index + 1 && (
                    <StepperSeparator className="absolute top-[24px] sm:top-[28px] left-[calc(50%+16px)] sm:left-[calc(50%+20px)] w-[calc(100%-32px)] sm:w-[calc(100%-40px)] h-0.5 mx-0 bg-muted group-data-[state=completed]/step:bg-primary transition-all duration-300" />
                  )}
                </StepperItem>
              ))}
            </StepperNav>

            <StepperPanel className="pt-6 border-t border-border/50 flex-1 flex flex-col justify-center">
              {steps.map((step, index) => (
                <StepperContent
                  key={index}
                  value={index + 1}
                  className="flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  <h3
                    className="text-2xl md:text-3xl font-semibold text-primary mb-4"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">
                    {step.description}
                  </p>
                </StepperContent>
              ))}
            </StepperPanel>
          </Stepper>
        </motion.div>
      </div>
    </section>
  );
}
