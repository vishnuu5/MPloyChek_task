const MOCK_USERS = [
    {
      id: "1",
      username: "admin",
      password: "admin123",
      role: "Admin",
      email: "admin@example.com",
      fullName: "Admin User",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      username: "user",
      password: "user123",
      role: "General User",
      email: "user@example.com",
      fullName: "General User",
      joinDate: "2023-02-20",
    },
  ];
  
  // Simulate API delay
  const simulateDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));
  
  // Store the current user in localStorage
  const setCurrentUser = (user) => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  };
  
  export const registerUser = async (username, email, password, fullName, role = "General User") => {
    await simulateDelay(1000);
  
    // Check if username or email already exists
    const userExists = MOCK_USERS.some(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() ||
        u.email?.toLowerCase() === email.toLowerCase()
    );
  
    if (userExists) {
      throw new Error("Username or email already exists");
    }
  
    // For this mock, we'll just add the user to our mock data
    const newUser = {
      id: (MOCK_USERS.length + 1).toString(),
      username,
      password,
      email,
      fullName,
      role,
      joinDate: new Date().toISOString().split("T")[0],
    };
  
    MOCK_USERS.push(newUser);
    console.log("User registered:", newUser);
  };
  
  export const loginUser = async (username, password) => {
    await simulateDelay();
  
    const user = MOCK_USERS.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
  
    if (!user) {
      throw new Error("Invalid username or password");
    }
  
    // Don't include password in the returned user object
    const { password: _, ...userWithoutPassword } = user;
  
    // Store user in localStorage
    setCurrentUser(userWithoutPassword);
  
    return userWithoutPassword;
  };
  
  export const logoutUser = async () => {
    await simulateDelay();
    setCurrentUser(null);
  };
  
  export const getCurrentUser = async () => {
    await simulateDelay(300);
  
    const userJson = localStorage.getItem("currentUser");
    if (!userJson) {
      return null;
    }
  
    return JSON.parse(userJson);
  };
  