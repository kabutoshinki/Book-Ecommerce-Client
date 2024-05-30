import { cartApi } from "../services/cart-api";
import { generateDeviceId } from "./generateDeviceId";
import { getUserInfo } from "./getUserInfo";

export const handleAddToCart = async (bookId, quantity) => {
  try {
    let userId;
    if (getUserInfo()) {
      const user = getUserInfo();
      userId = user.id;
    } else {
      userId = generateDeviceId();
    }
    await cartApi.addToCart(userId, bookId, quantity); // Assuming quantity is 1 for now
    console.log("cart");
  } catch (error) {
    // Handle errors, such as displaying an error message to the user
    console.error("Error adding item to cart:", error);
  }
};
