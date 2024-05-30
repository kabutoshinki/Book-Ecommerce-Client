import axiosClient from "./axios-client";

export const cartApi = {
  getCart: (userId) =>
    axiosClient
      .get(`/cart/${userId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  addToCart: (userId, bookId, quantity) =>
    axiosClient
      .post("/cart/add", { userId, bookId, quantity })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  increaseQuantity: (userId, bookId, quantity) =>
    axiosClient
      .post("/cart/increase", { userId, bookId, quantity })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  decreaseQuantity: (userId, bookId, quantity) =>
    axiosClient
      .post("/cart/decrease", { userId, bookId, quantity })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  deleteCartItem: (userId, bookId) =>
    axiosClient
      .delete(`/cart/${userId}/item/${bookId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
};
