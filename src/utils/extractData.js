export const extractPropertyValues = (array, propertyName) => {
  return array.map((item) => item[propertyName]);
};
