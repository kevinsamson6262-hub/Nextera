"use client";

import React, {
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useInView,
  type HTMLMotionProps,
} from "framer-motion";

import {
  Globe,
  Smartphone,
  Cpu,
  Cloud,
  Database,
  BarChart,
  ChevronRight,
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Zap,
  Shield,
  Code,
  Layers,
  MessageSquare,
  Terminal,
  Activity,
  Monitor,
  Server,
  Workflow,
  Lock,
  ExternalLink,
  Sparkles,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";

import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const SEO = () => {
  useEffect(() => {
    document.title = "Nextera Digital Solutions | Enterprise Tech & AI Consulting";
  }, []);
  return null;
};
interface BootLoaderProps {
  onComplete: () => void;
}

const BootLoader = ({ onComplete }: BootLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] bg-[#030712] flex flex-col items-center justify-center"
    >
      <div className="w-64 space-y-6">
        <div className="flex items-center justify-between text-cyan-400 font-mono text-sm">
          <span>SYSTEM_BOOT</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <div className="text-xs text-slate-500 font-mono space-y-1 h-12 overflow-hidden">
          <motion.div animate={{ y: progress === 100 ? -40 : 0 }}>
            <p>Initializing core modules...</p>
            <p>Loading AI models...</p>
            <p>Establishing secure connection...</p>
            <p className="text-cyan-400">Welcome to Nextera.</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest(".interactive")
    ) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  window.addEventListener("mousemove", updateMousePosition);
  window.addEventListener("mouseover", handleMouseOver);

  return () => {
    window.removeEventListener("mousemove", updateMousePosition);
    window.removeEventListener("mouseover", handleMouseOver);
  };
}, []);
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-[100] mix-blend-screen"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8, scale: isHovering ? 0 : 1 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-cyan-400/50 rounded-full pointer-events-none z-[100] flex items-center justify-center backdrop-blur-[1px]"
        animate={{ x: mousePosition.x - 24, y: mousePosition.y - 24, scale: isHovering ? 1.5 : 1, backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.1)' : 'transparent' }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
};

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

const MagneticButton = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;

const { height, width, left, top } =
  ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const variants = {
    primary: "text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-white/10",
    secondary: "text-white bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10",
    outline: "text-cyan-400 border border-cyan-400/50 hover:bg-cyan-400/10"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium tracking-wide transition-colors rounded-full overflow-hidden group ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.button>
  );
};

