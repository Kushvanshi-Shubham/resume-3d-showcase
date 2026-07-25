## Goal

Sync the portfolio with the newly uploaded resume (`Shubham.Kushvanshi.pdf`): replace the downloadable PDF, refresh V2 Retail experience details, expand projects, update skills and home-page stats.

## 1. Replace resume PDF

- Copy `user-uploads://Shubham.Kushvanshi.pdf` → `public/Shubham_Kushvanshi_Resume.pdf` (overwriting the outdated file). The Resume page's Download / View-in-new-tab buttons already point to this filename, so no code change needed there.

## 2. Home page (`src/pages/Home.tsx`) — stats

- Years Experience: `1.5+` → `Nothing to chnage`
- Projects Completed: `5+` → `10+` (5 major V2 work modules + 4 personal projects).
- Technologies Mastered: `5+` → `10+` (matches expanded stack).

## 3. Resume page (`src/pages/Resume.tsx`) — content preview

Update the on-page rendered summary to match the new PDF:

- Title: `MERN Stack Developer` → `Full Stack Developer`.
- Rewrite Professional Summary to the enterprise / SAP / Snowflake / AI phrasing from the new resume.
- Rebuild Technical Skills groups:
  - Languages: JavaScript, TypeScript, SQL, Python
  - Frontend: React.js, Next.js, HTML5, CSS3, Tailwind CSS, Shadcn UI, Ant Design
  - Backend: Node.js, Express.js, REST APIs, JWT, Prisma, Mongoose, Supabase Edge Functions, Deno
  - Databases: PostgreSQL, MongoDB, SQL Server, Snowflake, Redis
  - Cloud & DevOps: Azure ACR, IIS, Cloudflare R2, GitHub Actions, Supabase Realtime
  - Enterprise: SAP RFC, SAP OData, ETL Pipelines, Data Engineering, WebSockets, Microservices, Git, Postman
- Keep Education section as-is.
- Add Certifications block (Full Stack Web Development, Full Stack Web3 Development, Ethereum Blockchain Developer — all Udemy).

## 4. Experience page (`src/pages/Experience.tsx`)

Expand the V2 Retail entry to reflect the 5 achievements from the new resume:

1. V2 SRM Portal — 200+ vendors, procurement lifecycle, 150+ Supabase Edge Functions, 260K+ SAP records, 5+ SAP RFC modules.
2. Data Engineering (SAP → Snowflake) — Python ETL, 25+ tables, 700M+ rows, 3.5M rows/min bulk load.
3. PO Wise Wardrobe — SAP-integrated PO planning, RBAC approvals, Open-To-Buy dashboard, Excel bulk upload.
4. Azure DAB Deployment Manager — CRUD, deployment automation, Docker → Azure ACR, IIS.
5. AI Fashion Attribute Extractor — kept, refined description with Redis caching + RBAC.

- Update tech stack chips to include: React, TypeScript, Node.js, Express.js, PostgreSQL, Supabase, Cloudflare R2, SAP RFC, SAP OData, Snowflake, Python, Pandas, Azure ACR, IIS, SQL Server, Redis, GitHub Actions, WhatsApp Business API, Ant Design, Prisma.
- Leave IndiGG entry as-is (minor copy polish only).

## 5. Projects data (`src/data/projects.ts`)

Keep the four existing personal projects (BrainTox, RBAC, Web Chat, MiniPaytm) and refresh their descriptions/tech stacks to match the resume (e.g., RBAC → Next.js + Supabase + PostgreSQL; BrainTox → adds React/TS/Tailwind/Shadcn). Add one new showcase entry for the flagship work project so total = 5:

- **V2 SRM Portal** (status: completed, year: 2025, no public links — enterprise). Description mirrors the resume bullet; tech: React, TypeScript, Node.js, PostgreSQL, Supabase, Cloudflare R2, SAP RFC, WhatsApp Business API.

This keeps the Projects page and ProjectShowcase auto-populated via the shared data file.

## 6. Skills page (`src/pages/Skills.tsx`)

Rebuild `skillCategories` to match resume groupings:

- Languages: JavaScript, TypeScript, SQL, Python
- Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Shadcn UI, Ant Design
- Backend: Node.js, Express.js, REST APIs, JWT, Prisma, Mongoose, Supabase Edge Functions, Deno
- Databases: PostgreSQL, MongoDB, SQL Server, Snowflake, Redis
- Cloud & DevOps: Azure ACR, IIS, Cloudflare R2, GitHub Actions, Supabase Realtime
- Enterprise & Tools: SAP RFC, SAP OData, ETL Pipelines, WebSockets, Microservices, Git, Postman
- Remove outdated Web3/Ethereum/Blockchain skill bars (they were tied to old beta-tester era); keep certifications block noting Web3 background.

## 7. Background animations

User asked to "check" background animations. The 3D hero + auto-scrolling ProjectShowcase already exist and are functioning. ProjectShowcase pulls from `src/data/projects.ts`, so updating projects (step 5) will naturally refresh what scrolls. No animation code changes planned unless issues surface after the data update.

## Technical notes

- Only frontend/content changes; no backend, DB, or route changes.
- One binary copy (`cp /mnt/user-uploads/Shubham.Kushvanshi.pdf public/Shubham_Kushvanshi_Resume.pdf`).
- Memory metrics (`experience-metric`, `project-count-metric`) will need updating after implementation.