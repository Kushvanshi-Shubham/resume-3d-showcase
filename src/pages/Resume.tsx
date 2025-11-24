import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Resume() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Shubham_Kushvanshi_Resume.pdf';
    link.download = 'Shubham_Kushvanshi_Resume.pdf';
    link.click();
  };

  const handleViewInNewTab = () => {
    window.open('/Shubham_Kushvanshi_Resume.pdf', '_blank');
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
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">
            Resume
          </h1>

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
              <h2 className="text-4xl font-bold mb-2 text-foreground">
                Shubham Kushvanshi
              </h2>
              <p className="text-xl text-accent font-semibold mb-4">
                MERN Stack Developer
              </p>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <span>shubhamkushvanshi@gmail.com</span>
                <span>•</span>
                <a href="https://linkedin.com/in/shubham-kushvanshi" className="hover:text-primary transition-colors">
                  LinkedIn
                </a>
                <span>•</span>
                <a href="https://github.com/Kushvanshi-Shubh" className="hover:text-primary transition-colors">
                  GitHub
                </a>
              </div>
            </div>

            <section className="mb-10">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Professional Summary
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A highly motivated and skilled MERN Stack Developer with a strong foundation in React.js and Next.js 
                with Node.js, Express.js, and RESTful API development. Eager to contribute to a forward-thinking fintech 
                startup, bringing a passion for building scalable, secure, and high-performance backend systems. Proven 
                ability to quickly learn and apply new technologies, with hands-on experience in database management and 
                a keen interest in contributing to the future of financial technology.
              </p>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Technical Skills
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-accent">Backend:</span>
                  <span className="text-muted-foreground ml-2">
                    Node.js, Express.js, RESTful APIs, API Security, Microservices, Prisma, Mongoose, JWT
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-accent">Frontend:</span>
                  <span className="text-muted-foreground ml-2">
                    React.js, Next.js, HTML, CSS, JavaScript, TypeScript
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-accent">Databases:</span>
                  <span className="text-muted-foreground ml-2">
                    PostgreSQL, MongoDB
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-accent">Cloud & DevOps:</span>
                  <span className="text-muted-foreground ml-2">
                    AWS (basic), Git, WebSockets, Postman
                  </span>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Education
              </h3>
              <div>
                <p className="font-semibold text-foreground">
                  IILM College of Engineering & Technology, Greater Noida
                </p>
                <p className="text-muted-foreground">
                  Bachelor of Technology, Computer Science
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
