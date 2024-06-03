import PropTypes from "prop-types";
import { Modal, Button, Table, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { orderApi } from "../../services/order-api";
import RenderStatus from "../../components/Status/RenderStatus";

const OrderItem = ({ selectedOrder, isModalVisible, handleOk, handleCancel }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`orderItems`, selectedOrder?.id],
    queryFn: () => orderApi.getOrderItemsByOrderId(selectedOrder?.id),
    enabled: !!selectedOrder,
  });

  const columns = [
    {
      title: "Image",
      dataIndex: ["book", "image"],
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Book"
          className="w-24 h-24 rounded-lg hover:scale-125 transition-transform duration-300"
        />
      ),
    },
    {
      title: "Book Title",
      dataIndex: ["book", "title"],
      key: "title",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Origin Price",
      dataIndex: ["book", "price"],
      key: "price",
      render: (text) => `$${text}`,
    },
  ];

  return (
    <Modal
      title={`Order ID: ${selectedOrder?.id}`}
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="ok" type="primary" onClick={handleOk}>
          Close
        </Button>,
      ]}
    >
      {selectedOrder ? (
        <div>
          <p>
            <strong>Total:</strong> ${selectedOrder.total}
          </p>
          <p>
            <strong>Status:</strong> <RenderStatus status={selectedOrder.status} />
          </p>
          <p>
            <strong>Date:</strong> {selectedOrder.created_at}
          </p>

          {!isLoading ? (
            <Table
              columns={columns}
              dataSource={data?.item}
              rowKey={(record) => record?.item?.id}
              pagination={{ pageSize: 3, position: ["bottomCenter"] }}
              loading={isLoading}
            />
          ) : (
            <Spin size="large" />
          )}
        </div>
      ) : (
        <Spin size="large" />
      )}
    </Modal>
  );
};

OrderItem.propTypes = {
  selectedOrder: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
    created_at: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        book: PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          title: PropTypes.string,
          price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
        quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ),
  }),
  isModalVisible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default OrderItem;
