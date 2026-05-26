import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { transitionSmooth } from "@/lib/animations";

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
        <Link
          to="/#contact"
          onClick={() => handleNavClick("/#contact")}
          className="inline-flex items-center px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-normal rounded-full
            bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-300
            shadow-sm hover:shadow-md tracking-[-0.02em]"
        >
          <span className="md:hidden">Book</span>
          <span className="hidden md:inline">Book Appointment</span>
        </Link>
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
