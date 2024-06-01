import { Modal } from "antd";
import PropTypes from "prop-types";

const SelectAddress = ({ isVisible, onCancel, onSelect }) => {
  return (
    <Modal title="Select Address" open={isVisible} onOk={onSelect} onCancel={onCancel}>
      <p>Are you sure you want to set default to this address?</p>
    </Modal>
  );
};

SelectAddress.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SelectAddress;
