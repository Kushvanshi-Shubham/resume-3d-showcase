import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

const gradients = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
];

// Duplicate for seamless loop
const duplicatedProjects = [...projects, ...projects];

export default function ProjectShowcase() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[400px] overflow-hidden hidden lg:block"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <motion.div
        className="flex gap-6 py-8"
        animate={{
          x: [0, -50 * projects.length * 4.5],
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        {duplicatedProjects.map((project, index) => {
          const gradient = gradients[index % gradients.length];
          return (
          <Link
            to={`/projects/${project.id}`}
            key={`${project.id}-${index}`}
            className="flex-shrink-0 w-[280px] h-[360px] group"
          >
            <motion.div
              className="h-full rounded-2xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0.6 }}
              whileHover={{ 
                opacity: 1, 
                scale: 1.05,
                y: -8,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className={`h-full bg-gradient-to-br ${gradient} p-[1px] rounded-2xl transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-primary/20`}>
                <div className="h-full bg-card/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col relative overflow-hidden">
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Project header with gradient accent */}
                  <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${gradient} mb-6 transition-all duration-300 group-hover:w-24`} />
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 relative z-10 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-6 flex-grow relative z-10">
                    {project.description}
                  </p>
                  
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-secondary/60 text-foreground/80 rounded-md border border-border/50 transition-all duration-300 group-hover:bg-secondary/80 group-hover:border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* View Project indicator */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span>View Project</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
