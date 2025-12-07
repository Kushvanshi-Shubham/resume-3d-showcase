import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, CheckCircle2, ExternalLink, Github, Lightbulb, Target, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import DepthLayer from "@/components/ui/depth-layer";
import ScrollReveal from "@/components/interactions/ScrollReveal";
import { getProjectById } from "@/data/projects";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back Button */}
          <Link to="/projects">
            <Button variant="ghost" className="mb-8 gap-2 hover:bg-secondary/50">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                {project.status === "completed" ? "Completed" : project.status === "in-progress" ? "In Progress" : "Planned"}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground text-sm">
                <Calendar className="h-4 w-4" />
                {project.year}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {project.longDescription}
            </p>
            
            {/* Project Links */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="gap-2">
                      <Github className="h-4 w-4" />
                      View Code
                    </Button>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <ScrollReveal delay={0.1}>
            <DepthLayer level="elevated">
              <GlassCard variant="frosted" className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" />
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-secondary/50 backdrop-blur-sm text-sm font-medium text-foreground rounded-full border border-border hover:border-primary/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </DepthLayer>
          </ScrollReveal>

          {/* Features */}
          <ScrollReveal delay={0.2}>
            <DepthLayer level="elevated">
              <GlassCard variant="frosted" className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Key Features
                </h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </DepthLayer>
          </ScrollReveal>

          {/* Challenges */}
          <ScrollReveal delay={0.3}>
            <DepthLayer level="elevated">
              <GlassCard variant="frosted" className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Challenges Overcome
                </h2>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-accent mt-1">●</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </DepthLayer>
          </ScrollReveal>

          {/* Learnings */}
          <ScrollReveal delay={0.4}>
            <DepthLayer level="elevated">
              <GlassCard variant="frosted" className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Key Learnings
                </h2>
                <ul className="space-y-3">
                  {project.learnings.map((learning, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">✦</span>
                      {learning}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </DepthLayer>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.5}>
            <div className="flex justify-center gap-4 mt-12">
              <Link to="/projects">
                <Button variant="outline" size="lg">
                  View All Projects
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </motion.div>
      </div>
    </div>
  );
}
