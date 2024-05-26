import { useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
const generateCartItems = () => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    image: "https://i.ibb.co/6gzWwSq/Rectangle-20-1.png",
    title: `Luxe card holder ${index + 1}`,
    price: (index + 1) * 50,
    quantity: 1,
  }));
};

export default function Cart() {
  const [cartItems, setCartItems] = useState(generateCartItems());

  const handleQuantityChange = (id, value) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: value } : item)));
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto mt-10 p-2">
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-10 py-10 rounded-lg">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          <div className="h-96 overflow-y-scroll">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
          <a href="/books" className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </a>
        </div>
        <OrderSummary totalCost={totalCost} itemCount={cartItems.length} cartItems={cartItems} />
      </div>
    </div>
  );
}
