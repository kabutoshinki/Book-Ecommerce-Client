import axiosClient from "./axios-client";

export const aboutApi = {
  getAbout: () =>
    axiosClient
      .get(`/public/page/about`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
};
