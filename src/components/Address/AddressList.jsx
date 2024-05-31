import { Table, Space, Modal, Button, Form } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

const AddressList = ({ addresses, onUpdate, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedAddress, setEditedAddress] = useState(null);
  const [deleteAddressId, setDeleteAddressId] = useState(null);

  const handleEdit = (address) => {
    setEditedAddress(address);
    setIsModalVisible(true);
  };

  const handleUpdate = (values) => {
    onUpdate(editedAddress.id, values);
    setIsModalVisible(false);
  };

  const handleDelete = (addressId) => {
    onDelete(addressId);
    setDeleteAddressId(null);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Address Line 1",
      dataIndex: "address_line_1",
      key: "address_line_1",
      render: (text) => <span title={text}>{truncateText(text, 30)}</span>,
    },
    {
      title: "Address Line 2",
      dataIndex: "address_line_2",
      key: "address_line_2",
      render: (text) => <span title={text}>{truncateText(text, 30)}</span>,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => setDeleteAddressId(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={addresses} pagination={true} />

      {/* Edit Address Modal */}
      <Modal title="Edit Address" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form initialValues={editedAddress} onFinish={handleUpdate}>
          {/* Form fields for updating address */}
        </Form>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        title="Delete Address"
        open={!!deleteAddressId}
        onOk={() => handleDelete(deleteAddressId)}
        onCancel={() => setDeleteAddressId(null)}
      >
        <p>Are you sure you want to delete this address?</p>
      </Modal>
    </div>
  );
};

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      address_line_1: PropTypes.string.isRequired,
      address_line_2: PropTypes.string,
      city: PropTypes.string.isRequired,
      phone_number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AddressList;
