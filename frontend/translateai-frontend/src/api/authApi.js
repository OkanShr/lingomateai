import { instance as axiosInstance } from "./apiInterceptor";

export const loginUser = async (post) => {
  try {
    const response = await axiosInstance.post("/token", post, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      // Network error
      return "Server is not running";
    } else if (error.response.status === 401) {
      // Invalid login
      return "Wrong username or password";
    } else {
      // Other errors
      throw error;
    }
  }
};

export const registerUser = (post) => {
  return axiosInstance.post("/register", post, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
