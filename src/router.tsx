import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import RootLayout from './layouts/RootLayout'
import NotFound from './pages/404'

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
    ],
  },
]) 