import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

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
            Get In Touch
          </h1>

          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities 
            to be part of your visions. Feel free to reach out!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.a
              href="mailto:shubhamkushvanshi@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-6 hover-lift text-center"
            >
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1 text-foreground">Email</h3>
              <p className="text-sm text-muted-foreground">shubhamkushvanshi@gmail.com</p>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/shubham-kushvanshi"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-6 hover-lift text-center"
            >
              <Linkedin className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1 text-foreground">LinkedIn</h3>
              <p className="text-sm text-muted-foreground">Connect with me</p>
            </motion.a>

            <motion.a
              href="https://github.com/Kushvanshi-Shubh"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel p-6 hover-lift text-center"
            >
              <Github className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1 text-foreground">GitHub</h3>
              <p className="text-sm text-muted-foreground">Check out my code</p>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Send Me a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="glass-panel border-border"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="glass-panel border-border"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="glass-panel border-border min-h-[150px]"
                  placeholder="Your message..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full glass-panel hover-glow group">
                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Send Message
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
