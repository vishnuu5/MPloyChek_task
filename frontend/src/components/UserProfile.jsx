const UserProfile = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Username:</p>
          <p className="font-medium">{user.username}</p>
        </div>

        <div>
          <p className="text-gray-600">Role:</p>
          <p className="font-medium">
            <span
              className={`inline-block px-2 py-1 rounded text-xs ${
                user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
              }`}
            >
              {user.role}
            </span>
            {user.role === "Admin" && <span className="ml-2 text-xs text-gray-500">(Full access to all features)</span>}
            {user.role === "General User" && (
              <span className="ml-2 text-xs text-gray-500">(Limited to viewing own records)</span>
            )}
          </p>
        </div>

        {user.email && (
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-medium">{user.email}</p>
          </div>
        )}

        {user.fullName && (
          <div>
            <p className="text-gray-600">Full Name:</p>
            <p className="font-medium">{user.fullName}</p>
          </div>
        )}

        {user.joinDate && (
          <div>
            <p className="text-gray-600">Join Date:</p>
            <p className="font-medium">{user.joinDate}</p>
          </div>
        )}
      </div>

      {/* Role-specific capabilities */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-medium text-gray-700 mb-2">Your Access Level:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          {user.role === "Admin" ? (
            <>
              <li>View and manage all user records</li>
              <li>Add, edit, and delete users</li>
              <li>Change user roles</li>
              <li>Access to admin dashboard</li>
              <li>View system statistics</li>
            </>
          ) : (
            <>
              <li>View your own records</li>
              <li>Update your profile information</li>
              <li>Change your password</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default UserProfile

