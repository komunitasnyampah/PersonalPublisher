# EcoConnect Community Blog

## Overview

EcoConnect is a full-stack community blog platform focused on environmental sustainability, renewable energy, and decentralized technology. The application features a modern React frontend with shadcn/ui components and an Express.js backend using Drizzle ORM with PostgreSQL.

## System Architecture

### Monorepo Structure
The project follows a monorepo pattern with clear separation of concerns:

- **client/**: React frontend application with TypeScript
- **server/**: Express.js backend API with TypeScript
- **shared/**: Common schema definitions and types used by both frontend and backend

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for development and building
- shadcn/ui component library with Radix UI primitives
- TailwindCSS for styling with custom eco-friendly color scheme
- TanStack Query for state management and API calls
- Wouter for lightweight routing

**Backend:**
- Express.js with TypeScript
- Drizzle ORM for database operations
- PostgreSQL as the primary database
- Neon Database for serverless PostgreSQL hosting
- Session-based architecture preparation

**Development Tools:**
- ESBuild for production bundling
- PostCSS with Autoprefixer
- Custom Vite plugins for Replit integration

## Key Components

### Database Schema
The application uses a relational database schema with the following core entities:

- **Users**: User profiles with stats tracking (posts count, followers)
- **Categories**: Content categorization with slugs and color coding
- **Posts**: Blog posts with rich metadata (views, likes, featured status)
- **Comments**: Threaded comment system with nested replies
- **Tags**: Flexible tagging system with many-to-many relationships

### Frontend Architecture
- **Component-based design** using shadcn/ui primitives
- **Page-based routing** with dedicated pages for home, dashboard, writing, and post viewing
- **Responsive design** with mobile-first approach
- **Theme system** supporting both light and dark modes with eco-friendly color palette

### Backend API Design
- **RESTful API** structure with clear endpoint organization
- **Modular storage layer** with interface-based design for easy testing and migration
- **Error handling middleware** with proper HTTP status codes
- **Request logging** for development monitoring

## Data Flow

### Post Creation Flow
1. User accesses `/write` route
2. PostEditor component renders form with validation
3. Form submission triggers API request to `/api/posts`
4. Backend validates data using Zod schemas
5. Post is created in database with auto-generated slug
6. Frontend updates cache and redirects to new post

### Content Consumption Flow
1. Home page fetches posts with optional filtering
2. Posts are displayed with category badges and engagement metrics
3. User can click through to individual post pages
4. Post views are automatically incremented
5. Comments and interactions are loaded dynamically

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **zod**: Runtime type validation

### Development Dependencies
- **vite**: Fast development server and build tool
- **tsx**: TypeScript execution for development
- **tailwindcss**: Utility-first CSS framework

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds client code to `dist/public`
2. **Backend**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations are applied via `db:push` command

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Separate development and production configurations
- Static asset serving for production builds

### Production Setup
- Single Node.js process serving both API and static files
- Middleware chain handles API routes before falling back to static files
- Environment-based configuration switching

## Changelog

Changelog:
- June 29, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.