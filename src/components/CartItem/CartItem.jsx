import { Button, InputNumber, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
const CartItem = ({ item, handleQuantityChange, handleRemoveItem }) => {
  return (
    <div key={item.id} className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
      <div className="md:w-4/12 2xl:w-1/4 w-full">
        <img
          src={item.image}
          alt={item.title}
          className="h-full object-center object-cover md:block hidden rounded-md "
        />
        <img
          src={item.image}
          alt={item.title}
          className="md:hidden w-full h-full object-center object-cover rounded-md"
        />
      </div>
      <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
        <div className="flex items-center justify-between w-full">
          <Tooltip title={item.title}>
            <p className="text-base font-black leading-none text-gray-800 truncate max-w-xs">{item.title}</p>
          </Tooltip>
          <div className="flex items-center">
            <Button
              type="primary"
              shape="circle"
              onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
            >
              -
            </Button>
            <InputNumber
              min={1}
              max={10}
              value={item.quantity}
              onChange={(value) => handleQuantityChange(item.id, value)}
              className="mx-2"
            />

            <Button type="primary" shape="circle" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
              +
            </Button>
            <Popconfirm
              title="Are you sure to delete this item?"
              onConfirm={() => handleRemoveItem(item.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" icon={<DeleteOutlined />} className="text-red-500 ml-4" />
            </Popconfirm>
          </div>
        </div>
        <div className="flex items-center justify-between pt-5">
          <p className="text-base font-black leading-none text-gray-800">${item.price * item.quantity}</p>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
};

export default CartItem;
