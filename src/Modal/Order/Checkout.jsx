import { Modal, Row, Col, Button, Divider, Radio, Card } from "antd";
import PropTypes from "prop-types";
import CartView from "../../components/CartItem/CartView";
import Address from "../../components/Address/Address";
import { useState } from "react";
import { paymentMethods } from "../../data/data";
import { orderApi } from "../../services/order-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
const CheckoutModal = ({ isVisible, onCancel, totalCost, cartItems, userInfo }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Default");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handlePayment = async () => {
    try {
      const createOrderDetailDto = {
        totalAmount: totalCost,
        orderItems: cartItems.map((item) => ({
          bookId: item.bookId,
          quantity: item.quantity,
        })),
      };

      await orderApi.createOrder(userInfo.sub, createOrderDetailDto);
      toast.success("Order Success");
      // onCancel();
      navigate("/success");
      queryClient.invalidateQueries({ queryKey: ["cartQuantity"] });
    } catch (error) {
      toast.error("Order Failed");
      navigate("/failed");
      console.log(error);
    }
  };

  return (
    <Modal title="Checkout" open={isVisible} onCancel={onCancel} footer={null} width={1600}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={10} lg={11}>
          <h3>Address</h3>
          <Address />
        </Col>
        <Col xs={24} sm={24} md={14} lg={7}>
          <h3>Cart Items</h3>
          <div className="h-96 overflow-y-scroll">
            {cartItems ? cartItems.map((item) => <CartView key={item.id} item={item} />) : null}
          </div>
          <Divider />
          <div>
            <h3>Total Cost: ${totalCost}</h3>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={5}>
          <h3>Payment Method</h3>
          <Radio.Group
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            value={selectedPaymentMethod}
            className="payment-method-group"
          >
            <Row gutter={[16, 16]}>
              {paymentMethods.map((method) => (
                <Col span={24} key={method.id}>
                  <Card
                    hoverable
                    className={`payment-card ${selectedPaymentMethod === method.code ? "selected" : ""}`}
                    onClick={() => setSelectedPaymentMethod(method.code)}
                  >
                    <Row align="middle" justify="space-between">
                      <Col span={8}>
                        <img alt={method.name} src={method.image} style={{ width: "100%", height: "auto" }} />
                      </Col>
                      <Col span={14}>
                        <Card.Meta title={method.name} />
                      </Col>
                      <Col span={2}>
                        <Radio value={method.code} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Radio.Group>
          <Divider />
          <Button type="primary" className="w-full" size="large" onClick={handlePayment}>
            Checkout
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

CheckoutModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  totalCost: PropTypes.number.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  userInfo: PropTypes.shape({
    sub: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default CheckoutModal;
