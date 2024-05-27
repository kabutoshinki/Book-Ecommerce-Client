import axiosClient from "./axios-client";

export const bookApi = {
  getBooksOnSale: (limit = 5) =>
    axiosClient
      .get(`/books/on-sale?limit=${limit}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),

  getBestBooks: (limit = 5) => {
    return axiosClient
      .get(`/books/best-books?limit=${limit}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  getBestSellingBooks: (limit = 5) => {
    return axiosClient
      .get(`/books/best-sales?limit=${limit}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  getPopularBooks: (limit = 5) => {
    return axiosClient
      .get(`/books/popular?limit=${limit}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
