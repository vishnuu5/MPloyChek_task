import { useState, useEffect } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "../services/adminService";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("General User");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setSelectedRole(user.role);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleSaveEdit = async (userId) => {
    try {
      await updateUserRole(userId, selectedRole);
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: selectedRole } : user)));
      setEditingUserId(null);
    } catch (err) {
      setError(err.message || "Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId === currentUser?.id) {
      setError("You cannot delete your own account");
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        setError(err.message || "Failed to delete user");
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>

      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-purple-700">
              Admin Dashboard: You have full access to manage users and their roles.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.username}
                        {user.id === currentUser?.id && <span className="ml-2 text-xs text-gray-500">(You)</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingUserId === user.id ? (
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="General User">General User</option>
                          <option value="Admin">Admin</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.joinDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingUserId === user.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSaveEdit(user.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Save
                          </button>
                          <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-900">
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button onClick={() => handleEditClick(user)} className="text-blue-600 hover:text-blue-900">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className={`${user.id === currentUser?.id ? "text-gray-400 cursor-not-allowed" : "text-red-600 hover:text-red-900"}`}
                            disabled={user.id === currentUser?.id}
                            title={user.id === currentUser?.id ? "You cannot delete your own account" : ""}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
