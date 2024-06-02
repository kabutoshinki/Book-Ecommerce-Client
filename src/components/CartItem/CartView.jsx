import { InputNumber, Tooltip } from "antd";

import PropTypes from "prop-types";
const CartView = ({ item }) => {
  return (
    <div key={item.bookId} className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
      <div className="md:w-4/12 2xl:w-1/4 w-full mx-3">
        <img
          src={item?.book?.image}
          alt={item?.book?.title}
          className="h-full object-center object-cover md:block hidden rounded-md  hover:scale-110 transition-transform duration-300 "
        />
        <img
          src={item?.book?.image}
          alt={item?.book?.title}
          className="md:hidden w-full h-full object-center object-cover rounded-md  hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center mx-10">
        <div className="flex items-center justify-between w-full">
          <Tooltip title={item?.book?.title}>
            <p className="text-base font-black leading-none text-gray-800 truncate max-w-xs">{item?.book?.title}</p>
          </Tooltip>
          <div className="">
            <InputNumber min={1} value={item.quantity} disabled className="mx-2" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-5">
          <p className="text-base font-black leading-none text-gray-800">${item?.book?.price * item.quantity}</p>
        </div>
      </div>
    </div>
  );
};

CartView.propTypes = {
  item: PropTypes.shape({
    bookId: PropTypes.string.isRequired,
    book: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired, // Add price validation here
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartView;
