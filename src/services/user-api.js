import axiosClient from "./axios-client";

export const userApi = {
  getProfile: (id) =>
    axiosClient
      .get(`/users/profile/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  updateProfile: async (id, updateUserDto, file) => {
    const formData = new FormData();
    formData.append("firstName", updateUserDto.firstName);
    formData.append("lastName", updateUserDto.lastName);
    if (file) {
      formData.append("file", file);
    }

    const response = await axiosClient.patch(`/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
