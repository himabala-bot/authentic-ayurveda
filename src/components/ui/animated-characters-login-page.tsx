"use client";

import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Sparkles, User, Phone, MessageSquare } from "lucide-react";

// ─── Shared mouse context to avoid duplicate listeners ───────────────
const MouseContext = createContext({ x: 0, y: 0 });

function MouseProvider({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Throttle mousemove to ~30fps instead of every event
    let frame: number;
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <MouseContext.Provider value={pos}>{children}</MouseContext.Provider>;
}

// ─── Pupil (simple dot) ──────────────────────────────────────────────
interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY,
}: PupilProps) => {
  const mouse = useContext(MouseContext);
  const pupilRef = useRef<HTMLDivElement>(null);

  const calc = useCallback(() => {
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    if (!pupilRef.current) return { x: 0, y: 0 };
    const r = pupilRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const d = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const a = Math.atan2(dy, dx);
    return { x: Math.cos(a) * d, y: Math.sin(a) * d };
  }, [mouse.x, mouse.y, forceLookX, forceLookY, maxDistance]);

  const p = calc();

  return (
    <div
      ref={pupilRef}
      className="rounded-full will-change-transform"
      style={{
        width: size,
        height: size,
        backgroundColor: pupilColor,
        transform: `translate3d(${p.x}px,${p.y}px,0)`,
        transition: "transform 0.15s ease-out",
      }}
    />
  );
};

// ─── EyeBall (white circle + pupil) ──────────────────────────────────
interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const mouse = useContext(MouseContext);
  const eyeRef = useRef<HTMLDivElement>(null);

  const calc = useCallback(() => {
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    if (!eyeRef.current) return { x: 0, y: 0 };
    const r = eyeRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const d = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const a = Math.atan2(dy, dx);
    return { x: Math.cos(a) * d, y: Math.sin(a) * d };
  }, [mouse.x, mouse.y, forceLookX, forceLookY, maxDistance]);

  const p = calc();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: isBlinking ? 2 : size,
        backgroundColor: eyeColor,
        overflow: "hidden",
        transition: "height 0.1s ease-out",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full will-change-transform"
          style={{
            width: pupilSize,
            height: pupilSize,
            backgroundColor: pupilColor,
            transform: `translate3d(${p.x}px,${p.y}px,0)`,
            transition: "transform 0.15s ease-out",
          }}
        />
      )}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────
