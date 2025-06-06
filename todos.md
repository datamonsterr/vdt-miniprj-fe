# Initial setup
- [x] Add react router
- [x] Add tailwindCss
- [x] Setup shadcn
- [x] Add neccessary cursor rules
- [x] Structure our code

# Authentication & Context Setup (4 hours)
- [x] Create auth context with Clerk integration (AuthContext.tsx, AuthProvider.tsx, AuthConsumer.tsx)
- [x] Add authentication hook for managing user state
- [x] Create protected route wrapper component
- [x] Add sign-in/sign-out UI components using shadcn

# Core Types & Models (3 hours)
- [x] Define database schema types (Table, Column, DataType, Relationship)
- [x] Add SQL data types (VARCHAR, INT, BOOLEAN, etc.)
- [x] Create drag and drop interface types (ToolType, SchemaBuilderState)

# UI Components Library (8 hours)
- [ ] Add shadcn card, input, select, dialog, dropdown-menu components
- [ ] Create reusable Modal component for forms
- [ ] Build DragHandle component for draggable elements
- [ ] Create ConfirmationDialog component
- [ ] Build Toast notification system
- [ ] Add Loading spinner and skeleton components
- [ ] Create ResizablePanel component for layout adjustments
- [ ] Build ContextMenu component for right-click actions

# Database Builder Components (12 hours)
- [x] Create Table component with drag/drop functionality
- [x] Build Column component with data type selection
- [x] Add DataTypeSelector dropdown with SQL types (VARCHAR, INT, BOOLEAN, etc.)
- [x] Create ColumnDialog for editing column details (name, type, constraints)
- [x] Build TableCreationDialog for new table wizard
- [x] Create DatabaseCanvas as main workspace container with grid pattern
- [x] Create Toolbar with toggle tools (Select, Table, Column, Connection)
- [x] Enhanced ConnectionLine with selection/deletion functionality, smaller arrows, external positioning
- [ ] Build TablePropertiesPanel for table configuration
- [ ] Add RelationshipConnector for linking tables (visual connections)
- [ ] Create DatabaseToolbar with save/load/export actions
- [ ] Add TableList sidebar for navigation
- [ ] Build ValidationMessages component for error display

# Drag & Drop System (6 hours)
- [x] Install and configure @dnd-kit packages (core, sortable, utilities)
- [x] Create DragProvider context for drag state management
- [x] Build useDragAndDrop hook for drag logic
- [x] Add drag preview components (Draggable, Droppable, SortableItem)
- [x] Create demo page to test drag and drop functionality
- [ ] Create drop zones for tables and columns
- [ ] Implement drag validation and constraints

# Database Logic & State Management (8 hours)
- [x] Connection management system (create, select, delete foreign keys)
- [x] Undo/Redo functionality with Zustand + Zundo and keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z, Ctrl+Y)
- [ ] Create DatabaseContext for managing database state
- [ ] Build useDatabaseActions hook for CRUD operations
- [ ] Add table creation/deletion logic
- [ ] Implement column add/remove/edit functionality
- [ ] Add database validation rules
- [ ] Create database serialization/deserialization logic

# Main Views & Pages (6 hours)
- [x] Create SchemaBuilder main page component
- [x] Build complete schema builder interface with tools and canvas
- [x] Add routing for schema builder views  
- [x] Add Dashboard page for authenticated users
- [ ] Create DatabaseListPage for managing multiple databases
- [ ] Build DatabasePreviewPage for viewing created schemas

# Integration & Export Features (4 hours)
- [ ] Create database schema export functionality (SQL, JSON)
- [ ] Add schema import from JSON
- [ ] Build schema preview with formatted output
- [ ] Create shareable database links

# Web Component Integration (3 hours)
- [x] Create EmbeddableDashboard component for other apps
- [x] Create self-contained embeddable components that work without external dependencies
- [ ] Build iframe communication system for embedding
- [x] Add web component build configuration
- [x] Create NPM package setup for distribution

# Testing & Quality (4 hours)
- [ ] Add unit tests for core database logic
- [ ] Create integration tests for drag & drop
- [ ] Add tests for authentication flow
- [ ] Build E2E tests for main user journey

# Documentation & Polish (3 hours)
- [x] Create comprehensive embeddable components documentation
- [ ] Create component documentation with Storybook setup
- [ ] Add TypeScript documentation comments
- [ ] Build usage examples for web component integration
- [ ] Create deployment documentation

# Performance & Optimization (2 hours)
- [ ] Add lazy loading for heavy components
- [ ] Optimize re-renders with React.memo
- [ ] Implement virtual scrolling for large table lists

