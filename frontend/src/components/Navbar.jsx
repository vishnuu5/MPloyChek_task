import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          User Management App
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">
              Welcome, {user?.username}{" "}
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user?.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                }`}
              >
                {user?.role}
              </span>
            </span>

            <div className="flex gap-2">
              <Link to="/dashboard" className="px-3 py-1 rounded hover:bg-blue-700 transition">
                Dashboard
              </Link>

              {user?.role === "Admin" && (
                <Link to="/admin" className="px-3 py-1 rounded hover:bg-blue-700 transition">
                  Admin Panel
                </Link>
              )}

              <button onClick={() => logout()} className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="px-3 py-1 bg-blue-700 rounded hover:bg-blue-800 transition">
              Login
            </Link>
            <Link to="/register" className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 transition">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

