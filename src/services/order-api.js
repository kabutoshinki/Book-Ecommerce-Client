import axiosClient from "./axios-client";

export const orderApi = {
  createOrder: (userId, createOrderDetailDto, checkout) =>
    axiosClient
      .post(`/order-details/${userId}`, createOrderDetailDto, checkout)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  getOrderHistory: (userId) =>
    axiosClient
      .get(`/order-details/user/${userId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  getOrderItemsByOrderId: (orderId) =>
    axiosClient
      .get(`/order-details/${orderId}/order_items`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
};
