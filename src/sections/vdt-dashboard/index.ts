// Main component
export { VDTDashboard } from './VDTDashboard'

// Types
export type { VDTDashboardProps, DashboardView } from './types'

// Components (for advanced usage)
export { DashboardNavigation } from './components/DashboardNavigation'
export { DashboardContent } from './components/DashboardContent'
export { ProtectedView } from './components/ProtectedView'

// Views (for custom implementations)
export { HomeView } from './views/HomeView'
export { DashboardMainView } from './views/DashboardMainView'
export { SchemaBuilderView } from './views/SchemaBuilderView'
export { DemoView } from './views/DemoView'
export { LoginView } from './views/LoginView'
export { SignUpView } from './views/SignUpView'
export { NotFoundView } from './views/NotFoundView'

// Auth context (for custom auth implementations)
export { InternalAuthProvider, useInternalAuth, VDT_CLERK_PUBLISHABLE_KEY } from './auth-context' 