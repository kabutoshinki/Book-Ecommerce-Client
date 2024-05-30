export const getUserInfo = () => {
  const userInfoString = localStorage.getItem("userInfo");
  if (userInfoString) {
    try {
      const userInfo = JSON.parse(userInfoString);
      return userInfo;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};