# Error Handling & UX (3 hours)
- [ ] Add comprehensive error boundaries
- [ ] Create user-friendly error messages
- [ ] Add form validation with helpful feedback
- [ ] Implement auto-save functionality

**Total Estimated Time: 65 hours**

## Recently Completed ✅

- **Theme Context Consolidation** (2024-01-03): Successfully removed the schema-builder-theme context and consolidated all theming to use the regular ThemeContext.tsx:
  - **Removed Separate Theme Context**: Deleted the entire `src/contexts/schema-builder-theme/` directory and all related files
  - **Updated Schema Builder Components**: Modified all schema builder components to use the regular `useTheme` hook from `@/contexts/theme/ThemeContext`
  - **Updated Theme Toggle**: Changed `SchemaBuilderThemeToggle` component to use the regular theme context instead of separate schema builder theme
  - **Updated Providers**: Modified `SchemaCanvasProvider` to use `ThemeProvider` instead of `SchemaBuilderThemeProvider`
  - **Updated Exports**: Removed schema-builder-theme exports from `src/index.ts` and kept only the regular theme context exports
  - **Updated Documentation**: Cleaned up README.md and EmbeddableDashboard-Usage.md to remove references to SchemaBuilderThemeProvider
  - **Maintained Functionality**: All theming functionality preserved while simplifying the architecture
  - **Single Source of Truth**: Now using only one theme context for the entire VDT dashboard, eliminating complexity and reducing bundle size
  - **Better Integration**: VDT dashboard theme now properly integrates with the host application's theme system

- **Component Architecture Restructuring** (2024-01-03): Successfully broke down monolithic components into smaller, manageable pieces following proper architecture patterns:
  - **VDT Dashboard Section Restructuring**: Moved the large VDTDashboard component from `src/components/vdt-dashboard.tsx` into `src/sections/vdt-dashboard/` with proper separation:
    - **Types**: Extracted all interfaces and types into `types.ts` with clear type definitions
    - **Auth Context**: Separated authentication logic into `auth-context.tsx` with provider and hooks
    - **Reusable Components**: Moved `LoadingSpinner` and `ErrorFallback` to `@/components` since they can be used across the app
    - **View Components**: Created individual view components (`HomeView`, `DashboardMainView`, `SchemaBuilderView`, `DemoView`, `LoginView`, `SignUpView`, `NotFoundView`) in `views/` folder
    - **Feature Components**: Created specialized components (`DashboardNavigation`, `DashboardContent`, `ProtectedView`) in `components/` folder
    - **Main Component**: Clean `VDTDashboard.tsx` that orchestrates all the smaller components
    - **Index Exports**: Comprehensive `index.ts` with all exports for both basic and advanced usage
  - **Schema Builder Section Restructuring**: Broke down `StandaloneSchemaCanvas` into modular components in `src/sections/schema-builder/`:
    - **Provider Component**: Created `SchemaCanvasProvider` to wrap all necessary contexts (theme, drag-drop) 
    - **Container Component**: Created `SchemaCanvasContainer` for main canvas interactions (click, drag, pan, table rendering)
    - **Main Component**: Refactored `SchemaCanvas` to orchestrate toolbar, dialogs, and canvas container
    - **Types**: Moved all schema-related interfaces to `types.ts`
    - **Updated StandaloneSchemaCanvas**: Now uses the new modular architecture with proper provider wrapping
  - **Import Path Updates**: Updated all import references to use the new section-based structure
  - **Component Index Updates**: Updated `src/components/index.ts` and `src/index.ts` to export from the new sections
  - **Maintained Functionality**: All existing functionality preserved while improving maintainability and modularity
  - **Clean Architecture**: Each component now has a single responsibility and clear boundaries
  - **Better Testability**: Smaller components are easier to test and maintain

- **Critical Clerk Provider Fix** (2024-06-06): Fixed the Clerk authentication error that occurred when using the VDTDashboard without a Clerk key:
  - **Problem**: The InternalAuthProvider was calling useClerkAuth() even when no ClerkProvider was present
  - **Solution**: Made Clerk hook usage conditional based on hasClerkProvider prop
  - **Result**: VDTDashboard now works perfectly with and without Clerk authentication
  - **Published**: Version 1.1.2 with the fix is now live on npm

