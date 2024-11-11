import axios from "axios";

export const createUser = async (user: {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
}) => {
  try {
    const response = await axios.post("/api/users", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "An error occurred");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
