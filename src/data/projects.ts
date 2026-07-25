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
    id: "v2-srm-portal",
    title: "V2 SRM Portal",
    description:
      "Enterprise-scale Supplier Relationship Management platform connecting 200+ vendors with buyers, QC teams, and category managers. Automates the full procurement lifecycle with deep SAP integration.",
    longDescription:
      "The V2 SRM Portal is a production-grade Supplier Relationship Management platform built at V2 Retail to automate the complete procurement lifecycle. It connects 200+ vendors with buyers, quality control teams, and category managers, orchestrating Purchase Orders, ASN, Quality Control, Goods Receipt (GRC), and TNA milestone tracking end-to-end. The system is powered by 150+ Supabase Edge Functions handling 260K+ SAP records with real-time synchronization, and integrates 5+ SAP RFC modules along with WhatsApp Business API for vendor communication.",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Cloudflare R2",
      "SAP RFC",
      "WhatsApp Business API",
    ],
    highlights: [
      "200+ vendors onboarded",
      "150+ Supabase Edge Functions",
      "260K+ SAP records synchronized",
      "5+ SAP RFC module integrations",
    ],
    features: [
      "Automated Purchase Order lifecycle management",
      "Advanced Shipping Notice (ASN) workflow",
      "Quality Control and Goods Receipt (GRC) tracking",
      "TNA milestone tracking with alerts",
      "Real-time SAP synchronization via RFC modules",
      "WhatsApp Business API notifications to vendors",
    ],
    challenges: [
      "Handling 260K+ SAP records with reliable real-time sync",
      "Orchestrating 150+ serverless edge functions cohesively",
      "Designing a permission model spanning vendors, QC, and category managers",
    ],
    learnings: [
      "Building large-scale Supabase Edge Function architectures",
      "SAP RFC integration patterns and error handling",
      "Enterprise procurement domain workflows",
    ],
    status: "completed",
    year: "2025",
  },
  {
    id: "braintox",
    title: "BRAINTOX Web App",
    description: "Secure second-brain knowledge management platform with JWT authentication, content sharing, link management, and responsive dashboards.",
    longDescription: "BrainTox is a secure second-brain knowledge management platform for organizing, sharing, and revisiting content. It features JWT authentication, link and note management, content sharing capabilities, and responsive dashboards built with a modern React + TypeScript stack backed by MongoDB.",
    techStack: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "Tailwind CSS", "Shadcn UI", "JWT"],
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
    liveUrl: "https://braintox-fe-coral.vercel.app/",
    githubUrl: "https://github.com/Kushvanshi-Shubham/brainly-fe",
  },
  {
    id: "rbac",
    title: "RBAC Configuration Tool",
    description: "Role-based access management application enabling administrators to manage users, permissions, and authentication with Supabase.",
    longDescription: "The RBAC Configuration Tool is a role-based access management application that lets administrators manage users, permissions, and authentication flows. Built with Next.js and Supabase, it provides a flexible and secure way to define roles, assign granular permissions, and audit user activities.",
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Shadcn UI"],
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
