const API_URL = "https://randomuser.me/api/?results=1000&seed=abc";
let allUsersCache: any[] = []; // Cache to store fetched users

export const fetchUsers = async (): Promise<any[]> => {
  if (allUsersCache.length === 0) {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      allUsersCache = data.results; // Cache all user results
      return allUsersCache;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  } else {
    return allUsersCache; // Return cached data if already fetched
  }
};

export const fetchUserById = async (id: string) => {
  try {
    const users = await fetchUsers();

    // Search for the user by UUID
    const user = users.find((user) => user.login.uuid === id);

    if (user) {
      return user;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
