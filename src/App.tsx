import { Link } from 'react-router-dom'
import { cn } from "./lib/utils"

function App() {
  return (
    <div className="p-6">
      <nav className="space-x-4">
        <Link 
          to="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Home
        </Link>
        <Link 
          to="/users" 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Users (Data Loading Example)
        </Link>
      </nav>
    </div>
  )
}

export default App
