import PropTypes from "prop-types";
import { Button } from "antd";

const OrderSummary = ({ totalCost, itemCount, cartItems }) => {
  const handleCheckout = () => {
    const itemSummary = cartItems.map((item) => `ID: ${item.bookId}, Quantity: ${item.quantity}`).join("\n");
    alert(`Total Amount: $${totalCost}\n\nItems:\n${itemSummary}`);
  };
  console.log(cartItems);
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
        <Button type="primary" className="w-full" size="large" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
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
