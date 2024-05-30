import axiosClient from "./axios-client";

export const reviewApi = {
  getReviewByBookId: (bookId) => {
    return axiosClient
      .get(`/reviews/book/${bookId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  createReview: (userId, bookId, content, rate) => {
    return axiosClient
      .post(`/reviews/`, { userId, bookId, content, rate })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