- **Complete Library Restructuring and Web Component Creation** (2024-06-06): Successfully transformed the project into a clean, publishable library focused on the VDTDashboard web component:
  - **Project Restructuring**: Removed app-specific files (pages/, layouts/, router.tsx, App.tsx, main.tsx, index.html) while preserving all reusable library components
  - **Enhanced Demo Experience**: Completely redesigned the DemoView with interactive schema canvas, live data display, usage examples, and working sample schemas
  - **Sample Data Library**: Created comprehensive sample data (sampleTables, sampleForeignKeys, simpleSampleTables, simpleSampleForeignKeys) for demos and testing
  - **Comprehensive Export Structure**: Updated src/index.ts to export all necessary components, types, hooks, and utilities:
    - Primary: VDTDashboard (main web component)
    - Advanced: StandaloneSchemaCanvas, SchemaCanvas
    - Types: Table, ForeignKey, Column, SQLDataType
    - Contexts: ThemeProvider and its consumers
    - Hooks: useTheme
    - Sample data for testing and demos
  - **TypeScript Declaration Generation**: Fixed build process to generate proper .d.ts files with tsconfig.lib.json and updated build scripts
  - **Library-Focused Build System**: Optimized Vite configuration for library builds with proper external dependencies and CSS handling
  - **Updated Documentation**: Completely revised EmbeddableDashboard-Usage.md to reflect new VDTDashboard component with:
    - Installation instructions via yarn/npm
    - Comprehensive API documentation with all props
    - Authentication setup guide for Clerk integration
    - Advanced usage examples for all exported components
    - Integration examples for different use cases
    - TypeScript usage examples
  - **Ready for Publishing**: Library now builds successfully with all TypeScript declarations and is ready for npm publishing
  - **Backward Compatibility**: All existing functionality preserved while making it properly embeddable in any React application

## Recently Completed ✅

- **Self-Contained VDT Dashboard with Full Provider Integration** (2024-01-02): Successfully refactored the VDT Dashboard component to be completely self-contained with all authentication, theming, routing, and error handling:
  - **Complete Provider Integration**: Moved all providers (ClerkProvider, AuthProvider, ThemeProvider) from RootLayout.tsx into the VDTDashboard component itself
  - **Internal Authentication System**: Created InternalAuthProvider and useInternalAuth hook for isolated authentication management within the dashboard
  - **Internal Routing System**: Implemented dashboard-specific routing with views: home, dashboard, schema-builder, demo, login, signup, not-found
  - **Navigation Component**: Added DashboardNavigation with contextual navigation based on authentication status
  - **Authentication Views**: Built LoginView and SignUpView components with Clerk integration using modal-based sign-in/sign-up
  - **Protected Route Logic**: Implemented ProtectedView wrapper that handles authentication checks and fallbacks
  - **Error Handling**: Added ErrorFallback component with error boundary functionality and recovery options
  - **Loading States**: Comprehensive loading spinners for authentication checks and view transitions
  - **404 Handling**: NotFoundView component for handling invalid routes within the dashboard
  - **Home View**: Welcome screen with sign-in/sign-up options and unauthenticated exploration features
  - **Optional Authentication**: Added `requireAuthForSchemaBuilder` prop to make authentication optional for schema builder access
  - **Clerk Key Management**: Optional `clerkPublishableKey` prop - dashboard works without authentication if not provided
  - **Complete Isolation**: Dashboard now works as a true library component without requiring any external setup from host applications
  - **Enhanced Props Interface**: Added new props for controlling authentication, navigation, initial views, and error handling
  - **Backward Compatibility**: All existing functionality preserved while adding new self-contained features

- **Self-Contained Embeddable Components**: Created truly embeddable components that solve external dependency issues:
  - **Problem Solved**: The original EmbeddableDashboard component required external contexts (DragDropProvider, ThemeProvider, stores) that weren't available when embedded in other projects
  - **EmbeddableVDTDashboard**: New self-contained dashboard component that includes all necessary providers internally - can be used in any React app without setup
  - **StandaloneSchemaCanvas**: Self-contained schema canvas that wraps all required contexts - perfect for inline embedding without modal
  - **Complete Isolation**: Components manage their own state, themes, and dependencies without affecting the host application
  - **Comprehensive Documentation**: Created EMBEDDABLE_GUIDE.md with complete API reference, integration examples, styling guides, and troubleshooting
  - **Library Export Structure**: Updated exports to prioritize the new self-contained components while keeping legacy components for advanced users
  - **Build Verification**: Confirmed library builds successfully and components work without external dependencies
  - **Integration Examples**: Provided examples for React Router, state management, forms, and various use cases
  - **TypeScript Support**: Full type definitions for all new components and their props
  - **Theme Isolation**: Schema builder themes are completely isolated and don't affect the host application's theme

