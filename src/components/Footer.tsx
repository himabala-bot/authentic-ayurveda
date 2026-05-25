import { motion } from "motion/react";

const footerLinks = {
  Explore: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Treatments", href: "#treatments" },
    { label: "Contact", href: "#contact" },
  ],
  Services: [
    { label: "Panchakarma", href: "#treatments" },
    { label: "Herbal Care", href: "#treatments" },
    { label: "Massage Therapy", href: "#treatments" },
    { label: "Yoga & Pranayama", href: "#treatments" },
  ],
  Connect: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[var(--footer-bg)] text-[var(--footer-text)] pt-20 pb-8 overflow-hidden">
      {/* Top gradient edge */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Decorative blur */}
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <motion.a
              href="#home"
              className="text-xl font-semibold tracking-[-0.02em] text-[var(--footer-heading)]"
              style={{ fontFamily: "var(--font-serif)" }}
              whileHover={{ scale: 1.02 }}
            >
              ✦ Āyurveda
            </motion.a>
            <p className="text-sm text-[var(--footer-text)] leading-relaxed max-w-xs">
              Restoring balance through ancient wisdom. Experience holistic
              wellness rooted in 5,000 years of Ayurvedic tradition.
            </p>
            <div className="flex gap-3 pt-2">
              {["𝕏", "ⓕ", "▶", "📷"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10
                    flex items-center justify-center text-xs hover:bg-primary/20
                    hover:border-primary/30 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-[var(--footer-heading)] mb-4 tracking-wide">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--footer-text)] hover:text-white
                        transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--footer-text)]">
            © {new Date().getFullYear()} Authentic Āyurveda. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-[var(--footer-text)] hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-[var(--footer-text)] hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
