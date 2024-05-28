import axiosClient from "./axios-client";

export const categoryApi = {
  getCategories: () =>
    axiosClient
      .get(`/categories`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
};
