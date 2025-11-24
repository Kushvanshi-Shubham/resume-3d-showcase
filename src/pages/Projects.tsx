import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "BRAINLY Web App",
    description: "A secure content-sharing platform with RESTful API architecture. Features JWT authentication, MongoDB data persistence, and comprehensive user management system.",
    techStack: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
    highlights: [
      "Secure authentication system",
      "RESTful API design",
      "Scalable data persistence",
    ],
  },
  {
    title: "RBAC Web App",
    description: "Internal administrative tool for role-based access control. Built with modern Next.js architecture and Supabase backend, featuring dynamic permission management.",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Shadcn UI", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Role-based access control",
      "Modern UI with animations",
      "Supabase integration",
    ],
  },
  {
    title: "Web Chat App",
    description: "Real-time messaging application with WebSocket implementation. Features live message delivery, user presence indicators, and modern React/TypeScript frontend.",
    techStack: ["Node.js", "Express.js", "WebSocket", "React", "TypeScript"],
    highlights: [
      "Real-time communication",
      "WebSocket implementation",
      "Modern responsive UI",
    ],
  },
  {
    title: "MINIPAYTM",
    description: "Payment application clone demonstrating financial transaction flows. Implements secure transaction handling, user wallet management, and comprehensive backend validation.",
    techStack: ["Node.js", "Express.js", "MongoDB", "REST API"],
    highlights: [
      "Secure transaction handling",
      "Wallet management system",
      "Backend validation",
    ],
  },
];

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
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-8 hover-lift"
              >
                <h2 className="text-2xl font-bold mb-4 text-foreground">
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
                  <Button variant="outline" size="sm" className="glass-panel hover-glow">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button variant="outline" size="sm" className="glass-panel hover-glow">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
