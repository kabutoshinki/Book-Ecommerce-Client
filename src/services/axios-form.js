import axios from "axios";
import { jwtDecode } from "jwt-decode";
const axiosForm = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
axiosForm.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosForm.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    // Check if the error is due to unauthorized access
    if (error.response && error.response.status === 401) {
      // Attempt to refresh the access token
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          // Send a request to your server to refresh the access token
          const response = await axiosForm.post("/auth/refresh", { refreshToken });
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          localStorage.setItem("userInfo", jwtDecode(newAccessToken));
          // Retry the original request with the new access token
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          console.log("refresh token success");
          return axiosForm(error.config);
        } else {
          // Handle the case where there is no refresh token
          // For example, log the user out or redirect to login page
          // logout();
        }
      } catch (refreshError) {
        console.log("refresh Error");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosForm;
