import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../utils/getUserInfo";
import CheckoutModal from "../../Modal/Order/Checkout";

const OrderSummary = ({ totalCost, itemCount, cartItems }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const userInfo = getUserInfo();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!userInfo) {
      setOpen(true);
    } else {
      setIsModalVisible(true);
    }
  };

  const confirmLogin = () => {
    setOpen(false);
    navigate("/login");
  };

  // const handleModalOk = () => {
  //   setIsModalVisible(false);
  //   message.success("Proceeding to payment.");
  //   // Add your payment handling code here
  // };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div id="summary" className="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">Items {itemCount}</span>
        <span className="font-semibold text-sm">${totalCost}</span>
      </div>
      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>${totalCost}</span>
        </div>
        <Popconfirm
          title="You need to login before checkout"
          open={open}
          onConfirm={confirmLogin}
          onCancel={() => setOpen(false)}
          okText="Login"
          cancelText="Cancel"
        >
          <Button type="primary" className="w-full" size="large" disabled={!cartItems?.length} onClick={handleCheckout}>
            Checkout
          </Button>
        </Popconfirm>
      </div>
      {userInfo && (
        <CheckoutModal
          isVisible={isModalVisible}
          onCancel={handleModalCancel}
          totalCost={totalCost}
          cartItems={cartItems}
          userInfo={userInfo}
        />
      )}
    </div>
  );
};

OrderSummary.propTypes = {
  totalCost: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default OrderSummary;
