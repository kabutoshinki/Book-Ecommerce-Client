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
  getPopularBooks: (limit = 5, categoryName) => {
    return axiosClient
      .get(`/books/popular?limit=${limit}&categoryName=${categoryName}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  searchBooks: (limit = 5, name) => {
    return axiosClient
      .get(`/books/search?limit=${limit}&name=${name}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
