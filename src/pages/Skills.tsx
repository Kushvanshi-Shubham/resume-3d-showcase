import { motion } from "framer-motion";
import { Server, Layout, Database, Cloud, Code2, Wrench } from "lucide-react";

const skillCategories = [
  {
    category: "Backend Development",
    icon: Server,
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "RESTful APIs", level: 85 },
      { name: "API Security", level: 80 },
      { name: "Microservices", level: 75 },
      { name: "JWT", level: 85 },
    ],
  },
  {
    category: "Frontend Development",
    icon: Layout,
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 85 },
      { name: "Prisma", level: 80 },
      { name: "Mongoose", level: 85 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 60 },
      { name: "Git", level: 85 },
      { name: "IIS", level: 75 },
      { name: "Supabase", level: 80 },
    ],
  },
  {
    category: "Technologies",
    icon: Code2,
    skills: [
      { name: "WebSockets", level: 80 },
      { name: "Web3", level: 70 },
      { name: "Blockchain", level: 65 },
      { name: "Ethereum", level: 65 },
    ],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: [
      { name: "Postman", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Ant Design", level: 80 },
      { name: "Shadcn UI", level: 85 },
    ],
  },
];

export default function Skills() {
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
            Skills & Expertise
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-8 hover-lift"
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, idx) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-accent">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + idx * 0.05 }}
                          className="h-full bg-gradient-to-r from-primary via-accent to-primary-glow"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-panel p-8 md:p-12 mt-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Full Stack Development - Udemy",
                "Fullstack Web3 Developer - Udemy",
                "Ethereum Blockchain Developer - Udemy",
              ].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="p-6 bg-secondary/50 backdrop-blur-sm rounded-lg border border-border text-center"
                >
                  <p className="text-foreground font-medium">{cert}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
