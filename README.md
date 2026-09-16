# Rudra Next.js 15 Project

This project was bootstrapped with [Next.js 15](https://nextjs.org/) using the App Router, TypeScript, Tailwind CSS, ESLint, and [shadcn/ui](https://ui.shadcn.com/).

## Tech Stack & Installed Packages

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Neutral base theme)
- **Animations**: `framer-motion`
- **Email**: `resend`
- **AI Integration**: `groq-sdk`
- **Validation**: `zod`

## Directory Structure

```text
.
├── app/                  # Next.js App Router routes, pages, and global styles
│   ├── globals.css       # Tailwind CSS & shadcn/ui base styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main landing page
├── components/           # React components
│   ├── chatbot/          # Chatbot components (placeholder)
│   ├── hero/             # Hero section components (placeholder)
│   └── ui/               # shadcn/ui atomic components (e.g. button.tsx)
├── emails/               # Email templates (placeholder)
├── lib/                  # Utility functions and SDK instances
│   ├── ai/               # Groq SDK / AI helper functions (placeholder)
│   ├── email/            # Resend client helper functions (placeholder)
│   └── utils.ts          # Classname merger (cn utility)
├── types/                # Global TypeScript declarations (placeholder)
├── public/               # Static assets
├── components.json       # shadcn/ui configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies & scripts
└── tsconfig.json         # TypeScript compiler options
```

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint.
