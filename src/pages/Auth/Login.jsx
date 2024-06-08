import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { authApi } from "../../services/auth-api";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { generateDeviceId } from "../../utils/generateDeviceId";
import { auth, googleAuthProvider } from "../../../config/firebase"; // Import Firebase config
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const guest_cart = generateDeviceId();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { accessToken, refreshToken } = await authApi.login(values.email, values.password, guest_cart);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Decode accessToken to get user information if needed
      const decodedAccessToken = jwtDecode(accessToken);
      console.log("User info:", decodedAccessToken);
      localStorage.setItem("userInfo", JSON.stringify(decodedAccessToken));
      message.success("Login successful!");
      navigate("/"); // Redirect to home page or another page
    } catch (error) {
      message.error("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const tokenId = await result.user.getIdToken();
      setLoading(true);

      const { accessToken, refreshToken } = await authApi.googleLogin(tokenId);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Decode accessToken to get user information if needed
      const decodedAccessToken = jwtDecode(accessToken);
      console.log("User info:", decodedAccessToken);
      localStorage.setItem("userInfo", JSON.stringify(decodedAccessToken));
      message.success("Google login successful!");
      navigate("/"); // Redirect to home page or another page
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        message.info("Google login canceled by user.");
      } else {
        message.error("Google login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <Form name="login" onFinish={onFinish} layout="vertical">
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input
              prefix={<AiOutlineUser className="text-gray-500" />}
              placeholder="Email"
              className="py-2 px-4 border rounded-md"
            />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input.Password
              prefix={<AiOutlineLock className="text-gray-500" />}
              placeholder="Mật khẩu"
              className="py-2 px-4 border rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-blue-500">
              Quên mật khẩu
            </Link>
          </div>
        </Form>

        <div className="text-center mt-6">
          <Button
            type="primary"
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Login with Google
          </Button>
        </div>

        <div className="border-t mt-6 pt-6 text-center">
          <span>Bạn chưa có tài khoản? </span>
          <Link to="/register" className="text-blue-500">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}