export function ContactUsComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [therapy, setTherapy] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  // Single throttled mousemove for body calculations
  useEffect(() => {
    let frame: number;
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Blinking effects
  useEffect(() => {
    const getInterval = () => Math.random() * 4000 + 3000;
    const schedule = () => {
      const t = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => { setIsPurpleBlinking(false); schedule(); }, 150);
      }, getInterval());
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const getInterval = () => Math.random() * 4000 + 3000;
    const schedule = () => {
      const t = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => { setIsBlackBlinking(false); schedule(); }, 150);
      }, getInterval());
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  // Look at each other when typing starts
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));
    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message: therapy }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit request.");

      setSuccessMsg("Request submitted successfully.");
      setName("");
      setEmail("");
      setPhone("");
      setTherapy("");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MouseProvider>
      <div className="min-h-[80vh] lg:min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Content Section - Character Section (hidden on mobile) */}
        <div className="relative hidden lg:flex flex-col justify-between bg-[#f5f3ed] p-12 text-[#20331b]">
          <div className="relative z-20">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="size-4 text-primary" />
              </div>
              <span style={{ fontFamily: "var(--font-serif)" }} className="text-primary">✦ Āyurveda Sanctuary</span>
            </div>
          </div>

          <div className="relative z-20 flex items-end justify-center h-[500px]">
            {/* Cartoon Characters */}
            <div className="relative" style={{ width: '550px', height: '400px' }}>
              {/* Forest green character */}
              <div
                ref={purpleRef}
                className="absolute bottom-0 will-change-transform"
                style={{
                  left: '70px',
                  width: '180px',
                  height: isTyping ? '440px' : '400px',
                  backgroundColor: '#2D6A4F',
                  borderRadius: '10px 10px 0 0',
                  zIndex: 1,
                  transform: isTyping
                    ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                    : `skewX(${purplePos.bodySkew || 0}deg)`,
                  transformOrigin: 'bottom center',
                  transition: 'all 0.7s ease-in-out',
                }}
              >
                <div
                  className="absolute flex gap-8"
                  style={{
                    left: isLookingAtEachOther ? `${55}px` : `${45 + purplePos.faceX}px`,
                    top: isLookingAtEachOther ? `${65}px` : `${40 + purplePos.faceY}px`,
                    transition: 'all 0.7s ease-in-out',
                  }}
                >
                  <EyeBall size={18} pupilSize={7} maxDistance={4} isBlinking={isPurpleBlinking} forceLookX={isLookingAtEachOther ? 3 : undefined} forceLookY={isLookingAtEachOther ? 4 : undefined} />
                  <EyeBall size={18} pupilSize={7} maxDistance={4} isBlinking={isPurpleBlinking} forceLookX={isLookingAtEachOther ? 3 : undefined} forceLookY={isLookingAtEachOther ? 4 : undefined} />
                </div>
              </div>

              {/* Dark sage character */}
              <div
                ref={blackRef}
                className="absolute bottom-0 will-change-transform"
                style={{
                  left: '240px',
                  width: '120px',
                  height: '310px',
                  backgroundColor: '#40916C',
                  borderRadius: '8px 8px 0 0',
                  zIndex: 2,
                  transform: isLookingAtEachOther
                    ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                    : isTyping
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                      : `skewX(${blackPos.bodySkew || 0}deg)`,
                  transformOrigin: 'bottom center',
                  transition: 'all 0.7s ease-in-out',
                }}
              >
                <div
                  className="absolute flex gap-6"
                  style={{
                    left: isLookingAtEachOther ? `${32}px` : `${26 + blackPos.faceX}px`,
                    top: isLookingAtEachOther ? `${12}px` : `${32 + blackPos.faceY}px`,
                    transition: 'all 0.7s ease-in-out',
                  }}
                >
                  <EyeBall size={16} pupilSize={6} maxDistance={3.5} isBlinking={isBlackBlinking} forceLookX={isLookingAtEachOther ? 0 : undefined} forceLookY={isLookingAtEachOther ? -4 : undefined} />
                  <EyeBall size={16} pupilSize={6} maxDistance={3.5} isBlinking={isBlackBlinking} forceLookX={isLookingAtEachOther ? 0 : undefined} forceLookY={isLookingAtEachOther ? -4 : undefined} />
                </div>
              </div>

              {/* Soft sage character */}
              <div
                ref={orangeRef}
                className="absolute bottom-0 will-change-transform"
                style={{
                  left: '0px',
                  width: '240px',
                  height: '200px',
                  zIndex: 3,
                  backgroundColor: '#95D5B2',
                  borderRadius: '120px 120px 0 0',
                  transform: `skewX(${orangePos.bodySkew || 0}deg)`,
                  transformOrigin: 'bottom center',
                  transition: 'all 0.7s ease-in-out',
                }}
              >
                <div
                  className="absolute flex gap-8"
                  style={{
                    left: `${82 + (orangePos.faceX || 0)}px`,
                    top: `${90 + (orangePos.faceY || 0)}px`,
                    transition: 'all 0.2s ease-out',
                  }}
                >
                  <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                  <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                </div>
              </div>

              {/* Mint character */}
              <div
                ref={yellowRef}
                className="absolute bottom-0 will-change-transform"
                style={{
                  left: '310px',
                  width: '140px',
                  height: '230px',
                  backgroundColor: '#B7E4C7',
                  borderRadius: '70px 70px 0 0',
                  zIndex: 4,
                  transform: `skewX(${yellowPos.bodySkew || 0}deg)`,
                  transformOrigin: 'bottom center',
                  transition: 'all 0.7s ease-in-out',
                }}
              >
                <div
                  className="absolute flex gap-6"
                  style={{
                    left: `${52 + (yellowPos.faceX || 0)}px`,
                    top: `${40 + (yellowPos.faceY || 0)}px`,
                    transition: 'all 0.2s ease-out',
                  }}
                >
                  <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                  <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                </div>
                <div
                  className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full"
                  style={{
                    left: `${40 + (yellowPos.faceX || 0)}px`,
                    top: `${88 + (yellowPos.faceY || 0)}px`,
                    transition: 'all 0.2s ease-out',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-primary/5 bg-[size:20px_20px]" />
        </div>

        {/* Right Contact Form Section */}
        <div className="flex items-center justify-center p-6 sm:p-8 bg-background">
          <div className="w-full max-w-[420px]">
            <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-8 sm:mb-12">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="size-4 text-primary" />
              </div>
              <span style={{ fontFamily: "var(--font-serif)" }} className="text-primary">✦ Āyurveda</span>
            </div>

            <div className="text-center mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] mb-2" style={{ fontFamily: "var(--font-serif)" }}>Book a Consultation</h1>
              <p className="text-muted-foreground text-sm font-medium">We'll help you find the right healing path</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    required
                    className="h-11 pl-10 bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    required
                    className="h-11 pl-10 bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+91 ..."
                    value={phone}
                    autoComplete="off"
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    required
                    className="h-11 pl-10 bg-background border-border"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="therapy" className="text-sm font-medium">Tell us more about the therapy</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <textarea
                    id="therapy"
                    placeholder="How can we help you?"
                    value={therapy}
                    onChange={(e) => setTherapy(e.target.value)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    required
                    className="w-full min-h-[100px] pl-10 pt-2.5 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}

              {successMsg && (
                <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg">
                  {successMsg}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold mt-4 shadow-card"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Request Appointment"}
              </Button>
            </form>

            <div className="text-center text-xs text-muted-foreground mt-8">
              Prefer to call?{" "}
              <a href="tel:+919876543210" className="text-primary font-semibold hover:underline">
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </MouseProvider>
  );
}
