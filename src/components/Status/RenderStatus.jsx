import PropTypes from "prop-types";
import { Tag } from "antd";

const RenderStatus = ({ status }) => {
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

RenderStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default RenderStatus;
