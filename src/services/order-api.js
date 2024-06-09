import axiosClient from "./axios-client";

export const orderApi = {
  createOrder: (userId, createOrderDetailDto) =>
    axiosClient
      .post(`/order-details/${userId}`, createOrderDetailDto)
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
  changeOrderStatus: (orderId, state) => {
    return axiosClient
      .patch(`/order-details/change-status-order/${orderId}`, { state })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
