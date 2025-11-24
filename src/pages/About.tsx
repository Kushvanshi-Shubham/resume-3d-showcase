import { motion } from "framer-motion";
import { Code2, Rocket, Users, Zap } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import DepthLayer from "@/components/ui/depth-layer";
import ScrollReveal from "@/components/interactions/ScrollReveal";

const values = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and elegant code that stands the test of time.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Constantly learning and applying cutting-edge technologies to solve real-world problems.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Strong believer in teamwork and knowledge sharing to achieve exceptional results.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Obsessed with optimization and delivering lightning-fast user experiences.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">
            About Me
          </h1>
          
          <GlassCard variant="translucent" intensity="high" className="mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Hi! I'm <span className="text-primary font-semibold">Shubham Kushvanshi</span>, 
              a passionate MERN Stack Developer with a strong foundation in building modern, 
              scalable web applications. My journey in tech has been driven by an insatiable 
              curiosity and a love for solving complex problems.
            </p>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Currently working as an <span className="text-accent font-semibold">IT Developer at V2 Retail</span>, 
              I specialize in creating full-stack solutions using React.js, Next.js, Node.js, and Express.js. 
              I've successfully deployed production-ready applications that manage complex database operations 
              and provide seamless user experiences.
            </p>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Beyond just writing code, I'm deeply interested in the <span className="text-primary font-semibold">fintech space</span> and 
              <span className="text-accent font-semibold"> Web3 technologies</span>. My goal is to contribute to innovative 
              solutions that shape the future of financial technology and decentralized applications.
            </p>
          </GlassCard>

          <h2 className="text-4xl font-bold mb-8 text-foreground">
            What Drives Me
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} variant="scaleIn" delay={index * 0.1}>
                <DepthLayer level="floating">
                  <GlassCard variant="frosted" className="hover-lift">
                    <value.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-semibold mb-3 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </GlassCard>
                </DepthLayer>
              </ScrollReveal>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <GlassCard variant="translucent">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Beyond Coding
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or diving deep into the latest 
                trends in blockchain and Web3. I'm also an avid learner with multiple 
                certifications in Full Stack Development and Ethereum Blockchain Development.
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
