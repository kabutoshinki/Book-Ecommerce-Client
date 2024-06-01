import axiosClient from "./axios-client";

export const addressApi = {
  getAddressByUserId: (userId) =>
    axiosClient
      .get(`/addresses/user/${userId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  createUserAddress: (userId, title, address_line_1, address_line_2, city, phone_number) =>
    axiosClient
      .post(`/addresses`, { userId, title, address_line_1, address_line_2, city, phone_number })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  updateUserAddress: (addressId, userId, title, address_line_1, address_line_2, city, phone_number) =>
    axiosClient
      .patch(`/addresses/${addressId}`, { userId, title, address_line_1, address_line_2, city, phone_number })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  deleteAddressUserItem: (addressId) =>
    axiosClient
      .delete(`/addresses/${addressId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  selectedAddressUserItem: (addressId, userId) =>
    axiosClient
      .post(`/addresses/${addressId}/${userId}/selected`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
};
