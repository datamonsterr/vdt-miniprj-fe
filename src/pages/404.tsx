import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function NotFound() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {error.status} {error.statusText}
        </h1>
        <p className="text-gray-600">{error.data}</p>
      </div>
    )
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h1>
      <p className="text-gray-600">
        {error instanceof Error ? error.message : 'Unknown error occurred'}
      </p>
    </div>
  )
} 