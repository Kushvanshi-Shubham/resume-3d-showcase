import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MagneticButton from "@/components/interactions/MagneticButton";
import ScrollReveal from "@/components/interactions/ScrollReveal";
import GlassCard from "@/components/ui/glass-card";
import { staggerChildren } from "@/lib/motion-config";
import ProjectShowcase from "@/components/ProjectShowcase";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* CSS Glass Bubble - positioned in upper right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute right-[5%] top-[15%] pointer-events-none hidden lg:block"
      >
        {/* Outer glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: "420px",
            height: "420px",
            background:
              "radial-gradient(circle at 35% 35%, rgba(56, 189, 248, 0.6) 0%, rgba(14, 165, 233, 0.35) 35%, rgba(6, 182, 212, 0.15) 60%, transparent 85%)",
            boxShadow: "0 0 100px 50px rgba(14, 165, 233, 0.25), inset 0 0 80px rgba(103, 232, 249, 0.3)",
            border: "1px solid rgba(103, 232, 249, 0.25)",
          }}
        />
        {/* Inner bright core */}
        <div
          className="absolute rounded-full"
          style={{
            width: "260px",
            height: "260px",
            left: "80px",
            top: "80px",
            background:
              "radial-gradient(circle, rgba(103, 232, 249, 0.5) 0%, rgba(56, 189, 248, 0.25) 60%, transparent 100%)",
            boxShadow: "0 0 50px 25px rgba(103, 232, 249, 0.2)",
          }}
        />
        {/* Highlight ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: "360px",
            height: "360px",
            left: "30px",
            top: "30px",
            background: "transparent",
            border: "2px solid rgba(165, 243, 252, 0.35)",
            boxShadow: "0 0 25px rgba(165, 243, 252, 0.2)",
          }}
        />
        {/* Specular highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: "100px",
            height: "60px",
            left: "100px",
            top: "80px",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)",
            filter: "blur(10px)",
            borderRadius: "50%",
          }}
        />
      </motion.div>

      {/* Auto-scrolling project showcase on the right */}
      <ProjectShowcase />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl text-left">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-accent mb-4 font-medium">Welcome to my portfolio</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-6xl md:text-7xl font-heading font-bold mb-2">
              I'm <span className="gradient-text">Shubham</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-heading font-bold gradient-text mb-8">Kushvanshi</h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-muted-foreground mb-12 max-w-xl leading-relaxed"
          >
            Building scalable, secure, and high-performance web applications with modern technologies and innovative
            solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/projects">
              <Button size="lg" className="glass-panel hover-glow group">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="glass-panel hover-glow">
                Get In Touch
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-4"
          >
            <MagneticButton strength={0.4} range={120} className="inline-block">
              <a
                href="https://github.com/Kushvanshi-Shubham"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-full hover-glow hover-lift block"
              >
                <Github className="h-6 w-6" />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.4} range={120} className="inline-block">
              <a
                href="https://linkedin.com/in/shubham-kushvanshi"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4 rounded-full hover-glow hover-lift block"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.4} range={120} className="inline-block">
              <a
                href="mailto:shubhamkushvanshi@gmail.com"
                className="glass-panel p-4 rounded-full hover-glow hover-lift block"
              >
                <Mail className="h-6 w-6" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: "1.5+", label: "Years Experience" },
            { number: "5+", label: "Projects Completed" },
            { number: "5+", label: "Technologies Mastered" },
          ].map((stat, index) => (
            <ScrollReveal key={index} variant="fadeInUp" delay={index * 0.1}>
              <GlassCard variant="opaque" className="text-center hover-scale">
                <div className="text-5xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
