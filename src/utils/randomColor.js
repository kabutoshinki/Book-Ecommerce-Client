import { tagColors } from "../types/ColorsType";

export const getRandomColor = () => {
  return tagColors[Math.floor(Math.random() * tagColors.length)];
};
