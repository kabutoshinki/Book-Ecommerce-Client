import { Card, Dropdown, Layout, Menu, Pagination, Select, Rate } from "antd";
const { Content } = Layout;
import { DownOutlined, ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { booksData } from "../../data/data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderCategories from "../Category/RenderCategories";
import PropTypes from "prop-types";
const { Option } = Select;
const { Meta } = Card;

const ratings = [
  { label: "1 Star", range: [0, 1.9] },
  { label: "2 Stars", range: [2, 2.9] },
  { label: "3 Stars", range: [3, 3.9] },
  { label: "4 Stars", range: [4, 4.9] },
  { label: "5 Stars", range: [5, 5.9] },
];

export default function List({ filterData }) {
  const { searchQuery, selectedCategories, selectedAuthors, selectedRatings, priceRange } = filterData;
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const filteredBooks = booksData.filter((book) => {
    const matchesSearchQuery = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategories =
      selectedCategories.length === 0 || selectedCategories.some((cat) => book.categories.includes(cat));
    const matchesAuthors =
      selectedAuthors.length === 0 || selectedAuthors.some((author) => book?.authors?.includes(author));
    const matchesRatings =
      selectedRatings.length === 0 ||
      selectedRatings.some(() =>
        selectedRatings.some((label) => {
          const rating = ratings.find((rating) => rating.label === label);
          return rating && rating.range[0] <= book.rating && book.rating <= rating.range[1];
        })
      );
    const matchesPriceRange = priceRange[0] <= book.price && book.price <= priceRange[1];
    return matchesSearchQuery && matchesCategories && matchesAuthors && matchesRatings && matchesPriceRange;
  });
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleDetailClick = (book) => {
    // Placeholder function for handling detail click
    navigate(`/book/${book.id}`);
  };

  const handleAddToCart = (book) => {
    // Placeholder function for handling add to cart click
    console.log(`Added book to cart: ${book.title}`);
  };

  const sortMenu = (
    <Menu>
      <Menu.Item key="1">Sort by on sale</Menu.Item>
      <Menu.Item key="2">Sort by popularity</Menu.Item>
      <Menu.Item key="3">Sort by price: low to high</Menu.Item>
      <Menu.Item key="4">Sort by price: high to low</Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Layout.Header className="bg-white px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Books</h2>
        <div className="flex items-center space-x-4">
          <Dropdown overlay={sortMenu}>
            <button className="px-4 py-2 rounded-lg hover:bg-gray-100">
              Sort by <DownOutlined />
            </button>
          </Dropdown>
          <Select defaultValue="20" className="w-20">
            <Option value="10">10</Option>
            <Option value="20">20</Option>
            <Option value="50">50</Option>
          </Select>
        </div>
      </Layout.Header>
      <Content className="p-4">
        <p>Showing {filteredBooks.length} books</p>
        <div className="grid grid-cols-4 gap-4">
          {filteredBooks.map((book, index) => {
            const discountedPrice = book.discount ? (book.price * (1 - book.discount / 100)).toFixed(2) : null;
            const discountRibbon = book.discount ? (
              <div className="absolute top-0 left-0 bg-red-500 text-white font-semibold px-2 py-1 rounded-tr-md rounded-bl-md z-10">
                {book.discount}% Off
              </div>
            ) : null;
            return (
              <Card
                key={index}
                hoverable
                className="w-full relative transition-transform transform hover:scale-105"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative">
                  {discountRibbon}
                  <img
                    alt={book.title}
                    src={book.image}
                    className={`h-48 object-cover w-full transition duration-300 ${
                      hoveredIndex === index ? "filter blur-sm" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center space-x-5 transition-opacity duration-300 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div
                      className={`bg-white border border-gray-300 rounded-full p-2 transition-all duration-300 hover:scale-110`}
                    >
                      <button onClick={() => handleDetailClick(book)} className="focus:outline-none">
                        <EyeOutlined
                          className={`text-black text-2xl cursor-pointer transition-opacity duration-300 ${
                            hoveredIndex === index ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </button>
                    </div>
                    <div
                      className={`bg-white border border-gray-300 rounded-full p-2 transition-all duration-300 hover:scale-110`}
                    >
                      <button onClick={() => handleAddToCart(book)} className="focus:outline-none">
                        <ShoppingCartOutlined
                          className={`text-black text-2xl cursor-pointer transition-opacity duration-300 ${
                            hoveredIndex === index ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <Meta
                  title={book.title}
                  description={
                    <>
                      <Rate value={book.rating} allowHalf disabled />
                      <div className="mt-2">
                        <RenderCategories categories={book.categories} />
                      </div>
                      {discountedPrice ? (
                        <div className="mt-2">
                          <span className="line-through text-gray-500">${book.price}</span>
                          <span className="text-red-500 ml-2">${discountedPrice}</span>
                        </div>
                      ) : (
                        <div className="mt-2">${book.price}</div>
                      )}
                    </>
                  }
                />
              </Card>
            );
          })}
        </div>
        <Pagination defaultCurrent={1} total={126} className="mt-4 text-center" />
      </Content>
    </Layout>
  );
}
List.propTypes = {
  filterData: PropTypes.shape({
    searchQuery: PropTypes.string.isRequired,
    selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedAuthors: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedRatings: PropTypes.arrayOf(PropTypes.string).isRequired,
    priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};
