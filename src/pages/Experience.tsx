import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    company: "V2 Retail",
    role: "IT Developer",
    type: "On-site",
    duration: "Sept 2024 - Present",
    location: "India",
    achievements: [
      {
        title: "DAB Deployment Manager",
        description: "Developed a comprehensive web-based management system for Azure Data API Builder entities, enabling seamless CRUD operations, deployment automation, and real-time synchronization with SQL Server database tables.",
      },
      {
        title: "Key Achievement",
        description: "Successfully deployed a production-ready full-stack web application on Windows VM with IIS, featuring a modern dark-themed UI and complete backend API integration for managing database entities.",
      },
      {
        title: "AI Fashion Attribute Extractor",
        description: "Built a full-stack AI-powered system for managing fashion product hierarchies and attributes, with complete CRUD admin panel and JWT-based authentication featuring role-based access control.",
      },
    ],
    techStack: ["Express.js", "Prisma", "PostgreSQL", "Supabase", "Redis", "React", "TypeScript", "Ant Design"],
  },
  {
    company: "IndiGG",
    role: "Beta Tester",
    type: "Remote",
    duration: "Nov 2022 - May 2023",
    location: "Remote",
    achievements: [
      {
        title: "Web3 Game Testing",
        description: "Tested and provided feedback on unreleased versions of web3 games, identifying bugs and suggesting improvements during a 7-month period.",
      },
      {
        title: "Technology Exposure",
        description: "Gained early exposure to emerging trends in blockchain and gaming technologies.",
      },
    ],
    techStack: ["Web3", "Blockchain", "Gaming"],
  },
];

export default function Experience() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-12 gradient-text">
            Work Experience
          </h1>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-panel p-8 md:p-12 hover-lift"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="h-6 w-6 text-primary" />
                      <h2 className="text-3xl font-bold text-foreground">
                        {exp.company}
                      </h2>
                    </div>
                    <h3 className="text-xl text-accent font-semibold mb-3">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.type}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className="border-l-2 border-primary pl-6">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 glass-panel text-sm font-medium text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
