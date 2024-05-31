import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { authApi } from "../../services/auth-api";
import { useState } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await authApi.register(
        values.firstName,
        values.lastName,
        values.username,
        values.email,
        values.password
      );

      message.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      message.error("Registration failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <Form name="register" onFinish={onFinish} layout="vertical">
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

          <Form.Item name="firstName" rules={[{ required: true, message: "Please input your first name!" }]}>
            <Input placeholder="First Name" className="py-2 px-4 border rounded-md" />
          </Form.Item>

          <Form.Item name="lastName" rules={[{ required: true, message: "Please input your last name!" }]}>
            <Input placeholder="Last Name" className="py-2 px-4 border rounded-md" />
          </Form.Item>

          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input placeholder="Username" className="py-2 px-4 border rounded-md" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input placeholder="Email" className="py-2 px-4 border rounded-md" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input.Password placeholder="Password" className="py-2 px-4 border rounded-md" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Đăng ký
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <span>Bạn đã có tài khoản? </span>
            <Link to="/login" className="text-blue-500">
              Đăng nhập
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