const SpotlightBackground = () => {
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#030712]">
      <div 
        className="absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x} ${mousePos.y}, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 rounded-full blur-[150px] pointer-events-none" />
      <motion.div animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  align?: "center" | "left";
  badge?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  align = "center",
  badge,
}: SectionHeaderProps) => (
  <div className={`mb-20 ${align === 'center' ? 'text-center flex flex-col items-center' : 'text-left'} relative z-10`}>
    {badge && (
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
        <Sparkles className="w-3 h-3" /> {badge}
      </motion.div>
    )}
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
      <span className="text-white">{title.split(' ')[0]} </span>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
        {title.split(' ').slice(1).join(' ')}
      </span>
    </motion.h2>
    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
      {subtitle}
    </motion.p>
  </div>
);

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          clearInterval(timer);
          setDisplayValue(value);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
  'Services',
  'Portfolio',
  'Pricing',
  'Industries',
  'Contact'
];

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-violet-600 origin-left z-[60]" style={{ scaleX }} />
      <nav className={`fixed top-1 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex justify-between items-center transition-all duration-500 rounded-2xl px-6 py-3 ${scrolled ? 'bg-[#0B1020]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50' : 'bg-transparent'}`}>
            <div className="flex items-center gap-3 group cursor-pointer interactive">
             <div
                className="
                  group
                  relative
                  w-12
                  h-12
                  rounded-2xl
                  overflow-hidden
                  cursor-pointer
                  bg-white/5
                  backdrop-blur-xl
                  border
                  border-white/10
                  hover:border-cyan-400/40
                  transition-all
                  duration-500
                  hover:scale-110
                  hover:shadow-[0_15px_45px_rgba(34,211,238,0.35)]
                "
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

                <img
                  src="/projects/logo1.png"
                  alt="Nextera Logo"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight hidden sm:block">
                Nextera<span className="text-cyan-400 font-light">.</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-md">
              {links.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all interactive">
                  {link}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <MagneticButton
              variant="primary"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Start Project
            </MagneticButton>          
            </div>

            <button className="md:hidden text-white w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden absolute top-full left-6 right-6 mt-2 bg-[#0B1020] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="text-slate-300 font-medium p-4 rounded-xl hover:bg-white/5 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    {link}
                  </a>
                ))}
                <MagneticButton variant="primary" className="w-full mt-4">Start Project</MagneticButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-20 overflow-hidden">
      <SpotlightBackground />
      {/* Floating Glass Cards */}

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute left-16 top-44 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl px-8 py-6">
          <p className="text-cyan-400 font-bold">⚛ React 19</p>
          <p className="text-slate-400 mt-2">
            Enterprise UI
          </p>
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 25, 0],
          rotate: [2, -2, 2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute right-16 top-60 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl px-8 py-6">
          <p className="text-violet-400 font-bold">
            🔥 Firebase
          </p>
          <p className="text-slate-400 mt-2">
            Backend Ready
          </p>
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -18, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="absolute right-40 bottom-36 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl px-8 py-6">
          <p className="text-emerald-400 font-bold">
            🤖 AI Solutions
          </p>
          <p className="text-slate-400 mt-2">
            Automation & Chatbots
          </p>
        </div>
      </motion.div>
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md group cursor-pointer hover:border-cyan-500/50 transition-colors">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <span className="text-slate-300 text-sm font-medium tracking-wide">Nextera AI Engine v2.0 is Live</span>
          <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] font-extrabold tracking-tighter text-white mb-8 leading-[1.05] drop-shadow-2xl">
          Architecting the <br className="hidden md:block" />
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 blur-2xl opacity-40"></span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">Digital Future.</span>
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          We engineer enterprise-grade web applications, Mobile Apps, AI infrastructure, and infinitely scalable SaaS platforms for industry leaders.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="flex flex-col sm:flex-row items-center gap-6">
          <MagneticButton
            variant="primary"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Initiate Project
          </MagneticButton>
          <MagneticButton
          variant="secondary"
          onClick={() =>
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore Architecture
        </MagneticButton>
        <MagneticButton
          variant="outline"
          onClick={() =>
            window.open(
              "https://wa.me/917200980262",
              "_blank"
            )
          }
        >
          WhatsApp Us
        </MagneticButton>
        </motion.div>
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <div className="w-[1px] h-24 bg-gradient-to-b from-white/20 via-cyan-500/50 to-transparent relative overflow-hidden">
          <motion.div animate={{ top: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

const InfiniteMarquee = () => {
  const techs = [
    { name: "React 19", icon: <Code className="w-6 h-6 text-cyan-400" /> },
    { name: "Next.js", icon: <Globe className="w-6 h-6 text-white" /> },
    { name: "Node.js", icon: <Server className="w-6 h-6 text-emerald-400" /> },
    { name: "Firestore", icon: <Cloud className="w-6 h-6 text-yellow-400" /> },
    { name: "Firebase", icon: <Database className="w-6 h-6 text-orange-400" /> },
    { name: "Tailwind CSS", icon: <Sparkles className="w-6 h-6 text-cyan-300" /> },
    { name: "TypeScript", icon: <Code className="w-6 h-6 text-blue-500" /> },
    { name: "OpenAI", icon: <Cpu className="w-6 h-6 text-violet-400" /> },
  ];

  return (
    <section className="relative overflow-hidden py-10 border-y border-white/10 bg-[#030712]/50 backdrop-blur-md">

      {/* Left Fade */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#030712] via-[#030712]/80 to-transparent z-20" />

      {/* Right Fade */}
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#030712] via-[#030712]/80 to-transparent z-20" />

      <motion.div
        className="flex w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...techs, ...techs].map((tech, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center gap-3 px-10 group cursor-default"
          >
            <div className="transition-all duration-300 group-hover:scale-110">
              {tech.icon}
            </div>

            <span className="text-lg md:text-xl font-semibold uppercase tracking-wider text-white/70 whitespace-nowrap transition-all duration-300 group-hover:text-white">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { value: 10, suffix: "+", label: "Enterprise Projects", desc: "Successfully delivered globally" },
    { value: 99, suffix: "%", label: "Client Retention", desc: "Long-term partnership focus" },
    { value: 50, suffix: "M+", label: "Lines of Code", desc: "Written and optimized" },
    { value: 24, suffix: "/7", label: "System Monitoring", desc: "Zero-downtime architecture" }
  ];

  return (
    <section className="py-24 relative z-10 bg-[#0B1020]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
                <Activity className="w-24 h-24 text-cyan-400" />
              </div>
              <div className="text-5xl font-extrabold text-white mb-2 flex items-baseline gap-1">
                <AnimatedNumber value={stat.value} />
                <span className="text-cyan-400 text-3xl">{stat.suffix}</span>
              </div>
              <div className="text-lg font-semibold text-slate-200 mb-2">{stat.label}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ShowcaseSection = () => {
  return (
    <section className="relative py-20 md:py-28 lg:py-40 overflow-hidden bg-[#030712]">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[320px] h-[320px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-20">

          <div className="inline-flex px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 font-semibold tracking-wider uppercase text-sm mb-8">
            Enterprise Engineering
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            Software That
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Scales With You
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 leading-7 md:leading-9 px-2">
            From startup MVPs to enterprise ecosystems, we engineer secure,
            scalable, high-performance digital products built for tomorrow.
          </p>

        </div>

        {/* Image */}

        <div className="relative group">

          <div className="absolute -inset-3 sm:-inset-5 lg:-inset-8 rounded-[40px] bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 blur-3xl opacity-70 group-hover:opacity-100 transition duration-700" />

          <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

            <img
              src="/showcase/photo.png"
              alt="Nextera Workspace"
              className="w-full h-[300px] sm:h-[450px] lg:h-[650px] object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />

            {/* Floating Card */}

            <div
              className="
                absolute
                bottom-4 left-4
                sm:bottom-6 sm:left-6
                lg:bottom-10 lg:left-10
                bg-[#030712]/80
                backdrop-blur-xl
                border border-white/10
                rounded-2xl lg:rounded-3xl
                px-4 py-4
                sm:px-6 sm:py-5
                lg:px-8 lg:py-6
                max-w-[90%]
                sm:max-w-md
              "
            >

              <p className="text-cyan-400 uppercase tracking-widest text-xs sm:text-sm mb-2">
                Featured Project
              </p>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Nextera Digital Solutions
              </h3>

              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
                We build modern websites, mobile applications, AI-powered solutions, and custom software that help businesses grow.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

const ServicesBento = () => {
  return (
    <section id="services" className="py-32 relative bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader 
          badge="Core Capabilities"
          title="Engineering Excellence" 
          subtitle="We don't just build websites. We architect comprehensive digital ecosystems tailored for massive scale."
          align="left"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-auto lg:auto-rows-[260px]">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10 flex items-center lg:items-end min-h-[420px] lg:min-h-[540px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,transparent_70%)] translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-1000" />

          <div className="relative z-10 w-full text-center lg:text-left">

            <div className="mx-auto lg:mx-0 mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
              <Layers className="h-8 w-8 text-cyan-400" />
            </div>

            <h3 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              Full-Stack Web & SaaS
            </h3>

            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-8 text-slate-400">
              End-to-end product engineering using React, Next.js, Node.js,
              PostgreSQL and scalable cloud infrastructure. We build secure,
              high-performance SaaS platforms engineered to handle millions of
              requests.
            </p>

          </div>
        </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative group rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-8 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 relative z-10">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="text-xl font-bold text-white mb-2">AI Integration</h3>
              <p className="text-slate-400 text-sm">Intelligent Features for Modern Businesses.</p>
              <p className="text-slate-400 text-sm">We integrate AI capabilities into websites and applications using leading AI platforms to deliver smart chatbots, content generation, document analysis, and workflow automation.</p>            
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative group rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-8 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 relative z-10">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="text-xl font-bold text-white mb-2">Native Mobile</h3>
              <p className="text-slate-400 text-sm">High-performance iOS & Android apps via React Native.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="lg:col-span-3 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#0B1020] p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
            <div className="relative z-10 flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-violet-400 font-semibold mb-5">
                <Cloud className="w-5 h-5" />
                <span>Digital Solutions & Development</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Transforming Ideas into Digital Success
              </h3>

              <p className="mt-6 text-slate-400 text-base sm:text-lg leading-8 max-w-2xl mx-auto lg:mx-0">
                We create modern websites, scalable web applications and powerful
                digital experiences that help businesses grow through exceptional
                design, lightning-fast performance and reliable technology.
              </p>

            </div>
            <div className="relative z-10 flex justify-center lg:justify-end w-full lg:w-auto">
            <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full border border-white/10 flex items-center justify-center relative">

              <div className="absolute inset-3 rounded-full border border-dashed border-cyan-500/30 animate-[spin_10s_linear_infinite]" />

              <div className="absolute inset-8 rounded-full border border-violet-500/30 animate-[spin_15s_linear_infinite_reverse]" />

              <Server className="w-10 h-10 lg:w-12 lg:h-12 text-white" />

            </div>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface TiltCardProps {
  children: ReactNode;
}

const TiltCard = ({ children }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = -(e.clientY - top - height / 2) / 20;
    setStyle({ rotateX: y, rotateY: x });
  };

  const handleMouseLeave = () => setStyle({ rotateX: 0, rotateY: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: style.rotateX, rotateY: style.rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full h-full [perspective:1000px]"
    >
      {children}
    </motion.div>
  );
};

const Portfolio = () => {
  const projects = [
  {
    title: "E-Commerce Platform",
    type: "E-Commerce",
    image: "/projects/ecom.jpg",
    tech: ["React 19", "Next.js", "TypeScript", "Tailwind CSS"],
    metrics: "High Performance",
    live: "https://your-live-demo.com",
    github: "https://github.com/yourusername/finedge",
    color: "from-blue-500 to-cyan-500",
  },
  {
  title: "Personal Portfolio",
  type: "Portfolio Website",
  image: "/projects/por.jpeg",
  tech: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion"
  ],
  metrics: "Modern Portfolio",
  live: "https://nextera-digital-solutions.vercel.app/",
  color: "from-purple-500 to-pink-500"
},
  {
    title: "AI Analytics & Prediction Dashboard",
    type: "AI & Education Platform",
    image: "/projects/AI.png",
    tech: ["React 19", "Next.js", "GeminiAI", "Tailwind CSS"],
    metrics: "AI Powered",
    live: "https://kevinsamson6262-hub.github.io/AI-Based-Early-Alert-System-for-Dropout-Risk/",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Nextera Event",
    type: "Event Landing Page",
    image: "/projects/event.png",
    tech: ["React", "Node.js", "Firebase", "Tailwind CSS"],
    metrics: "Premium Store",
    live: "https://kevinsamson6262-hub.github.io/Happy-new-year1/",
    color: "from-emerald-500 to-teal-500",
  },
];

  return (
    <section id="portfolio" className="py-32 relative bg-[#0B1020] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <SectionHeader 
            badge="Featured Work"
            title="Digital Masterpieces" 
            subtitle="Explore how we've transformed complex business challenges into elegant, scalable software solutions."
            align="left"
          />
       </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <TiltCard key={idx}>
              <div className="h-[350px] sm:h-[420px] lg:h-[450px] relative rounded-3xl overflow-hidden group bg-white/5 border border-white/10 [transform-style:preserve-3d]">

            {/* Project Image */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
            />

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(to_top,#030712_10%,transparent_100%)]" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end [transform:translateZ(50px)]">

              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="text-sm text-cyan-400 font-semibold mb-2">
                {project.type}
              </div>

              <h3 className="text-3xl font-bold text-white mb-2">
                {project.title}
              </h3>

              <div className="text-slate-300 mb-6">
                Impact:
                <span className="text-white ml-2">{project.metrics}</span>
              </div>

              <div className="flex items-center gap-4">

                {/* Live Demo */}
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold text-center transition"
                >
                  Live Demo
                </a>

                {/* External Link */}
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-cyan-500 transition-all duration-300"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>

              </div>

            </div>

          </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const plans = [
  {
    name: "Startup Launch",
    price: "₹7,999",
    popular: false,
    features: [
      "Up to 5 Responsive Pages",
      "Modern UI Design",
      "Mobile & Tablet Responsive",
      "Contact Form",
      "WhatsApp Integration",
      "Social Media Integration",
      "Basic On-Page SEO",
      "Google Maps Integration",
      "Free SSL Certificate",
      "Domain & Hosting Setup",
      "Speed Optimization",
      "1 Month Free Support",
    ],
  },
  {
    name: "Business Growth",
    price: "₹14,999",
    popular: true,
    features: [
      "Up to 10 Custom Pages",
      "Premium Custom UI/UX Design",
      "Fully Responsive Website",
      "Admin Dashboard",
      "Blog Management System",
      "Payment Gateway Integration",
      "Google Analytics Setup",
      "Advanced SEO Setup",
      "Performance Optimization",
      "Social Media Integration",
      "Free SSL Certificate",
      "3 Months Free Support",
    ],
  },
  {
    name: "E-Commerce Pro",
    price: "₹24,999",
    popular: false,
    features: [
      "Up to 20 Pages",
      "Premium E-Commerce Website",
      "Product Management",
      "Shopping Cart",
      "Secure Payment Gateway",
      "Customer Login & Accounts",
      "Order Management",
      "Inventory Management",
      "Coupon & Discount System",
      "Admin Dashboard",
      "Basic Shipping Integration",
      "Free SSL Certificate",
      "6 Months Free Support",
    ],
  },
  {
    name: "Enterprise Custom",
    price: "Custom Quote",
    popular: false,
    features: [
      "Custom Web Application",
      "Admin & User Dashboards",
      "REST API Development",
      "Third-Party API Integration",
      "AI Integration (OpenAI / Gemini)",
      "Authentication System",
      "Database Design",
      "Cloud Deployment",
      "Scalable Architecture",
      "Priority Technical Support",
      "Dedicated Development Team",
      "Custom Maintenance Plan",
    ],
  },
];

  return (
    <section
      id="pricing"
      className="py-32 bg-[#030712] relative"
    >
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeader
          badge="Pricing"
          title="Premium Packages"
          subtitle="Transparent pricing tailored for startups, businesses, e-commerce and enterprise solutions."
        />

        <div className="grid lg:grid-cols-4 gap-8">

          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className={`relative overflow-hidden rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
                plan.popular
                  ? "border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.4)]"
                  : "border-white/10"
              }`}
            >

              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 py-2 text-center text-sm font-bold bg-gradient-to-r from-cyan-500 to-violet-500">
                  MOST POPULAR
                </div>
              )}

              <div className="bg-white/5 p-8 h-full">

                <h3 className="text-2xl font-bold text-white mt-4">
                  {plan.name}
                </h3>

                <div className="mt-6 mb-8">
                  <span className="text-4xl font-bold text-cyan-400">
                    {plan.price}
                  </span>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <CheckCircle2
                        className="text-cyan-400 mt-1 shrink-0"
                        size={18}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  variant={plan.popular ? "primary" : "secondary"}
                  className="w-full"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  Get Free Consultation
                </MagneticButton>

              </div>
            </motion.div>
          ))}

        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-16">

          <MagneticButton
            variant="primary"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Get Free Consultation
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            onClick={() =>
              window.open(
                "https://wa.me/917200980262",
                "_blank"
              )
            }
          >
            WhatsApp Us
          </MagneticButton>

          <MagneticButton
            variant="outline"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Request Custom Quote
          </MagneticButton>

        </div>

      </div>
    </section>
  );
};
const IndustriesSection = () => {
  const industries = [
    {
      title: "Healthcare",
      image: "/projects/H.png",
      description: "Hospital management, telemedicine, patient portals & healthcare solutions.",
    },
    {
      title: "Gym",
      image: "/projects/g.jpg",
      description: "Gym management systems, memberships, trainer scheduling and fitness apps.",
    },
    {
      title: "Booking & Reservation",
      image: "/projects/b.png",
      description: "Hotel, salon, restaurant and appointment booking systems.",
    },
    {
      title: "E-Commerce",
      image: "/projects/e.webp",
      description: "Online stores, marketplaces, payment integration and inventory.",
    },
    {
      title: "Education",
      image: "/projects/e.png",
      description: "Learning management systems, school ERP and e-learning platforms.",
    },
    {
      title: "Real Estate",
      image: "/projects/r.webp",
      description: "Property listings, CRM, real estate portals and management.",
    },
    {
      title: "Logistics",
      image: "/projects/l.png",
      description: "Fleet tracking, warehouse management and delivery solutions.",
    },
    {
      title: "SaaS Platforms",
      image: "/projects/s.avif",
      description: "Cloud software, subscription platforms and business tools.",
    },
    {
      title: "Travel & Hospitality",
      image: "/projects/t.webp",
      description: "Travel booking, hotel management and tourism websites.",
    },
    {
      title: "Media & Entertainment",
      image: "/projects/en.webp",
      description: "Streaming platforms, OTT apps and content management.",
    },
    {
      title: "Energy & Utilities",
      image: "/projects/ener.jpg",
      description: "Renewable energy dashboards and utility management systems.",
    },
    {
      title: "Government & Public Sector",
      image: "/projects/g.avif",
      description: "Citizen service portals and e-governance platforms.",
    },
  ];

  return (
    <section id="industries" className="py-32 bg-[#0B1020]">
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeader
          badge="Industries"
          title="Industries We Serve"
          subtitle="Delivering innovative digital solutions across diverse industries."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {industries.map((industry) => (

            <div
              key={industry.title}
              className="group overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-2"
            >

              <div className="relative overflow-hidden h-64">

                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-black/20 to-transparent" />

              </div>

              <div className="p-8">

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {industry.title}
                </h3>

                <p className="text-slate-400 leading-7">
                  {industry.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

const CostCalculator = () => {
  const [pages, setPages] = useState(5);
  const [design, setDesign] = useState("standard");
  const [seo, setSeo] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [ecommerce, setEcommerce] = useState(false);
  const [booking, setBooking] = useState(false);
  const [ai, setAi] = useState(false);

  // Base Price
  let total = 7999;

  // Extra Pages
if (pages > 5) total += (pages - 5) * 500;

// Premium Design
if (design === "premium") total += 2500;

// SEO
if (seo) total += 1500;

// Dashboard
if (dashboard) total += 5000;

// Booking System
if (booking) total += 3000;

// E-Commerce
if (ecommerce) total += 12000;

// AI Integration
if (ai) total += 8000;

  return (
    <section className="py-32 bg-[#0B1020]">
      <div className="max-w-6xl mx-auto px-6">

        <SectionHeader
          badge="Estimator"
          title="Project Cost Calculator"
          subtitle="Estimate your website investment in just a few clicks."
        />

        <div className="grid lg:grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Left Side */}

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <label className="block text-white mb-3 font-medium">
              Number of Pages
            </label>

            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />

            <div className="flex justify-between mt-2 text-sm text-slate-400">
              <span>5 Pages</span>
              <span className="text-cyan-400 font-semibold">
                {pages} Pages
              </span>
              <span>30 Pages</span>
            </div>

            {/* Design */}

            <div className="mt-8">

              <label className="block text-white mb-3 font-medium">
                Design Quality
              </label>

              <select
                value={design}
                onChange={(e) => setDesign(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white"
              >
                <option value="standard">
                  Standard UI Design
                </option>

                <option value="premium">
                  Premium UI/UX + Animations
                </option>
              </select>

            </div>

            {/* Features */}

            <div className="grid grid-cols-2 gap-4 mt-8 text-white">

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={seo}
                  onChange={() => setSeo(!seo)}
                />
                SEO Setup
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={dashboard}
                  onChange={() => setDashboard(!dashboard)}
                />
                Admin Dashboard
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={ecommerce}
                  onChange={() => setEcommerce(!ecommerce)}
                />
                E-Commerce
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={booking}
                  onChange={() => setBooking(!booking)}
                />
                Booking System
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={ai}
                  onChange={() => setAi(!ai)}
                />
                AI Integration
              </label>

            </div>

          </div>

          {/* Right Side */}

          <div className="bg-gradient-to-br from-cyan-900/30 to-violet-900/30 border border-cyan-500/20 rounded-3xl p-10 flex flex-col justify-center">

            <span className="text-slate-400 text-lg">
              Estimated Project Cost
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cyan-400 mt-2">
              ₹{total.toLocaleString()}
            </h2>

            <p className="text-slate-400 mt-6 leading-7">
              This is an approximate estimate based on your selected
              requirements. The final quotation may vary depending on
              project complexity, integrations, and custom features.
            </p>

            <div className="mt-8 space-y-3 text-sm">

              <div className="flex items-center gap-3 text-green-400">
                ✓ Free Consultation
              </div>

              <div className="flex items-center gap-3 text-green-400">
                ✓ Free SSL & Hosting Assistance
              </div>

              <div className="flex items-center gap-3 text-green-400">
                ✓ Deployment Included
              </div>

            </div>

            <div className="mt-10 flex flex-col gap-4">

              <MagneticButton
                variant="primary"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Get Exact Quote
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={() =>
                  window.open(
                    "https://wa.me/917200980262",
                    "_blank"
                  )
                }
              >
                Discuss on WhatsApp
              </MagneticButton>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
const ComparisonSection = () => {
  const features = [
  {
    feature: "Custom UI/UX Design",
    nextera: true,
    agency: false,
  },
  {
    feature: "Mobile Responsive",
    nextera: true,
    agency: true,
  },
  {
    feature: "Modern Animations",
    nextera: true,
    agency: false,
  },
  {
    feature: "AI Integration (Optional)",
    nextera: true,
    agency: false,
  },
  {
    feature: "Performance Optimization",
    nextera: true,
    agency: false,
  },
  {
    feature: "SEO Ready",
    nextera: true,
    agency: true,
  },
  {
    feature: "SSL Security",
    nextera: true,
    agency: true,
  },
  {
    feature: "Admin Dashboard (Optional)",
    nextera: true,
    agency: false,
  },
  {
    feature: "WhatsApp Integration",
    nextera: true,
    agency: false,
  },
  {
    feature: "Google Analytics Setup",
    nextera: true,
    agency: false,
  },
  {
    feature: "Fast Loading Optimization",
    nextera: true,
    agency: false,
  },
  {
    feature: "Post Launch Support",
    nextera: true,
    agency: false,
  },
];
  const advantages = [
    {
      title: "Premium Design",
      desc: "Modern interfaces inspired by Stripe, Apple and Vercel.",
      icon: <Sparkles className="w-8 h-8" />,
    },
    {
      title: "Fast Delivery",
      desc: "Rapid development without compromising quality.",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Enterprise Security",
      desc: "Secure architecture with industry best practices.",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Scalable Systems",
      desc: "Built to handle future growth and expansion.",
      icon: <Server className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-32 bg-[#030712] relative overflow-hidden">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <SectionHeader
          badge="Why Choose Us"
          title="Why Choose Nextera"
          subtitle="We don't just build websites. We build digital growth engines."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">

          {advantages.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
            >
              <div className="text-cyan-400 mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>

              <p className="text-slate-400">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
        
        <div className="overflow-x-auto">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl">

          <div className="grid grid-cols-3 bg-white/5">

            <div className="p-6 font-bold text-white">
              Features
            </div>

            <div className="p-6 font-bold text-cyan-400 text-center">
              Nextera
            </div>

            <div className="p-6 font-bold text-slate-400 text-center">
              Traditional Websites
            </div>

          </div>

          {features.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-3 border-t border-white/10"
            >

              <div className="p-6 text-white">
                {row.feature}
              </div>

              <div className="p-6 flex justify-center">
                {row.nextera ? (
                  <CheckCircle2 className="text-emerald-400" />
                ) : (
                  <X className="text-red-400" />
                )}
              </div>

              <div className="p-6 flex justify-center">
                {row.agency ? (
                  <CheckCircle2 className="text-emerald-400" />
                ) : (
                  <X className="text-red-400" />
                )}
              </div>

            </div>
          ))}

        </div>
        </div>
        <div className="mt-16 text-center">

          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h3>

          <p className="text-slate-400 mb-8 text-lg">
            Let's discuss your project and create a solution that drives real business results.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <MagneticButton
              variant="primary"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Get Free Consultation
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={() =>
                window.open(
                  "https://wa.me/917200980262",
                  "_blank"
                )
              }
            >
              WhatsApp Us
            </MagneticButton>

          </div>

        </div>

      </div>
    </section>
  );
};

// ====================== FAQ DATA ======================

const categories = [
  "All",
  "General",
  "Services",
  "Pricing",
  "Development",
  "Support",
];

const faqs = [
  {
    category: "General",
    popular: true,
    question: "What services does Nextera Digital Solutions provide?",
    answer:
      "We build premium websites, web applications, mobile apps, AI-powered software, SaaS platforms, dashboards, UI/UX designs, and enterprise digital solutions tailored to businesses of all sizes.",
  },
  {
    category: "Pricing",
    popular: true,
    question: "How much does a website cost?",
    answer:
      "Pricing depends on your requirements. Our starter websites begin around ₹7,999, while business, e-commerce, and enterprise solutions are quoted based on features and complexity.",
  },
  {
    category: "Development",
    popular: true,
    question: "How long does it take to complete a project?",
    answer:
      "Business websites usually take 1–3 weeks. Advanced web applications, SaaS platforms, and enterprise software typically require 4–12 weeks.",
  },
  {
    category: "Development",
    popular: false,
    question: "Will my website be mobile responsive?",
    answer:
      "Absolutely. Every website is optimized for desktops, tablets, and smartphones with responsive layouts and fast performance.",
  },
  {
    category: "Services",
    popular: false,
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We modernize outdated websites with premium UI/UX, improved performance, enhanced security, SEO improvements, and modern animations.",
  },
  {
    category: "Services",
    popular: false,
    question: "Do you build e-commerce websites?",
    answer:
      "Yes. We develop secure online stores with payment gateways, product management, order tracking, inventory systems, and admin dashboards.",
  },
  {
    category: "Development",
    popular: false,
    question: "Can you build custom web applications?",
    answer:
      "Yes. We specialize in CRM systems, ERP software, dashboards, booking systems, SaaS products, portals, and custom enterprise applications.",
  },
  {
    category: "Services",
    popular: false,
    question: "Do you provide AI integration?",
    answer:
      "Yes. We integrate AI chatbots, document analysis, workflow automation, recommendation systems, and intelligent business solutions.",
  },
  {
    category: "Support",
    popular: false,
    question: "Do you provide maintenance after launch?",
    answer:
      "Yes. We offer maintenance plans that include updates, security patches, backups, monitoring, bug fixes, and feature enhancements.",
  },
  {
    category: "Support",
    popular: false,
    question: "Can I request new features later?",
    answer:
      "Definitely. Your project can continue evolving as your business grows. Additional features can be added anytime.",
  },
  {
    category: "Development",
    popular: false,
    question: "Which technologies do you use?",
    answer:
      "We work with React, Next.js, TypeScript, Tailwind CSS, Firebase, Node.js, Framer Motion, AI APIs, and other modern technologies.",
  },
  {
    category: "General",
    popular: false,
    question: "How do we get started?",
    answer:
      "Simply contact us through the form or WhatsApp. We'll discuss your requirements, provide a proposal, and begin development after approval.",
  },
];

// ====================== FAQ COMPONENT ======================

const FAQ = () => {
  const [active, setActive] = useState<number | null>(0);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [showAll, setShowAll] = useState(false);

  // Filter FAQs
  const filteredFaqs = faqs.filter((faq) => {
    const categoryMatch =
      selectedCategory === "All" || faq.category === selectedCategory;

    const searchMatch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Show only first 6 initially
  const displayedFaqs = showAll
    ? filteredFaqs
    : filteredFaqs.slice(0, 3);

  return (
    <section
      id="faq"
      className="relative py-32 bg-[#030712]"
    >
      <div className="max-w-6xl mx-auto px-6">

        <SectionHeader
          badge="Frequently Asked Questions"
          title="Questions & Answers"
          subtitle="Everything you need to know before starting your project with Nextera."
        />

        {/* Search */}

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search your question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* Categories */}

        <div className="overflow-x-auto pb-2 no-scrollbar">
        <div className="flex gap-3 w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAll(false);
              }}
              className={`px-5 py-2 rounded-full transition-all duration-300 border ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-white border-cyan-500"
                  : "bg-white/5 border-white/10 text-slate-300 hover:border-cyan-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        </div>

        {/* Popular Questions */}

        {selectedCategory === "All" && search === "" && (
          <div className="mb-10">
            <h3 className="text-cyan-400 text-lg font-semibold mb-4">
              ⭐ Popular Questions
            </h3>

            <div className="flex flex-wrap gap-3">
              {faqs
                .filter((f) => f.popular)
                .map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearch(faq.question);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 text-slate-300 transition"
                  >
                    {faq.question}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion */}

<div className="space-y-5">

  {displayedFaqs.length === 0 ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center"
    >
      <h3 className="text-2xl font-bold text-white">
        No questions found
      </h3>

      <p className="mt-3 text-slate-400">
        Try searching with different keywords.
      </p>
    </motion.div>
  ) : (
    displayedFaqs.map((faq, index) => {
      const open = active === index;

      return (
        <motion.div
          key={index}
          layout
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.05,
          }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300"
        >
          <button
            onClick={() =>
              setActive(open ? null : index)
            }
            className="w-full px-7 py-6 flex items-center justify-between"
          >
            <div className="text-left">

              <span className="inline-block text-xs uppercase tracking-wider text-cyan-400 mb-2">
                {faq.category}
              </span>

              <h3 className="text-lg md:text-xl font-semibold text-white">
                {faq.question}
              </h3>

            </div>

            <motion.div
              animate={{
                rotate: open ? 180 : 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="w-11 h-11 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl"
            >
              ▼
            </motion.div>
          </button>

          <AnimatePresence>

            {open && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="px-7 pb-7">

                  <div className="border-t border-white/10 pt-6">

                    <p className="text-slate-400 leading-8">
                      {faq.answer}
                    </p>

                    <div className="flex items-center gap-3 mt-6">

                      <button className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition">
                        👍 Helpful
                      </button>

                      <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition">
                        👎 Not Helpful
                      </button>

                    </div>

                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </motion.div>
      );
    })
  )}

</div>

{/* See More */}

{filteredFaqs.length > 6 && (

  <div className="flex justify-center mt-12">

    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={() => setShowAll(!showAll)}
      className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20"
    >
      {showAll
        ? "Show Less"
        : `See More (${filteredFaqs.length - 6})`}
    </motion.button>

    

  </div>

)}


      </div>
    </section>
  );
};
const ContactForm = () => {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    setLoading(true);

    await addDoc(collection(db, "contacts"), {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    message: formData.message,
    createdAt: serverTimestamp(),
  });

    setLoading(false);

    setSuccess(true);

    setFormData({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

    setTimeout(() => {
      setSuccess(false);
    }, 5000);

  } catch (error) {
    console.error(error);
    alert("Failed to send message");
    setLoading(false);
  }
};

  return (
    <section id="contact" className="py-32 relative bg-[#0B1020]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-white/[0.02] border border-white/10 rounded-[40px] p-8 md:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Transform?</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl mb-12 font-light leading-relaxed">
                Skip the generic agencies. Partner with engineers who understand complex architecture and business logic.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: <Mail className="w-6 h-6"/>, text: "Digitalsolutions.nextera@gmail.com", title: "Direct Email" },
                  { icon: <MapPin className="w-6 h-6"/>, text: "Tuticorin, Tamilnadu", title: "Location" }
                ].map((contact, idx) => (
                  <div key={idx} className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 font-medium mb-1">{contact.title}</div>
                      <div className="text-base sm:text-lg lg:text-xl break-all text-white font-semibold">{contact.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#030712] border border-white/10 p-8 md:p-10 rounded-3xl relative">
              {success && (
                <div className="absolute inset-0 bg-[#030712]/90 backdrop-blur-sm z-20 flex items-center justify-center rounded-3xl border border-emerald-500/50">
                  <div className="text-center text-emerald-400">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Transmission Received</h3>
                    <p className="text-emerald-400/80">Our engineering lead will contact you within 24h.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors">Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors text-lg" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors">Email</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors text-lg" placeholder="john@company.com" />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors">Company</label>
                  <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors text-lg" placeholder="Tech Corp Inc." />
                </div>
                 {/* Phone */}
                <div className="space-y-2 group md:col-span-2">
                  <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors">
                    Phone Number
                  </label>

                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors text-lg"
                    placeholder="9876543210"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors">Project Brief</label>
                  <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors text-lg resize-none" placeholder="We need to build..."></textarea>
                </div>
                
                <MagneticButton variant="primary" type="submit" className="w-full !py-5 text-lg mt-4" disabled={loading}>
                  {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Initialize Connection"}
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const links = [
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact Us", href: "#contact" },
    { name: "FAQs", href: "#faq" },
  ];
const Footer = () => (
  
  <footer className="bg-[#030712] border-t border-white/5 pt-24 pb-12 overflow-hidden relative">

    {/* Background Text */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 text-[15vw] font-extrabold text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
      NEXTERA
    </div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

        {/* Company */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
                group
                relative
                w-12
                h-12
                rounded-2xl
                overflow-hidden
                cursor-pointer
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                hover:border-cyan-400/40
                transition-all
                duration-500
                hover:scale-110
                hover:shadow-[0_15px_45px_rgba(34,211,238,0.35)]
                flex items-center justify-center
              "
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

              <img
                src="/projects/logo1.png"
                alt="Nextera Logo"
                className="w-[85%] h-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <span className="text-white font-bold text-3xl tracking-tight">
              Nextera
              <span className="text-cyan-400">.</span>
            </span>
          </div>

          <p className="text-slate-400 text-lg leading-8 max-w-md mb-8">
            Architecting the future of web applications, Mobile Apps, AI solutions and
            enterprise software with uncompromising quality and innovation.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">

            <a
              href="https://linkedin.com/company/nextera"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#0077B5] hover:border-[#0077B5]"
            >
              <Linkedin
                size={20}
                className="text-slate-300 group-hover:text-white"
              />
            </a>

            <a
              href="https://www.instagram.com/digitalsolution.nextera?igsh=ejE3Zmx5cXdmem5i"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-pink-500 hover:via-red-500 hover:to-yellow-500"
            >
              <Instagram
                size={20}
                className="text-slate-300 group-hover:text-white"
              />
            </a>

            <a
              href="https://facebook.com/nextera"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#1877F2]"
            >
              <Facebook
                size={20}
                className="text-slate-300 group-hover:text-white"
              />
            </a>

            <a
              href="https://wa.me/917200980262"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#25D366]"
            >
              <MessageCircle
                size={20}
                className="text-slate-300 group-hover:text-white"
              />
            </a>

          </div>
        </div>

        {/* Services */}
      <div className="lg:col-span-2 lg:col-start-8">
        <h4 className="text-white font-bold mb-6 tracking-wider uppercase">
          Services
        </h4>

        <ul className="space-y-4">
          {[
            "Website Development",
            "Web Applications",
            "Mobile App Development",
            "UI/UX Design",
            "AI Integration",
            "E-Commerce Solutions",
          ].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div className="lg:col-span-2">
        <h4 className="text-white font-bold mb-6 tracking-wider uppercase">
          Company
        </h4>

        <ul className="space-y-4">
  {links.map((item) => (
    <li key={item.name}>
      <a
        href={item.href}
        className="text-slate-400 hover:text-cyan-400 transition-colors"
      >
        {item.name}
      </a>
    </li>
  ))}
</ul>
      </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

        <p className="text-slate-500 text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">
            Nextera Digital Solutions
          </span>
          . All Rights Reserved.
        </p>

        <div className="flex items-center gap-8">

          <a
            href="#"
            className="text-slate-500 hover:text-cyan-400 transition-colors"
          >
            Privacy
          </a>

          <a
            href="#"
            className="text-slate-500 hover:text-cyan-400 transition-colors"
          >
            Terms
          </a>

          <a
            href="#"
            className="text-slate-500 hover:text-cyan-400 transition-colors"
          >
            Security
          </a>

        </div>

      </div>

    </div>
  </footer>
);

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        h1, h2, h3, h4, .tracking-tight { font-family: 'Space Grotesk', sans-serif; }
        body { font-family: 'Inter', sans-serif; cursor: none; }
        html { scroll-behavior: smooth; }
        a, button, input, textarea, select { cursor: none; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #374151; }
      `}} />
      
      <SEO />
      
      <AnimatePresence>
        {!booted && <BootLoader onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <InfiniteMarquee />
            <ShowcaseSection />
            <ServicesBento />
            <Stats />
            <Portfolio />
            <PricingSection />

            <IndustriesSection />
            <CostCalculator />
            <ComparisonSection />
            
            <FAQ />
            <ContactForm />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}