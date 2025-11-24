import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero3D from "@/components/Hero3D";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Hero3D />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
              Shubham Kushvanshi
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-foreground">
              MERN Stack Developer
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting scalable, secure, and high-performance full-stack applications 
            with a passion for modern web technologies and innovative fintech solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
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
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-6 justify-center"
          >
            <a
              href="https://github.com/Kushvanshi-Shubh"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 rounded-full hover-glow hover-lift"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/shubham-kushvanshi"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 rounded-full hover-glow hover-lift"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:shubhamkushvanshi@gmail.com"
              className="glass-panel p-4 rounded-full hover-glow hover-lift"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: "2+", label: "Years Experience" },
            { number: "10+", label: "Projects Completed" },
            { number: "5+", label: "Technologies Mastered" },
          ].map((stat, index) => (
            <div key={index} className="glass-panel p-8 text-center hover-lift">
              <div className="text-5xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
