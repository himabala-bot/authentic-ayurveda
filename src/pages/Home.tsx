import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MeetPractitioner from "@/components/MeetPractitioner";
import ConditionsTreated from "@/components/ConditionsTreated";
import Treatments from "@/components/Treatments";
import Testimonials from "@/components/Testimonials";
import TreatmentJourney from "@/components/TreatmentJourney";
import Contact from "@/components/Contact";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <MeetPractitioner />
      <ConditionsTreated />
      <Treatments />
      <Testimonials />
      <TreatmentJourney />
      <Contact />
    </>
  );
}
