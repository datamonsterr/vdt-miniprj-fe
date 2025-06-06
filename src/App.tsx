import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">VDT Database Builder</h1>
      <p className="text-muted-foreground mb-6">
        Create database schemas with our visual drag-and-drop interface
      </p>
      <nav className="space-x-4">
        <Link 
          to="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Home
        </Link>
        <Link 
          to="/schema-builder"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Schema Builder
        </Link>
        <Link 
          to="/demo"
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Demo
        </Link>
      </nav>
    </div>
  )
}

export default App
