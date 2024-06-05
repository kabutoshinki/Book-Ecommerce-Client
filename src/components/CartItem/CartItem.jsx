import { Card, Button, InputNumber, Popconfirm, Tooltip, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const CartItem = ({ item, handleQuantityChange, handleRemoveItem, isSelected, handleSelectChange }) => {
  const calculateDiscountedPrice = (book) => {
    if (book?.discount) {
      return (book.price * (1 - book?.discount?.amount / 100))?.toFixed(2);
    }
    return book.price;
  };

  const discountedPrice = calculateDiscountedPrice(item.book);

  const handleCardClick = (e) => {
    if (e.target.closest(".ant-btn, .ant-input-number, .ant-popover, .ant-checkbox-wrapper")) {
      return;
    }
    handleSelectChange(item.bookId);
  };

  return (
    <Card className={`mb-4 shadow-md rounded-lg `} onClick={handleCardClick}>
      <div className="flex items-center">
        <Checkbox checked={isSelected} onChange={() => handleSelectChange(item.bookId)} className="mr-4" />
        <div className="w-1/4 relative">
          <img
            src={item?.book?.image}
            alt={item?.book?.title}
            className="w-24 h-24 rounded-md hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="w-3/4 flex flex-col pl-6">
          <div className="flex items-center justify-between">
            <Tooltip title={item?.book?.title}>
              <p className="text-base font-black leading-none text-gray-800 truncate max-w-xs">{item?.book?.title}</p>
            </Tooltip>
            <div className="flex items-center">
              <Button
                type="primary"
                shape="circle"
                disabled={item.quantity <= 1}
                onClick={() => handleQuantityChange(item.bookId, -1)}
              >
                -
              </Button>
              <InputNumber
                min={1}
                value={item.quantity}
                disabled
                onChange={(value) => handleQuantityChange(item.bookId, value)}
                className="mx-2"
              />
              <Button
                type="primary"
                disabled={item.quantity >= 10}
                shape="circle"
                onClick={() => handleQuantityChange(item.bookId, 1)}
              >
                +
              </Button>
              <Popconfirm
                title="Are you sure to delete this item?"
                onConfirm={() => handleRemoveItem(item.bookId)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" icon={<DeleteOutlined />} className="text-red-500 ml-4" />
              </Popconfirm>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            {item?.book?.discount ? (
              <div className="flex items-center">
                <p className="text-base font-black leading-none text-gray-800 line-through mr-2">
                  ${item?.book?.price * item.quantity}
                </p>
                <p className="text-base font-black leading-none text-xl text-red-500 mr-5">
                  ${(discountedPrice * item.quantity)?.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-base font-black leading-none text-gray-800">${item?.book?.price * item.quantity}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

CartItem.propTypes = {
  key: PropTypes.string.isRequired,
  item: PropTypes.shape({
    bookId: PropTypes.string.isRequired,
    book: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discount: PropTypes.shape({
        amount: PropTypes.number,
        isActive: PropTypes.bool,
      }),
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
};

export default CartItem;
