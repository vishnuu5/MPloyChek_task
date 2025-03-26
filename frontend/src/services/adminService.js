// Mock users data
const MOCK_USERS = [
    {
      id: "1",
      username: "admin",
      email: "admin@example.com",
      role: "Admin",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      username: "user1",
      email: "user1@example.com",
      role: "General User",
      joinDate: "2023-02-20",
    },
    {
      id: "3",
      username: "user2",
      email: "user2@example.com",
      role: "General User",
      joinDate: "2023-03-05",
    },
    {
      id: "4",
      username: "manager",
      email: "manager@example.com",
      role: "Admin",
      joinDate: "2023-01-30",
    },
  ];
  
  // Simulate API delay
  const simulateDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));
  
  export const getAllUsers = async () => {
    await simulateDelay();
  
    // Get current user from localStorage to check if admin
    const userJson = localStorage.getItem("currentUser");
    if (!userJson) {
      throw new Error("User not authenticated");
    }
  
    const currentUser = JSON.parse(userJson);
    if (currentUser.role !== "Admin") {
      throw new Error("Unauthorized access");
    }
  
    return [...MOCK_USERS];
  };
  
  export const updateUserRole = async (userId, newRole) => {
    await simulateDelay();
  
    // Check if current user is admin
    const userJson = localStorage.getItem("currentUser");
    if (!userJson) {
      throw new Error("User not authenticated");
    }
  
    const currentUser = JSON.parse(userJson);
    if (currentUser.role !== "Admin") {
      throw new Error("Unauthorized access");
    }
  
    console.log(`User ${userId} role updated to ${newRole}`);
  };
  
  export const deleteUser = async (userId) => {
    await simulateDelay();
  
    // Check if current user is admin
    const userJson = localStorage.getItem("currentUser");
    if (!userJson) {
      throw new Error("User not authenticated");
    }
  
    const currentUser = JSON.parse(userJson);
    if (currentUser.role !== "Admin") {
      throw new Error("Unauthorized access");
    }
  
    console.log(`User ${userId} deleted`);
  };
  