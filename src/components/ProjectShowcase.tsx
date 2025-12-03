import { motion } from "framer-motion";

const projects = [
  {
    title: "BRAINLY Web App",
    description: "Secure content-sharing platform with RESTful API",
    techStack: ["Node.js", "Express.js", "MongoDB", "JWT"],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "RBAC Web App",
    description: "Role-based access control admin tool",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Web Chat App",
    description: "Real-time messaging with WebSocket",
    techStack: ["React", "WebSocket", "TypeScript"],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "MINIPAYTM",
    description: "Payment app with secure transactions",
    techStack: ["Node.js", "MongoDB", "REST API"],
    gradient: "from-orange-500 to-red-600",
  },
];

// Duplicate for seamless loop
const duplicatedProjects = [...projects, ...projects];

export default function ProjectShowcase() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[400px] overflow-hidden pointer-events-none hidden lg:block">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
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
      >
        {duplicatedProjects.map((project, index) => (
          <motion.div
            key={`${project.title}-${index}`}
            className="flex-shrink-0 w-[280px] h-[360px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, scale: 1.02 }}
          >
            <div className={`h-full bg-gradient-to-br ${project.gradient} p-[1px] rounded-2xl`}>
              <div className="h-full bg-card/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col">
                {/* Project header with gradient accent */}
                <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${project.gradient} mb-6`} />
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                  {project.description}
                </p>
                
                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-secondary/60 text-foreground/80 rounded-md border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Decorative elements */}
                <div className="mt-4 flex gap-2">
                  <div className="h-8 w-8 rounded-lg bg-secondary/50 border border-border/50" />
                  <div className="h-8 flex-1 rounded-lg bg-secondary/30 border border-border/50" />
                </div>
                <div className="mt-2 flex gap-2">
                  <div className="h-6 flex-1 rounded bg-secondary/20 border border-border/50" />
                  <div className="h-6 w-16 rounded bg-secondary/20 border border-border/50" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
