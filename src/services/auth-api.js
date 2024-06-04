import axiosClient from "./axios-client";

export const authApi = {
  login: (email, password, guest_cart) => {
    return axiosClient
      .post(`/auth/login`, { email, password, guest_cart })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  register: (firstName, lastName, username, email, password) => {
    return axiosClient
      .post(`/auth/signup`, { firstName, lastName, username, email, password })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
  },
};
