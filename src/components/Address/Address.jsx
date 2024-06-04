import { useQuery } from "@tanstack/react-query"; // Import useQuery hook
import { getUserInfo } from "../../utils/getUserInfo";
import { Card, message } from "antd";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";
import { addressApi } from "../../services/address-api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { PuffLoader } from "react-spinners";
export default function Address({ checkEmpty }) {
  const userInfo = getUserInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const {
    data: addresses,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [`user-address-${userInfo?.sub}`, userInfo?.sub],
    queryFn: () => addressApi.getAddressByUserId(userInfo?.sub),
  });
  useEffect(() => {
    if (checkEmpty && addresses) {
      checkEmpty(addresses.length === 0);
    }
  }, [addresses, checkEmpty]);
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
      message.success("Address add successfully");
      // Refetch reviews after adding the new one
      refetch();
    } catch (error) {
      console.error("Error adding review:", error);
      message.success("Address add failed");
    }
  };
  const handleUpdateAddress = async (updateAddress) => {
    try {
      // Ensure that the updateAddress object contains the id property
      const { id, title, address_line_1, address_line_2, city, phone_number } = updateAddress;

      // Check if the id is available
      console.log(updateAddress);
      // Call the updateUserAddress function with the correct parameters
      await addressApi.updateUserAddress(id, userInfo.sub, title, address_line_1, address_line_2, city, phone_number);

      // Refetch addresses after updating
      refetch();
    } catch (error) {
      console.error("Error updating address:", error);
      message.error("Failed to update address");
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
  const handleSelectAddress = async (addressId) => {
    try {
      await addressApi.selectedAddressUserItem(addressId, userInfo.sub);
      refetch();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card>
      {/* Add Review Form */}

      <AddressForm onAddAddress={handleAddAddress} userInfo={userInfo} />

      {/* Review List */}
      <AddressList
        onUpdate={handleUpdateAddress}
        addresses={addresses}
        onDelete={handleDeleteAddress}
        onSelect={handleSelectAddress}
      />
    </Card>
  );
}
Address.propTypes = {
  checkEmpty: PropTypes.bool,
};
