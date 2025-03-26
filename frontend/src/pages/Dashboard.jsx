import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { getUserRecords } from "../services/userService"
import LoadingSpinner from "../components/LoadingSpinner"
import UserProfile from "../components/UserProfile"
import RecordsTable from "../components/RecordsTable"


const Dashboard = () => {
  const { user } = useAuth()
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // Simulate delay parameter in API call
        const delay = 1500
        const data = await getUserRecords(delay)
        setRecords(data)
      } catch (err) {
        setError(err.message || "Failed to fetch records")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecords()
  }, [])

  if (isLoading) {
    return <LoadingSpinner message="Loading your records..." />
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              {user?.role === "Admin"
                ? "Welcome, Admin! You have full access to manage users and view all records."
                : "Welcome! You can view your records and update your profile."}
            </p>
          </div>
        </div>
      </div>

      {user && <UserProfile user={user} />}

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Records</h2>
          <div className="text-sm text-gray-500">
            {user?.role === "Admin" ? "As an admin, you can see all records" : "You can see your assigned records"}
          </div>
        </div>

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
        ) : records.length > 0 ? (
          <RecordsTable records={records} />
        ) : (
          <p className="text-gray-500">No records found.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard

