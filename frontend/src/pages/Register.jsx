import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService"
import LoadingSpinner from "../components/LoadingSpinner"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "General User" | "Admin",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  const { username, email, password, confirmPassword, fullName, role } = formData

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing in a field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required"
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Full name validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    // Role validation
    if (!role) {
      newErrors.role = "Role is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset errors and success state
    setServerError("")
    setSuccess(false)

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await registerUser(username, email, password, fullName, role)
      setSuccess(true)

      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        role: "General User",
      })

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (err) {
      setServerError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create an Account</h2>

        {serverError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{serverError}</div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="General User">General User</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            <p className="text-gray-500 text-xs mt-1">
              General Users can view their own records. Admins can manage all users and records.
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? <LoadingSpinner size="small" /> : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

