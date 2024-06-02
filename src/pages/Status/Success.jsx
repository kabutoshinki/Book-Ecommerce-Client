import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import SuccessPic from "../../assets/success.gif";
const Success = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={SuccessPic} alt="Success" className="w-52 h-52 mb-8 rounded-full" />
      <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-lg text-center mb-8">Thank you for your purchase. Your order has been placed successfully.</p>
      <Button type="primary" onClick={handleReturnHome}>
        Return to Home
      </Button>
    </div>
  );
};

export default Success;
