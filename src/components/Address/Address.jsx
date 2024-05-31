import { useQuery } from "@tanstack/react-query"; // Import useQuery hook
import { getUserInfo } from "../../utils/getUserInfo";
import { Card } from "antd";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";
import { addressApi } from "../../services/address-api";
import { useNavigate } from "react-router-dom";
export default function Address() {
  const userInfo = getUserInfo();
  const navigate = useNavigate();
  if (!userInfo) {
    navigate("/");
  }
  const {
    data: addresses,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [`user-address-${userInfo?.sub}`, userInfo?.sub],
    queryFn: () => addressApi.getAddressByUserId(userInfo?.sub),
  });

  const handleAddAddress = async (newAddress) => {
    try {
      // Create a new review
      await addressApi.createUserAddress(
        userInfo.sub,
        newAddress.title,
        newAddress.address_line_1,
        newAddress.address_line_2,
        newAddress.city,
        newAddress.phone_number
      );
      // Refetch reviews after adding the new one
      refetch();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  const handleUpdateAddress = async (updateAddress) => {
    try {
      // Create a new review
      await addressApi.updateUserAddress(
        userInfo.sub,
        updateAddress.id,
        updateAddress.title,
        updateAddress.address_line_1,
        updateAddress.address_line_2,
        updateAddress.city,
        updateAddress.phone_number
      );
      // Refetch reviews after adding the new one
      refetch();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  const handleDeleteAddress = async (addressId) => {
    try {
      await addressApi.deleteAddressUserItem(addressId);
      refetch();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card>
      {/* Add Review Form */}

      <AddressForm onAddAddress={handleAddAddress} userInfo={userInfo} />

      {/* Review List */}
      <AddressList onUpdate={handleUpdateAddress} addresses={addresses} onDelete={handleDeleteAddress} />
    </Card>
  );
}
