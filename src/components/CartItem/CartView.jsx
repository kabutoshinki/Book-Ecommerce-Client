import { InputNumber, Tooltip } from "antd";

import PropTypes from "prop-types";
const CartView = ({ item }) => {
  const calculateDiscountedPrice = (book) => {
    if (book?.discount) {
      return (book?.price * (1 - book?.discount?.amount / 100))?.toFixed(2);
    }
    return book?.price;
  };

  const discountedPrice = calculateDiscountedPrice(item?.book);
  console.log(item);
  return (
    <div key={item?.bookId} className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
      <div className="md:w-4/12 2xl:w-1/4 w-full mx-3">
        <img
          src={item?.book?.image}
          alt={item?.book?.title}
          className="h-full w-full object-center object-cover md:block hidden rounded-md  hover:scale-110 transition-transform duration-300 "
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
          {item?.book?.discount ? (
            <div className="flex items-center">
              <p className="text-base font-black leading-none text-gray-800 line-through mr-2">
                ${item?.book?.price * item.quantity}
              </p>
              <p className="text-base font-black leading-none text-red-500 mr-5">${discountedPrice * item.quantity}</p>
            </div>
          ) : (
            <p className="text-base font-black leading-none text-gray-800">${item?.book?.price * item.quantity}</p>
          )}
        </div>
      </div>
    </div>
  );
};

CartView.propTypes = {
  item: PropTypes.shape({
    bookId: PropTypes.string.isRequired,
    book: PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
      discount: PropTypes.shape({
        amount: PropTypes.number,
        isActive: PropTypes.bool,
      }),
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartView;
