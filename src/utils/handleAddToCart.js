import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { cartApi } from "../services/cart-api";
import { generateDeviceId } from "./generateDeviceId";
import { getUserInfo } from "./getUserInfo";

const useAddToCart = () => {
  const queryClient = useQueryClient();

  const handleAddToCart = async (bookId, quantity = 1) => {
    try {
      let userId;
      if (getUserInfo()) {
        const user = getUserInfo();
        userId = `user-${user.sub}`;
      } else {
        userId = generateDeviceId();
      }
      await cartApi.addToCart(userId, bookId, quantity);
      toast.success("Item added 🛒🛒🛒");
      queryClient.invalidateQueries({ queryKey: ["cartQuantity"] });
    } catch (error) {
      toast.error("Item add failed 😥😥😥");
      console.error("Error adding item to cart:", error);
    }
  };

  return { handleAddToCart };
};

export default useAddToCart;
