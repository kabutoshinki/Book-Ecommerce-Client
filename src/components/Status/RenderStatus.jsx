import PropTypes from "prop-types";
import { getStatusTag } from "../../utils/getStatusTag";

const RenderStatus = ({ status }) => {
  return <div>{getStatusTag(status)}</div>;
};

RenderStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default RenderStatus;
