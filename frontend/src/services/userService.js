const MOCK_RECORDS = [
    {
      id: "1",
      title: "Project Alpha",
      description: "Initial planning phase for Project Alpha",
      date: "2023-03-15",
      status: "Completed",
    },
    {
      id: "2",
      title: "Client Meeting",
      description: "Quarterly review with client XYZ",
      date: "2023-03-22",
      status: "Completed",
    },
    {
      id: "3",
      title: "System Update",
      description: "Deploy version 2.1 to production",
      date: "2023-04-05",
      status: "In Progress",
    },
    {
      id: "4",
      title: "Documentation",
      description: "Update API documentation for new endpoints",
      date: "2023-04-12",
      status: "Pending",
    },
    {
      id: "5",
      title: "Security Audit",
      description: "Perform quarterly security audit of all systems",
      date: "2023-04-18",
      status: "Pending",
    },
  ];
  
  // Simulate API delay
  const simulateDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));
  
  export const getUserRecords = async (delay = 0) => {
    // Use the provided delay parameter to simulate network latency
    await simulateDelay(delay);
  
    // Get current user from localStorage
    const userJson = localStorage.getItem("currentUser");
    if (!userJson) {
      throw new Error("User not authenticated");
    }
  
    const user = JSON.parse(userJson);
  
    // Admin users see all records, general users see fewer records
    if (user.role === "Admin") {
      return MOCK_RECORDS;
    } else {
      // General users only see completed and in-progress records
      return MOCK_RECORDS.filter(
        (record) => record.status === "Completed" || record.status === "In Progress"
      );
    }
  };
  