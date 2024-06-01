import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DeleteAddress from "../../Modal/Address/DeleteAddress";
import UpdateAddress from "../../Modal/Address/UpdateAddress";
import TableContent from "../Table/TableContent";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import SelectAddress from "../../Modal/Address/SelectAddress";

const AddressList = ({ addresses, onUpdate, onDelete, onSelect }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedAddress, setEditedAddress] = useState(null);
  const [deleteAddressId, setDeleteAddressId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({ column: "", direction: "ascending" });
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5; // Define the number of items per page

  const handleEdit = (address) => {
    setEditedAddress(address);
    setIsModalVisible(true);
  };

  const handleUpdate = (values) => {
    onUpdate(values);
    setIsModalVisible(false);
  };

  const handleDelete = (addressId) => {
    onDelete(addressId);
    setDeleteAddressId(null);
  };

  const handleSelect = (addressId) => {
    setSelectedAddressId(null);
    onSelect(addressId);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const renderCell = (post, columnKey) => {
    switch (columnKey) {
      case "title":
        return post.title;
      case "address_line_1":
        return (
          <Tooltip placement="top" title={post.address_line_1}>
            {truncateText(post.address_line_1, 30)}
          </Tooltip>
        );
      case "address_line_2":
        return (
          <Tooltip placement="top" title={post.address_line_2}>
            {truncateText(post.address_line_2, 30)}
          </Tooltip>
        );
      case "city":
        return post.city;
      case "isSelected":
        return post.isSelected ? "Selected" : "Not Selected";
      case "phone_number":
        return post.phone_number;
      case "action":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <BsThreeDotsVertical className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Options" disabledKeys={["selectedDis", "editDis", "delDis"]}>
                <DropdownItem
                  color="primary"
                  key={post.isSelected ? "selectedDis" : "view"}
                  onClick={() => setSelectedAddressId(post.id)}
                >
                  Set default
                </DropdownItem>
                <DropdownItem color="warning" onClick={() => handleEdit(post)}>
                  Edit
                </DropdownItem>
                <DropdownItem color="danger" onClick={() => setDeleteAddressId(post.id)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return post[columnKey];
    }
  };

  const headerColumns = [
    { name: "Title", uid: "title" },
    { name: "Address Line 1", uid: "address_line_1" },
    { name: "Address Line 2", uid: "address_line_2" },
    { name: "Status", uid: "isSelected" },
    { name: "City", uid: "city" },
    { name: "Phone Number", uid: "phone_number" },
    { name: "Action", uid: "action" },
  ];

  const filteredAddresses = addresses.filter(
    (address) =>
      address.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.address_line_1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (address.address_line_2 && address.address_line_2.toLowerCase().includes(searchTerm.toLowerCase())) ||
      address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.phone_number.includes(searchTerm)
  );

  const totalPage = Math.ceil(filteredAddresses.length / itemsPerPage);

  // Slice the addresses array to get the current page items
  const currentPageItems = filteredAddresses.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return (
    <div>
      <Input
        isClearable
        className="w-full sm:max-w-[44%] my-3 justify-end"
        placeholder="Search by name..."
        startContent={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContent
        renderCell={renderCell}
        headerColumns={headerColumns}
        items={currentPageItems}
        page={page}
        setPage={setPage}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        totalPage={totalPage}
      />

      {editedAddress && (
        <UpdateAddress
          key={editedAddress.id} // Ensure key is unique
          isVisible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onUpdate={handleUpdate}
          address={editedAddress}
        />
      )}
      <DeleteAddress
        isVisible={!!deleteAddressId}
        onDelete={() => handleDelete(deleteAddressId)}
        onCancel={() => setDeleteAddressId(null)}
      />
      <SelectAddress
        isVisible={!!selectedAddressId}
        onSelect={() => handleSelect(selectedAddressId)}
        onCancel={() => setSelectedAddressId(null)}
      />
    </div>
  );
};

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      address_line_1: PropTypes.string.isRequired,
      address_line_2: PropTypes.string,
      city: PropTypes.string.isRequired,
      phone_number: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired, // Add onSelect prop
};

export default AddressList;
