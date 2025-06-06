# Initial setup
- [x] Add react router
- [x] Add tailwindCss
- [x] Setup shadcn
- [x] Add neccessary cursor rules
- [x] Structure our code

# Authentication & Context Setup (4 hours)
- [ ] Create auth context with Clerk integration (AuthContext.tsx, AuthProvider.tsx, AuthConsumer.tsx)
- [ ] Add authentication hook for managing user state
- [ ] Create protected route wrapper component
- [ ] Add sign-in/sign-out UI components using shadcn

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
- [ ] Add WelcomePage for authenticated users
- [ ] Create DatabaseListPage for managing multiple databases
- [ ] Build DatabasePreviewPage for viewing created schemas

# Integration & Export Features (4 hours)
- [ ] Create database schema export functionality (SQL, JSON)
- [ ] Add schema import from JSON
- [ ] Build schema preview with formatted output
- [ ] Create shareable database links

# Web Component Integration (3 hours)
- [ ] Create EmbeddableButton component for other apps
- [ ] Build iframe communication system for embedding
- [ ] Add web component build configuration
- [ ] Create NPM package setup for distribution

# Testing & Quality (4 hours)
- [ ] Add unit tests for core database logic
- [ ] Create integration tests for drag & drop
- [ ] Add tests for authentication flow
- [ ] Build E2E tests for main user journey

# Documentation & Polish (3 hours)
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