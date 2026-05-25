import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const currentPath = pathname + hash;
    setActiveLink(currentPath === "/" ? "/" : currentPath);
  }, [pathname, hash]);

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transitionSmooth}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between
          px-3 sm:px-6 h-[60px] rounded-full transition-all duration-500 max-w-3xl w-[calc(100%-2rem)]
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
          className="text-lg font-semibold tracking-[-0.02em] text-primary whitespace-nowrap"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          ✦ Āyurveda
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
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

        {/* CTA */}
        <Link
          to="/#contact"
          className="hidden md:inline-flex items-center px-5 py-2 text-sm font-normal rounded-full
            bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-300
            shadow-sm hover:shadow-md tracking-[-0.02em]"
        >
          Book Appointment
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-foreground rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-0.5 bg-foreground rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-foreground rounded-full"
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm
              rounded-2xl bg-background/90 backdrop-blur-2xl border border-border
              shadow-[var(--shadow-card)] p-6 flex flex-col gap-3 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${
                    activeLink === link.href || (link.href === "/" && activeLink === "")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-5 py-2.5 text-center text-sm font-normal rounded-full
                bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
            >
              Book Appointment
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
