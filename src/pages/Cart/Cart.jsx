import CartItem from "../../components/CartItem/CartItem";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo } from "../../utils/getUserInfo";
import { generateDeviceId } from "../../utils/generateDeviceId";
import { cartApi } from "../../services/cart-api";
import { PuffLoader } from "react-spinners";
export default function Cart() {
  const userInfo = getUserInfo();
  const queryClient = useQueryClient();
  const userId = userInfo ? `user-${userInfo.sub}` : generateDeviceId();
  const { data, isLoading, error } = useQuery({
    queryKey: [`cart-${userId}`],
    queryFn: () => cartApi.getCart(userId),
    enabled: !!userId,
  });

  const increaseQuantityMutation = useMutation({
    mutationFn: ({ userId, bookId, quantity }) => cartApi.increaseQuantity(userId, bookId, quantity),
    onSuccess: () => queryClient.invalidateQueries([`cart-${userId}`]),
  });

  const decreaseQuantityMutation = useMutation({
    mutationFn: ({ userId, bookId, quantity }) => cartApi.decreaseQuantity(userId, bookId, quantity),
    onSuccess: () => queryClient.invalidateQueries([`cart-${userId}`]),
  });

  const deleteItemMutation = useMutation({
    mutationFn: ({ userId, bookId }) => cartApi.deleteCartItem(userId, bookId),
    onSuccess: () => queryClient.invalidateQueries([`cart-${userId}`]),
  });

  const handleQuantityChange = (bookId, value) => {
    if (value > 0) {
      increaseQuantityMutation.mutate({ userId, bookId, quantity: value });
    } else {
      decreaseQuantityMutation.mutate({ userId, bookId, quantity: -value });
    }
  };
  const handleRemoveItem = (bookId) => {
    deleteItemMutation.mutate({ userId, bookId });
  };

  const calculateDiscountedPrice = (book) => {
    if (book.discount) {
      return (book.price * (1 - book?.discount?.amount / 100)).toFixed(2);
    }
    return book.price;
  };

  const totalCost = data?.reduce((total, item) => total + calculateDiscountedPrice(item.book) * item.quantity, 0);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="container mx-auto mt-10 p-2">
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-10 py-10 rounded-lg">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{data?.length} Items</h2>
          </div>
          <div className="h-96 overflow-y-scroll">
            {data
              ? data.map((item, index) => (
                  <CartItem
                    key={index}
                    item={item}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveItem={handleRemoveItem}
                  />
                ))
              : null}
          </div>
          <a href="/books" className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </a>
        </div>
        <OrderSummary totalCost={totalCost} itemCount={data.length} cartItems={data} />
      </div>
    </div>
  );
}
