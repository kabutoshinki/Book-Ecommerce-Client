import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import FailedPic from "../../assets/failed.gif";
const Failed = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={FailedPic} alt="Success" className="w-52 h-52 mb-8 rounded-full" />
      <h1 className="text-2xl font-bold mb-4">Order Failed!</h1>
      <p className="text-lg text-center mb-8">
        Unfortunately, there was an issue processing your order. Please try again.
      </p>
      <Button type="primary" onClick={handleReturnHome}>
        Return to Home
      </Button>
    </div>
  );
};

export default Failed;
