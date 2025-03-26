import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await login(username, password)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Failed to login")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login to Your Account</h2>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? <LoadingSpinner size="small" /> : "Login"}
          </button>
        </form>

        <div className="mt-6">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Available Roles:</h3>
            <div className="space-y-2">
              <div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mr-2">
                  General User
                </span>
                <span className="text-sm text-gray-600">Can view their own records</span>
              </div>
              <div>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 mr-2">
                  Admin
                </span>
                <span className="text-sm text-gray-600">Can manage all users and records</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Demo Accounts:</p>
          <p>Admin: username="admin", password="admin123"</p>
          <p>User: username="user", password="user123"</p>
        </div>
      </div>
    </div>
  )
}

export default Login

