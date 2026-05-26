import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { transitionSmooth } from "@/lib/animations";
import { WHATSAPP_URL } from "./WhatsAppFloatingButton";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Conditions", href: "/#conditions" },
  { label: "Treatments", href: "/treatments" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for Scroll Spy on Home Page
  useEffect(() => {
    if (pathname !== "/") {
      setActiveLink("/treatments");
      return;
    }

    // Set initial link based on current hash
    if (hash) {
      setActiveLink(`/${hash}`);
    } else {
      setActiveLink("/");
    }

    const sections = ["home", "about", "conditions", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // Trigger when section occupies the active view area
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveLink(id === "home" ? "/" : `/#${id}`);
          }
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname, hash]);

  // Handle smooth scroll clicks for links targeting the current page
  const handleNavClick = (href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href === "/" && pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Header Navbar */}
      <motion.nav
        id="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transitionSmooth}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between
          px-4 sm:px-6 h-[60px] rounded-full transition-all duration-500 max-w-3xl w-[calc(100%-2rem)]
          ${
            scrolled
              ? "bg-background/75 shadow-[var(--shadow-navbar)] border border-border"
              : "bg-background/50 border border-transparent"
          }
          backdrop-blur-xl`}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => handleNavClick("/")}
          className="text-lg font-semibold tracking-[-0.02em] text-primary whitespace-nowrap"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          ✦ Āyurveda
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300
                ${
                  activeLink === link.href || (link.href === "/" && activeLink === "")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
            >
              {(activeLink === link.href || (link.href === "/" && activeLink === "")) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Book Appointment CTA (Responsive text size/copy) */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-normal rounded-full
            bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-300
            shadow-sm hover:shadow-md tracking-[-0.02em] gap-1.5"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span className="md:hidden">Book</span>
          <span className="hidden md:inline">Book Appointment</span>
        </a>
      </motion.nav>

      {/* Mobile Sticky Floating Capsule Navbar (Bottom Navigation Dock) */}
      <div
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
          w-[calc(100%-2rem)] max-w-[420px] h-[56px] rounded-full 
          bg-[#0d0f0d]/95 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] 
          backdrop-blur-md flex items-center justify-around px-2"
      >
        {navLinks.map((link) => {
          const isActive = activeLink === link.href || (link.href === "/" && activeLink === "");
          
          // Custom mobile labels to prevent overlapping: Conditions -> ISSUES, Treatments -> CARE
          const displayLabel = link.label === "Conditions" 
            ? "ISSUES" 
            : link.label === "Treatments" 
              ? "CARE" 
              : link.label.toUpperCase();

          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="relative flex-1 flex flex-col items-center justify-center h-full text-center py-1 px-0.5 select-none"
            >
              {/* Active indicator bar at top of capsule matching attached reference */}
              {isActive && (
                <motion.div
                  layoutId="activeGlowLine"
                  className="absolute top-0 left-2 right-2 h-[3px] bg-white rounded-full shadow-[0_0_8px_#fff,0_0_15px_rgba(255,255,255,0.7)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`text-[10px] xs:text-[11px] font-bold tracking-normal uppercase transition-colors duration-300 relative z-10
                  ${isActive ? "text-white" : "text-neutral-400 hover:text-white"}`}
              >
                {displayLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
