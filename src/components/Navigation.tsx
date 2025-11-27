import { NavLink } from "@/components/NavLink";
import { Home, User, Briefcase, FolderGit2, Code2, FileText, Mail } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import PerformanceToggle from "./PerformanceToggle";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/experience", label: "Experience", icon: Briefcase },
  { to: "/projects", label: "Projects", icon: FolderGit2 },
  { to: "/skills", label: "Skills", icon: Code2 },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/contact", label: "Contact", icon: Mail },
];

export default function Navigation() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold gradient-text text-3d">
            SK
          </NavLink>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="text-primary"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-2">
              <PerformanceToggle />
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex gap-2 items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="text-primary"
              >
                <item.icon className="h-5 w-5" />
              </NavLink>
            ))}
            <PerformanceToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
