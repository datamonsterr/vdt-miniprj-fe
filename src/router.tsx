import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import RootLayout from './layouts/RootLayout'
import NotFound from './pages/404'
import Dashboard from './pages/Dashboard'
import SchemaBuilder from './pages/SchemaBuilder'
import Demo from './pages/Demo'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/login/sso-callback',
        element: <AuthenticateWithRedirectCallback />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signup/sso-callback',
        element: <AuthenticateWithRedirectCallback />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/schema-builder',
        element: (
          <ProtectedRoute>
            <SchemaBuilder />
          </ProtectedRoute>
        ),
      },
      {
        path: '/demo',
        element: <Demo />,
      },
    ],
  },
]) 