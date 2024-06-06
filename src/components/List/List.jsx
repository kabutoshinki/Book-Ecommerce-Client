import { Card, Layout, Select } from "antd";
const { Content } = Layout;
import { ShoppingCartOutlined, EyeOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderCategories from "../Category/RenderCategories";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../../services/book-api";
import { Pagination } from "@nextui-org/react";
import { extractPropertyValues } from "../../utils/extractData";
import useAddToCart from "../../utils/handleAddToCart";
import Rating from "react-rating";
import { BounceLoader } from "react-spinners";

const { Option } = Select;
const { Meta } = Card;

export default function List({ filterData }) {
  const { searchQuery, selectedCategories, selectedAuthors, selectedRatings, priceRange } = filterData;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [sortOrder, setSortOrder] = useState("popularity");
  const { handleAddToCart } = useAddToCart();
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "books",
      page,
      limit,
      sortOrder,
      searchQuery,
      selectedCategories,
      selectedAuthors,
      selectedRatings,
      priceRange,
    ],
    queryFn: () =>
      bookApi.getBooks(
        page,
        limit,
        sortOrder,
        searchQuery,
        selectedCategories,
        selectedAuthors,
        selectedRatings,
        priceRange
      ),
    retry: false, // Disable automatic retries
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
    window.scrollTo(0, 0);
  }, [searchQuery, selectedCategories, selectedAuthors, selectedRatings, priceRange]);

  const handleLimitChange = (value) => {
    setLimit(value);
    setPage(1);
  };
  const handleSortChange = (value) => {
    setSortOrder(value);
    setPage(1);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleDetailClick = (id) => {
    navigate(`/book/${id}`);
  };

  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <Layout.Header className="bg-white px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Books</h2>
        <div className="flex items-center space-x-4">
          <Select value={sortOrder} className="w-36" onChange={handleSortChange}>
            <Option value="popularity">Popularity</Option>
            <Option value="onSale">On Sale</Option>
            <Option value="priceLow">Low Price</Option>
            <Option value="priceHigh">High Price</Option>
          </Select>

          <Select value={limit.toString()} className="w-20" onChange={handleLimitChange}>
            <Option value="12">12</Option>
            <Option value="24">24</Option>
            <Option value="32">32</Option>
          </Select>
        </div>
      </Layout.Header>
      {!isLoading ? (
        <Content className="p-4">
          {data ? <p>Showing {data?.meta?.totalItems} books</p> : null}
          <div className="grid grid-cols-4 gap-4">
            {data
              ? data?.items?.map(({ id, title, price, discount, average_rate, categories, image }, index) => {
                  const discountedPrice = discount ? (price * (1 - discount.amount / 100)).toFixed(2) : null;
                  const discountRibbon = discount ? (
                    <div className="absolute top-0 left-0 bg-red-500 text-white font-semibold px-2 py-1 rounded-tr-md rounded-bl-md z-10">
                      {discount.amount}% Off
                    </div>
                  ) : null;

                  // Handle description properly

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
                          alt={title}
                          src={image}
                          className={`h-48 object-cover w-full rounded-md transition duration-300 ${
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
                            <button onClick={() => handleDetailClick(id)} className="focus:outline-none">
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
                            <button onClick={() => handleAddToCart(id, 1)} className="focus:outline-none">
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
                        title={title}
                        description={
                          <>
                            <Rating
                              start={0}
                              stop={5}
                              fractions={3}
                              fullSymbol={<StarFilled className="text-yellow-500 text-lg" />}
                              emptySymbol={<StarOutlined className="text-lg" />}
                              initialRating={average_rate}
                              readonly
                            />
                            <div className="mt-2">
                              <RenderCategories categories={extractPropertyValues(categories, "name")} />
                            </div>
                            {discountedPrice ? (
                              <div className="mt-2">
                                <span className="line-through text-gray-500">${price}</span>
                                <span className="text-red-500 ml-2">${discountedPrice}</span>
                              </div>
                            ) : (
                              <div className="mt-2">${price}</div>
                            )}
                          </>
                        }
                      />
                    </Card>
                  );
                })
              : null}
          </div>
          {data && data?.meta?.totalPages > 1 ? (
            <Pagination
              page={page}
              total={data?.meta?.totalPages}
              onChange={(newPage) => {
                setPage(newPage);
                window.scrollTo(0, 0);
              }}
              className="mt-4 text-center"
            />
          ) : null}
        </Content>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <BounceLoader />
        </div>
      )}
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
