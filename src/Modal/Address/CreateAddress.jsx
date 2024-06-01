import { Form, Input, Modal } from "antd";
import PropTypes from "prop-types";

const CreateAddress = ({ isVisible, onCancel, onAddAddress, form }) => {
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onAddAddress(values);
        form.resetFields();
        onCancel();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal title="Add Address" open={isVisible} onOk={handleOk} onCancel={onCancel}>
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
  );
};

CreateAddress.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAddAddress: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};

export default CreateAddress;
