# Overview

This is a modern full-stack web application built with React frontend and Express backend, featuring a tech-focused corporate website with an admin dashboard. The application showcases services like SaaS development, AI/ML solutions, and security services with a futuristic neon design theme. It includes contact form functionality and administrative features for managing contacts and viewing analytics.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with custom CSS variables for a dark neon theme
- **UI Components**: Radix UI components with shadcn/ui for consistent, accessible design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database Layer**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Storage Strategy**: Dual storage implementation with in-memory storage for development and database storage for production
- **API Design**: RESTful endpoints following conventional HTTP methods and status codes
- **Error Handling**: Centralized error handling middleware with structured error responses

## Database Design
- **Schema Definition**: Centralized schema in `shared/schema.ts` using Drizzle ORM
- **Tables**: Users, contacts, admin stats, and activities with proper relationships
- **Validation**: Zod schemas for runtime type checking and validation
- **Migrations**: Drizzle Kit for database migrations and schema management

## Development Setup
- **Monorepo Structure**: Client, server, and shared code in separate directories
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Development Server**: Vite dev server with Express API integration
- **Hot Reload**: Full-stack hot reload for rapid development

## Design System
- **Theme**: Dark mode with neon accent colors (cyan, purple, green)
- **Typography**: Custom font stack with Geist, Inter, and Fira Code
- **Components**: Modular UI components with consistent styling patterns
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

# External Dependencies

## Database
- **Neon Serverless**: PostgreSQL database hosting service for production
- **Drizzle ORM**: Type-safe ORM for database operations and migrations

## UI Libraries
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Lucide React**: Modern icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework for styling

## Development Tools
- **Replit Integration**: Vite plugins for Replit development environment
- **Three.js**: 3D graphics library loaded via CDN for background animations
- **Font Awesome**: Icon library for social media and technology icons

## Form Handling
- **React Hook Form**: Performant form library with minimal re-renders
- **Hookform Resolvers**: Integration layer for validation libraries
- **Zod**: TypeScript-first schema validation library

## State Management
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight routing library for single-page application navigation

## Build and Development
- **Vite**: Modern build tool with fast HMR and optimized production builds
- **ESBuild**: Fast bundler for server-side code compilation
- **TypeScript**: Static type checking for enhanced development experience