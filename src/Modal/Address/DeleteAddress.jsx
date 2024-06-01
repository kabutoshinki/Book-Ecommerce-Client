import { Modal } from "antd";
import PropTypes from "prop-types";
const DeleteAddress = ({ isVisible, onCancel, onDelete }) => {
  return (
    <Modal title="Delete Address" open={isVisible} onOk={onDelete} onCancel={onCancel}>
      <p>Are you sure you want to delete this address?</p>
    </Modal>
  );
};

export default DeleteAddress;
DeleteAddress.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
