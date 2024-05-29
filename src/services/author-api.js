import axiosClient from "./axios-client";

export const authorApi = {
  getAuthors: () =>
    axiosClient
      .get(`/authors`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
};
