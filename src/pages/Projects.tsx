import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import DepthLayer from "@/components/ui/depth-layer";
import ScrollReveal from "@/components/interactions/ScrollReveal";
import LiquidButton from "@/components/interactions/LiquidButton";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-12 gradient-text">
            Featured Projects
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 0.1}>
                <DepthLayer level="elevated">
                  <GlassCard variant="frosted" className="h-full hover-glow">
                    <h2 className="text-2xl font-bold mb-4 gradient-text">
                      {project.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-accent mb-3">
                        KEY FEATURES
                      </h3>
                      <ul className="space-y-2">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">▸</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-accent mb-3">
                        TECH STACK
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-secondary/50 backdrop-blur-sm text-xs font-medium text-foreground rounded-full border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                      <Link to={`/projects/${project.id}`}>
                        <LiquidButton className="text-sm">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          View Details
                        </LiquidButton>
                      </Link>
                    </div>
                  </GlassCard>
                </DepthLayer>
              </ScrollReveal>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
