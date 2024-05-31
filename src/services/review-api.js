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
  createReview: (userId, bookId, content, rating) => {
    return axiosClient
      .post(`/reviews/`, { userId, bookId, content, rating })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
