import { useState } from "react";
import { Table, Typography, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../utils/getUserInfo";
import { useNavigate } from "react-router-dom";
import { orderApi } from "../../services/order-api";
import OrderItem from "../../Modal/Order/OrderItem";
import RenderStatus from "../../components/Status/RenderStatus";
import { BounceLoader } from "react-spinners";
const { Title, Text } = Typography;

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  const user = getUserInfo();

  if (!user) {
    navigate("/");
  }

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`OrderHistory-${user.sub}`],
    queryFn: () => orderApi.getOrderHistory(user.sub),
    enabled: !!user,
  });

  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader />
      </div>
    );
  }

  if (error) {
    return <Text type="danger">Failed to load order history.</Text>;
  }

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.total - b.total,
      render: (text) => `$${text}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Processing",
          value: "Processing",
        },
        {
          text: "Succeeded",
          value: "Succeeded",
        },
        {
          text: "Failed",
          value: "Failed",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => <RenderStatus status={status} />,
    },
    {
      title: "Order Date",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      render: (text) => `${text}`,
    },
    {
      title: "Update Date",
      dataIndex: "updated_at",
      key: "updated_at",
      sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
      render: (text) => `${text}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, order) => (
        <Button type="primary" onClick={() => showModal(order)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Title className="my-10" level={2}>
        Order History
      </Title>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
      />
      {!isLoading ? (
        <OrderItem
          selectedOrder={selectedOrder}
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      ) : null}
    </div>
  );
}
