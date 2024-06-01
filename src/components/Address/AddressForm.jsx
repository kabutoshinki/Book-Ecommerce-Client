import { useState } from "react";
import { Button, Form } from "antd";
import PropTypes from "prop-types";
import CreateAddress from "../../Modal/Address/CreateAddress";

const AddressForm = ({ onAddAddress }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="">
      <Button type="primary" className="mb-3" onClick={showModal}>
        Add Address
      </Button>

      <CreateAddress isVisible={isModalVisible} onCancel={handleCancel} onAddAddress={onAddAddress} form={form} />
    </div>
  );
};

AddressForm.propTypes = {
  onAddAddress: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    sub: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default AddressForm;
