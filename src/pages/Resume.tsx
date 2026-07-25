import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Resume() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Shubham_Kushvanshi_Resume.pdf";
    link.download = "Shubham_Kushvanshi_Resume.pdf";
    link.click();
  };

  const handleViewInNewTab = () => {
    window.open("/Shubham_Kushvanshi_Resume.pdf", "_blank");
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">Resume</h1>

          <div className="flex gap-4 mb-12">
            <Button onClick={handleDownload} className="glass-panel hover-glow group">
              <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Download PDF
            </Button>
            <Button onClick={handleViewInNewTab} variant="outline" className="glass-panel hover-glow">
              <ExternalLink className="mr-2 h-5 w-5" />
              View in New Tab
            </Button>
          </div>

          <div className="glass-panel p-8 md:p-12">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-2 text-foreground">Shubham Kushvanshi</h2>
              <p className="text-xl text-accent font-semibold mb-4">Full Stack Developer</p>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <span>shubhamkushvanshi@gmail.com</span>
                <span>•</span>
                <a href="https://linkedin.com/in/shubham-kushvanshi" className="hover:text-primary transition-colors">
                  LinkedIn
                </a>
                <span>•</span>
                <a href="https://github.com/Kushvanshi-Shubham" className="hover:text-primary transition-colors">
                  GitHub
                </a>
              </div>
            </div>

            <section className="mb-10">
              <h3 className="text-2xl font-bold mb-4 text-primary">Professional Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                Full Stack Developer with experience building enterprise-scale procurement platforms, AI-powered
                applications, SAP integrations, and high-volume data engineering pipelines. Skilled in designing
                scalable backend systems, real-time synchronization services, REST APIs, and cloud deployments using
                React, Node.js, TypeScript, PostgreSQL, Supabase, Snowflake, Azure, and SQL Server. Passionate about
                building reliable, production-ready software with clean architecture and measurable business impact.
              </p>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold mb-4 text-primary">Technical Skills</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-accent">Languages:</span>
                  <span className="text-muted-foreground ml-2">JavaScript, TypeScript, SQL, Python</span>
                </div>
                <div>
                  <span className="font-semibold text-accent">Frontend:</span>
                  <span className="text-muted-foreground ml-2">
                    React.js, Next.js, HTML5, CSS3, Tailwind CSS, Shadcn UI, Ant Design
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-accent">Backend:</span>
                  <span className="text-muted-foreground ml-2">
                    Node.js, Express.js, REST APIs, JWT, Prisma, Mongoose, Supabase Edge Functions, Deno
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-accent">Databases:</span>
                  <span className="text-muted-foreground ml-2">PostgreSQL, MongoDB, SQL Server, Snowflake, Redis</span>
                </div>
                <div>
                  <span className="font-semibold text-accent">Cloud & DevOps:</span>
                  <span className="text-muted-foreground ml-2">
                    Azure ACR, IIS, Cloudflare R2, GitHub Actions, Supabase Realtime
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-accent">Enterprise:</span>
                  <span className="text-muted-foreground ml-2">
                    SAP RFC, SAP OData, ETL Pipelines, Data Engineering, WebSockets, Microservices, Git, Postman
                  </span>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold mb-4 text-primary">Education</h3>
              <div>
                <p className="font-semibold text-foreground">IILM College of Engineering & Technology, Greater Noida</p>
                <p className="text-muted-foreground">Bachelor of Technology, Computer Science</p>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold mb-4 text-primary">Certifications</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Full Stack Web Development — Udemy</li>
                <li>Full Stack Web3 Development — Udemy</li>
                <li>Ethereum Blockchain Developer — Udemy</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
