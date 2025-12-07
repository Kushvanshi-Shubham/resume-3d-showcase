export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  features: string[];
  challenges: string[];
  learnings: string[];
  status: "completed" | "in-progress" | "planned";
  year: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "brainly",
    title: "BRAINLY Web App",
    description: "A secure content-sharing platform with RESTful API architecture. Features JWT authentication, MongoDB data persistence, and comprehensive user management system.",
    longDescription: "BRAINLY is a comprehensive content-sharing platform designed to facilitate secure and efficient knowledge exchange. The application implements a robust RESTful API architecture that enables seamless communication between the frontend and backend systems. With JWT-based authentication, users can securely access their content while maintaining session integrity across multiple devices.",
    techStack: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
    highlights: [
      "Secure authentication system",
      "RESTful API design",
      "Scalable data persistence",
    ],
    features: [
      "User registration and authentication with JWT tokens",
      "Content creation, editing, and sharing capabilities",
      "Role-based access control for different user types",
      "Real-time content updates and notifications",
      "Search and filter functionality for content discovery",
      "User profile management and preferences",
    ],
    challenges: [
      "Implementing secure token refresh mechanisms",
      "Designing scalable database schema for varied content types",
      "Optimizing API response times for large datasets",
    ],
    learnings: [
      "Deep understanding of JWT authentication flow",
      "Best practices for RESTful API design",
      "MongoDB indexing and query optimization",
    ],
    status: "completed",
    year: "2024",
    liveUrl: "https://brainly-fe-coral.vercel.app/",
    githubUrl: "https://github.com/Kushvanshi-Shubham/brainly-fe",
  },
  {
    id: "rbac",
    title: "RBAC Web App",
    description: "Internal administrative tool for role-based access control. Built with modern Next.js architecture and Supabase backend, featuring dynamic permission management.",
    longDescription: "The RBAC (Role-Based Access Control) Web App is an enterprise-grade administrative tool designed to manage user permissions and access levels across complex organizational structures. Built with Next.js for optimal performance and Supabase for robust backend services, this application provides a flexible and secure way to define roles, assign permissions, and audit user activities.",
    techStack: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Shadcn UI", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Role-based access control",
      "Modern UI with animations",
      "Supabase integration",
    ],
    features: [
      "Dynamic role creation and management",
      "Granular permission assignment system",
      "User hierarchy and organizational structure",
      "Audit logs for all permission changes",
      "Real-time permission updates across sessions",
      "Bulk user management capabilities",
    ],
    challenges: [
      "Designing a flexible yet secure permission model",
      "Implementing real-time permission propagation",
      "Creating an intuitive UI for complex access rules",
    ],
    learnings: [
      "Advanced TypeScript patterns for type-safe permissions",
      "Supabase RLS policies for backend security",
      "Complex state management with React hooks",
    ],
    status: "completed",
    year: "2024",
  },
  {
    id: "webchat",
    title: "Web Chat App",
    description: "Real-time messaging application with WebSocket implementation. Features live message delivery, user presence indicators, and modern React/TypeScript frontend.",
    longDescription: "The Web Chat App is a real-time messaging platform that leverages WebSocket technology to deliver instant communication experiences. Built with a modern React and TypeScript frontend, the application provides seamless message delivery, user presence detection, and an intuitive interface for both one-on-one and group conversations.",
    techStack: ["Node.js", "Express.js", "WebSocket", "React", "TypeScript"],
    highlights: [
      "Real-time communication",
      "WebSocket implementation",
      "Modern responsive UI",
    ],
    features: [
      "Instant message delivery with WebSocket connections",
      "User online/offline presence indicators",
      "Typing indicators for active conversations",
      "Message read receipts and delivery status",
      "Support for text, emoji, and file sharing",
      "Conversation history and search functionality",
    ],
    challenges: [
      "Managing WebSocket connections at scale",
      "Implementing reliable message delivery guarantees",
      "Handling offline message queuing and sync",
    ],
    learnings: [
      "WebSocket protocol and connection management",
      "Real-time state synchronization patterns",
      "Optimistic UI updates for perceived performance",
    ],
    status: "completed",
    year: "2024",
    liveUrl: "https://web-app-fe-self.vercel.app/",
    githubUrl: "https://github.com/Kushvanshi-Shubham/webApp-fe",
  },
  {
    id: "minipaytm",
    title: "MINIPAYTM",
    description: "Payment application clone demonstrating financial transaction flows. Implements secure transaction handling, user wallet management, and comprehensive backend validation.",
    longDescription: "MINIPAYTM is a payment application that replicates core functionalities of modern digital payment systems. The project demonstrates understanding of financial transaction flows, security best practices, and user experience design for sensitive financial operations. It includes wallet management, peer-to-peer transfers, and transaction history tracking.",
    techStack: ["Node.js", "Express.js", "MongoDB", "REST API"],
    highlights: [
      "Secure transaction handling",
      "Wallet management system",
      "Backend validation",
    ],
    features: [
      "Digital wallet creation and management",
      "Peer-to-peer money transfers",
      "Transaction history with detailed records",
      "Balance inquiry and statement generation",
      "Multi-factor authentication for transactions",
      "Transaction limits and security controls",
    ],
    challenges: [
      "Ensuring transaction atomicity and consistency",
      "Implementing secure payment flow patterns",
      "Building fraud detection mechanisms",
    ],
    learnings: [
      "Financial application security requirements",
      "Database transaction management",
      "Building trust through UX in financial apps",
    ],
    status: "completed",
    year: "2024",
    liveUrl: "https://mini-paytm-fe.vercel.app/",
    githubUrl: "https://github.com/Kushvanshi-Shubham/MiniPaytm-FE",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};
