# Architecture Documentation

## Overview

This project is a full-stack web application for "Pepper Chicken Nig Ltd", a Nigerian restaurant. It features a React-based frontend with a modern UI using shadcn/ui components, an Express.js backend, and a PostgreSQL database managed with Drizzle ORM.

The application follows a client-server architecture with clear separation of concerns:
- Client-side rendering with React for the frontend
- RESTful API provided by Express for the backend
- PostgreSQL with Drizzle ORM for data persistence

## System Architecture

### Frontend Architecture

The frontend is built with:
- **React**: For UI components and state management
- **TailwindCSS**: For styling with a utility-first approach
- **shadcn/ui**: For UI components based on Radix UI primitives
- **Wouter**: For lightweight client-side routing
- **React Query**: For data fetching, caching, and state management

The frontend follows a component-based architecture with reusable UI components. Pages are organized in a hierarchical structure with shared components for common UI elements.

### Backend Architecture

The backend is built with:
- **Express.js**: For handling HTTP requests and serving the API
- **Node.js**: As the runtime environment
- **Drizzle ORM**: For database interactions with type safety
- **TypeScript**: For type safety across the application

The backend follows a RESTful architecture with API endpoints organized by resource.

### Database Architecture

The database layer uses:
- **PostgreSQL**: As the relational database
- **Drizzle ORM**: For type-safe database queries and schema management
- **Zod**: For validation schemas that integrate with Drizzle

The schema is defined in TypeScript and managed through Drizzle migration tools.

## Key Components

### Frontend Components

1. **Pages**: 
   - Home: Landing page with hero slider, featured dishes, and testimonials
   - Menu: Displays menu items categorized by type
   - About: Information about the restaurant
   - Contact: Contact form and location information

2. **UI Components**:
   - Shared components like Navbar, Footer
   - Feature-specific components (MenuGrid, HeroSlider, etc.)
   - Generic UI components from shadcn/ui

3. **Data Management**:
   - React Query for API data fetching
   - Local state management with React hooks

### Backend Components

1. **API Routes**:
   - `/api/meals`: Endpoints for retrieving meal information
   - `/api/meals/featured`: Endpoint for featured meals
   - `/api/meals/:id`: Endpoint for specific meal details
   - `/api/meals/category/:category`: Endpoint for category-filtered meals
   - `/api/contact`: Endpoint for contact form submission

2. **Storage Layer**:
   - Interface for database operations
   - Implementation for in-memory and PostgreSQL storage

3. **Server Configuration**:
   - Vite integration for development
   - Static file serving for production

## Data Flow

### Client-Server Communication

1. **Data Fetching**:
   - Frontend components use React Query to fetch data from the API
   - API endpoints return JSON data
   - Error handling and loading states managed by React Query

2. **Form Submissions**:
   - Contact form data submitted via POST requests
   - Validation performed on both client and server sides

### Database Operations

1. **Read Operations**:
   - API endpoints query the database using Drizzle ORM
   - Results are transformed to JSON and returned to the client

2. **Write Operations**:
   - API endpoints validate incoming data using Zod schemas
   - Validated data is persisted to the database using Drizzle ORM

## External Dependencies

### Frontend Dependencies

- **UI Framework**: React with shadcn/ui components
- **Styling**: TailwindCSS
- **Routing**: Wouter
- **Data Fetching**: TanStack React Query
- **Icons**: Lucide React, Font Awesome

### Backend Dependencies

- **Web Framework**: Express.js
- **Database ORM**: Drizzle ORM
- **Database Driver**: @neondatabase/serverless
- **Validation**: Zod
- **Session Management**: connect-pg-simple (for PostgreSQL sessions)

## Deployment Strategy

The application is configured for deployment on Replit, with specific configuration in the `.replit` file. The deployment process includes:

1. **Build Process**:
   - Frontend: Vite builds the React application to static assets
   - Backend: esbuild bundles the server code to ESM format

2. **Runtime Environment**:
   - Node.js 20 with PostgreSQL 16 database
   - Environment variables for configuration
   - Production mode configuration

3. **Scaling**:
   - Configured for autoscaling on Replit's infrastructure
   - Port 5000 mapped to external port 80

4. **Development Workflow**:
   - Development server with hot module reloading
   - Integrated error overlay for runtime errors
   - Cartographer for source mapping in development

The deployment configuration includes separate commands for development (`npm run dev`) and production (`npm run start`), with appropriate environment variables set for each environment.