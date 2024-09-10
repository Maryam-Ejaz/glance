const API_URL = "https://randomuser.me/api/?results=1000";

export const fetchUsers = async (): Promise<any[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.results; // Return all user results
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};


export const fetchUserById = async (id: string) => {
  try {
    const response = await fetch(`https://randomuser.me/api?uuid=${id}`); 
    
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    console.log(data.results);
    return data.results; 
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

                                                      