- **NPM Library Publishing Setup**: Configured the project for publishing as an npm library:
  - **Package Configuration**: Updated package.json with proper library metadata, entry points, and peer dependencies
  - **Vite Library Build**: Configured Vite for library builds with external React dependencies and CSS extraction
  - **Export Structure**: Created comprehensive src/index.ts with all components, types, and utilities needed by consumers
  - **Documentation**: Created detailed README.md with installation, usage examples, and API documentation
  - **Build Scripts**: Added build:lib and prepublishOnly scripts for automated library building
  - **NPM Configuration**: Set up .npmignore to exclude development files and include only distribution assets
  - **TypeScript Support**: Configured proper type generation and exports for excellent IntelliSense
  - **Peer Dependencies**: Properly externalized React dependencies to avoid bundle duplication
  - **CSS Handling**: Configured CSS extraction for separate stylesheet import
  - **File Structure**: Organized exports for main EmbeddableDashboard component, advanced SchemaCanvas, types, and theme providers

- **Dashboard Component & Web Component Integration**: Created a comprehensive dashboard system:
  - **Dashboard Page**: Created `/dashboard` route as the main entry point for authenticated users with cards for different features
  - **Schema Builder Card**: Contains buttons to create database schemas and view created databases (placeholder for future implementation)
  - **Demo Card**: Provides access to the demo functionality
  - **User Settings Integration**: Moved authentication controls from schema builder to dashboard header
  - **EmbeddableDashboard Component**: Created a complete embeddable component that other applications can import and use
  - **Modal-based Interface**: Dashboard opens in a customizable modal with different size options (`sm`, `md`, `lg`, `xl`, `full`)
  - **Navigation Between Views**: Seamless navigation between dashboard, schema builder, and demo within the modal
  - **Configurable Features**: Props to control which features are shown (`showDemo`, `showViewDatabases`)
  - **Schema Change Callbacks**: Integration with parent applications via `onSchemaChange` callback
  - **Flexible Button Customization**: Customizable trigger button with different variants, sizes, and styling
  - **Authentication Separation**: Removed UserSettings from SchemaCanvas component, now handled at dashboard level
  - **Route Updates**: Updated app routing to redirect authenticated users to dashboard instead of directly to schema builder

- **Authentication System with Clerk SSO**: Implemented comprehensive authentication system with:
  - **Auth Context**: Created AuthContext, AuthProvider, and AuthConsumer components following the project structure
  - **Protected Routes**: ProtectedRoute component that redirects unauthenticated users to login
  - **Login/Signup Pages**: Beautiful login and signup pages with Clerk's SSO integration and custom styling
  - **User Settings Component**: UserSettings dropdown with avatar, profile info, and logout functionality
  - **Schema Builder Integration**: Added UserSettings component next to the theme toggle in the top-right corner
  - **Route Protection**: SchemaBuilder now requires authentication; redirects to login if not authenticated
  - **Seamless UX**: App component redirects authenticated users to schema builder, shows auth options for guests
  - **Shadcn Components**: Added dropdown-menu and avatar components from shadcn for consistent UI
- **Schema Builder Theme System**: Implemented unified theme management for the SchemaCanvas component using the regular theme context:
  - **Unified Theme Context**: Now uses the same theme context as the rest of the application for consistency
  - **SchemaBuilderThemeToggle**: Theme toggle button that controls the global application theme
  - **Simplified Architecture**: Removed the separate schema builder theme context to reduce complexity
  - **Props Interface**: Added `initialTheme` prop for external theme control
  - **Backward Compatibility**: All theming functionality preserved while simplifying the system

- **Enhanced ConnectionLine Component**: Implemented smaller arrows (6x4px vs 10x7px), positioned connection points outside table boundaries (20px offset), added click selection with visual feedback (darker blue, thicker stroke), hover effects, invisible click area for better UX, and delete button functionality when connection is selected.

- **Undo/Redo System with Zundo**: Implemented comprehensive undo/redo functionality using Zustand + Zundo middleware. Features include:
  - **Keyboard Shortcuts**: Ctrl+Z (undo), Ctrl+Shift+Z (redo), Ctrl+Y (alternative redo)
  - **Zustand Store**: Centralized state management with temporal middleware
  - **Smart Partitioning**: Only tracks tables and foreign keys, excludes UI state from undo/redo
  - **History Management**: 50-state history limit with automatic cleanup
  - **UI Controls**: UndoRedoToolbar with visual buttons and history counter
  - **Reactive Hooks**: Real-time updates for undo/redo availability
  - **Event Prevention**: Proper keyboard event handling to prevent browser conflicts

## Priority Order:
1. Authentication & Context Setup
2. Core Types & Models  
3. UI Components Library
4. Database Builder Components
5. Drag & Drop System
6. Database Logic & State Management
7. Main Views & Pages
8. Integration & Export Features
9. Web Component Integration
10. Testing, Documentation, Performance, Error Handling