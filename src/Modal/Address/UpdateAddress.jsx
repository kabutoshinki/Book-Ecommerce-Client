import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
const UpdateAddress = ({ isVisible, onCancel, onUpdate, address }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);

        onUpdate(values);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Validation failed:", error);
        setLoading(false);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  // Set form values when address changes
  React.useEffect(() => {
    form.setFieldsValue(address);
  }, [address, form]);

  return (
    <Modal
      title="Update Address"
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" label="Title" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="address_line_1" label="Address Line 1">
          <Input />
        </Form.Item>
        <Form.Item name="address_line_2" label="Address Line 2">
          <Input />
        </Form.Item>
        <Form.Item name="city" label="City">
          <Input />
        </Form.Item>
        <Form.Item name="phone_number" label="Phone Number">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

UpdateAddress.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
};

export default UpdateAddress;
