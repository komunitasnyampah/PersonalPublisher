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

## JavaScript Interactive System

### Comprehensive Interactive Features (Added June 29, 2025)

**1. Event Listeners System**
- Click events for buttons and navigation elements
- Input events for search and form fields
- Scroll events for lazy loading and parallax effects
- Resize events for responsive behavior
- Keyboard events (ESC to close modals)

**2. Form Handlers & Validation**
- Real-time form validation with error messages
- Email format validation using regex
- Password strength checking
- Required field validation
- Form submission with data processing
- Dynamic error state management

**3. Variables & State Management**
- User data persistence (nama, email, level, poin)
- NyampahCoin balance system
- Search history tracking
- Theme preference storage
- Session state management

**4. Conditional Logic (IF/ELSE)**
- Login status checks before actions
- Balance validation for transactions
- Permission-based feature access
- Dynamic UI updates based on user level
- Content filtering based on categories

**5. Looping & Animations**
- Counter animations for statistics
- Progress bar animations
- Typewriter effect for hero titles
- Auto-scroll carousels for content
- Batch processing of DOM elements

**6. Modal & UI Components**
- Login/Register modals with validation
- Comment submission modal
- User profile management
- Contact form modal
- Theme toggle functionality
- Notification system (success, error, warning, info)

**7. Local Storage Integration**
- User preferences persistence
- Theme settings storage
- Search history caching
- Form data backup
- Session recovery

**8. Interactive Demo Page**
- Complete showcase of all JS features at `/demo`
- Real-time testing of event listeners
- Form validation demonstrations
- Animation controls and examples
- Console commands for development testing

**9. Professional CV/Portfolio System**
- Complete profile page at `/profile` with CV-ready layout
- Download CV as PDF functionality with print optimization
- Real-time profile editing with auto-save
- Portfolio projects showcase with filtering and modals
- Skills interaction with visual feedback and detailed tooltips
- Social media integration tracking
- Professional sections: Experience, Education, Achievements, Contact
- Print-friendly version with optimized styling
- Share profile functionality with clipboard integration

**10. Document Management System**
- Secure ID document storage at `/documents` with local encryption
- Support for KTP, SIM, Passport, NPWP, BPJS, Bank accounts
- Document visibility toggle and clipboard copy functionality
- Expiry date tracking with visual warnings
- Related links storage for document verification
- Export functionality for backup purposes
- Search and filter capabilities by type and importance level

**11. Letter Generator System**
- Professional letter templates for various purposes
- Cover letters, resignation letters, recommendation letters
- Permission requests, complaints, and general applications
- Variable-based template system with form auto-fill
- Real-time preview and content generation
- Save, edit, and reuse letter functionality
- Print-optimized formatting with professional styling
- Export as text files and clipboard integration

### File Structure for JavaScript
```
client/public/js/
├── dom-access.js          # Basic DOM element access utilities
├── interactive-features.js  # Main interactive system class
├── interactive-modals.js   # Modal components and handlers
└── cv-interactive.js       # CV/Portfolio interactive features
```

### Usage Examples
```javascript
// Basic Interactive Features
changeHeroTitle("Judul Baru!");
addPoin(50);
showNotif("Success message!", "success");
nyampahInteractive.toggleTheme();
interactiveModals.showModal("login-modal");

// CV/Portfolio Features
downloadCV();                    // Download CV as PDF
shareProfile();                  // Share profile link
toggleEditMode();               // Enable/disable editing
setProjectsView("grid");        // Change projects layout
filterProjects("web");          // Filter projects by category
cvInteractive.showSkillDetails("React");  // Show skill details

// Document Management Features
document.getElementById("add-document-btn").click();  // Add new document
// Access ID Manager and Letter Generator at /documents
```

## Changelog

Changelog:
- June 29, 2025. **Document Management & Letter Generator System:**
  - Created comprehensive document management system at `/documents`
  - Built secure ID storage for KTP, SIM, Passport, NPWP, BPJS, bank accounts
  - Implemented document visibility toggle and expiry date tracking
  - Added related links storage and export functionality
  - Created professional letter generator with multiple templates
  - Built template system for cover letters, resignation, recommendations
  - Added permission requests, complaints, and application templates
  - Implemented variable-based form system with real-time preview
  - Created save/load functionality with localStorage persistence
  - Added print optimization and export capabilities for letters
- June 29, 2025. **Professional CV/Portfolio System:**
  - Created comprehensive profile page at `/profile` with professional CV layout
  - Built modular CV components (Experience, Education, Skills, Projects, Achievements)
  - Implemented CV-specific JavaScript interactive system (cv-interactive.js)
  - Added download CV as PDF functionality with print optimization
  - Created real-time profile editing with auto-save capabilities
  - Built portfolio projects showcase with filtering and modal details
  - Added skills interaction with visual feedback and tooltips
  - Integrated social media tracking and share profile functionality
  - Designed print-friendly version with optimized styling for CV printing
  - Added DOM structure with IDs and data attributes for full interactivity
- June 29, 2025. **JavaScript Interactive System Implementation:**
  - Built comprehensive event listener system for all user interactions
  - Implemented form handlers with real-time validation (email, password, required fields)
  - Created variables and state management for user data, coins, and preferences
  - Added conditional logic for login checks, balance validation, and permissions
  - Developed looping animations (counters, progress bars, typewriter effects)
  - Built modal system (login, register, comment, profile, contact)
  - Integrated local storage for user preferences and data persistence
  - Created interactive demo page at `/demo` showcasing all features
  - Added console commands for development testing and debugging
- June 29, 2025. Initial setup
- December 29, 2024. **Nyampah Bersama Branding & DOM Structure Update:**
  - Updated branding from "EcoConnect" to "Nyampah Bersama" with custom logo
  - Added comprehensive DOM ID structure for all major elements
  - Implemented JavaScript DOM access utilities
  - Added 9 sample posts in Indonesian with environmental themes
  - Enhanced SEO with Indonesian meta tags and Open Graph
  - Added structured HTML for better accessibility

## User Preferences

Preferred communication style: Simple, everyday language.
Project Language: Indonesian (Bahasa Indonesia)
Project Theme: Environmental waste management community blog