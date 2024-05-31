import { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Tabs, message } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { getUserInfo } from "../../utils/getUserInfo";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { userApi } from "../../services/user-api";
import Address from "../../components/Address/Address";

const { TabPane } = Tabs;

const Profile = () => {
  const userInfo = getUserInfo();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`profile-${userInfo?.sub}`],
    queryFn: () => userApi.getProfile(userInfo.sub),
    enabled: !!userInfo,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      setImagePreviewUrl(data.avatar);
    }
  }, [data, form]);

  const updateProfileMutation = useMutation({
    mutationFn: (updateUserDto) => userApi.updateProfile(userInfo.sub, updateUserDto, selectedFile),
    onSuccess: () => {
      message.success("Profile updated successfully");
    },
    onError: (error) => {
      message.error("Failed to update profile");
      console.error(error);
    },
  });

  const handleFormSubmit = async (values) => {
    const updateUserDto = {
      firstName: values.firstName,
      lastName: values.lastName,
    };
    const updatedUser = await updateProfileMutation.mutateAsync(updateUserDto);
    if (updatedUser) {
      userInfo.avatar = updatedUser.avatar;

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    // updateProfileMutation.mutate(updateUserDto);
    refetch();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Update image preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) return <>Loading...</>;

  return (
    <div className="container mx-auto my-5 p-5 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 text-center md:border-r border-gray-200 p-5">
          <img
            src={
              imagePreviewUrl || "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"
            }
            className="rounded-full mx-auto mb-4 cursor-pointer w-40 h-40"
            width={200}
            style={{ border: "1px solid #eee" }}
            onClick={() => fileInputRef.current?.click()}
            alt="Avatar"
          />
          <input
            id="avatar"
            name="avatar"
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <h3 className="text-xl font-semibold">{data?.firstName + " " + data?.lastName || "Huy"}</h3>
        </div>
        <div className="md:w-3/4 p-5">
          <h4 className="text-lg font-semibold mb-4">PERSONAL INFORMATION</h4>
          <Tabs defaultActiveKey="1">
            <TabPane tab="User Information" key="1">
              <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="First Name" name="firstName">
                    <Input prefix={<UserOutlined />} placeholder="First Name" />
                  </Form.Item>
                  <Form.Item label="Last Name" name="lastName">
                    <Input prefix={<UserOutlined />} placeholder="Last Name" />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input prefix={<MailOutlined />} placeholder="Email" disabled />
                  </Form.Item>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mt-2"
                  style={{ backgroundColor: "#008001", borderColor: "#008001", borderRadius: "999px" }}
                >
                  Update Profile
                </Button>
              </Form>
            </TabPane>
            <TabPane tab="Address" key="2">
              <Address />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
