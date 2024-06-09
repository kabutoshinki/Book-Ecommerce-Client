import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { orderApi } from "../../services/order-api";
import LoadingPic from "../../assets/loading.gif";
export default function RedirectPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const resultCode = searchParams.get("resultCode");
    const orderId = searchParams.get("orderInfo");

    const handleRedirect = async () => {
      if (resultCode === "0") {
        try {
          await orderApi.changeOrderStatus(orderId, "PaymentSucceeded");
          setTimeout(() => {
            navigate("/success");
          }, 5000);
        } catch (error) {
          setTimeout(() => {
            navigate("/failed");
          }, 5000);
        }
      } else {
        try {
          await orderApi.changeOrderStatus(orderId, "PaymentFailed");
          setTimeout(() => {
            navigate("/failed");
          }, 5000);
        } catch (error) {
          setTimeout(() => {
            navigate("/failed");
          }, 5000);
        }
      }
    };

    if (resultCode && orderId) {
      handleRedirect();
    }
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={LoadingPic} alt="Loading" className="w-52 h-52 mb-8 rounded-full" />
      <h1 className="text-2xl font-bold mb-4">Processing...</h1>
      <p className="text-lg text-center mb-8">Please wait while we process your order.</p>
    </div>
  );
}
