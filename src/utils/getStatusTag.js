import { Tag } from "antd";

export const getStatusTag = (status) => {
  let color;
  switch (status) {
    case "Processing":
      color = "yellow";
      break;
    case "Succeeded":
      color = "green";
      break;
    case "Failed":
      color = "red";
      break;
    default:
      color = "blue";
  }
  return <Tag color={color}>{status}</Tag>;
};
