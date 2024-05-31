import { useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import PropTypes from "prop-types";

const AddressForm = ({ onAddAddress, userInfo }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (!userInfo) {
          message.error("You need to login before adding an address.");
          return;
        }
        onAddAddress(values);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="">
      <Button type="primary" className="mb-3" onClick={showModal}>
        Add Address
      </Button>

      <Modal title="Add Address" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the title!" }]}>
            <Input placeholder="Home" />
          </Form.Item>
          <Form.Item
            name="address_line_1"
            label="Address Line 1"
            rules={[{ required: true, message: "Please input the address line 1!" }]}
          >
            <Input placeholder="123 Main St" />
          </Form.Item>
          <Form.Item name="address_line_2" label="Address Line 2">
            <Input placeholder="Apt 4B" />
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true, message: "Please input the city!" }]}>
            <Input placeholder="New York" />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[{ required: true, message: "Please input the phone number!" }]}
          >
            <Input placeholder="0366515120" />
          </Form.Item>
        </Form>
      </Modal>
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
