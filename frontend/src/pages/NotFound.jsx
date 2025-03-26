import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page not found</p>
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound

