import axiosClient from "./axios-client";

export const aboutApi = {
  getAbout: () =>
    axiosClient
      .get(`/content`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
};
