import "./PopularBooks.css";
import TitleTypeOne from "../../UI/TitleTypeOne/TitleTypeOne";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../../services/category-api";
import { bookApi } from "../../services/book-api";
import BookNotFound from "../../assets/book-error-2.png";
import { Link } from "react-router-dom";
import { BsArrowReturnRight } from "react-icons/bs";
import { createSkeletonArray } from "../../utils/createSkeletonArray";
import { Button, Skeleton } from "antd";
import RenderCategories from "../Category/RenderCategories";
import { extractPropertyValues } from "../../utils/extractData";
import { ShoppingCartOutlined, EyeOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import useAddToCart from "../../utils/handleAddToCart";
import Rating from "react-rating";
export default function PopularBooks() {
  const [activeButton, setActiveButton] = useState("all");
  const { handleAddToCart } = useAddToCart();
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getCategories(),
  });
  const { data: popularBooksData, isLoading: popularLoading } = useQuery({
    queryKey: ["popularBooks", activeButton],
    queryFn: () => bookApi.getPopularBooks(8, activeButton),
  });

  const skeletonCategoriesArray = createSkeletonArray(5);
  const skeletonPopularArray = createSkeletonArray(8);
  const handleFilterChange = (category) => {
    setActiveButton(category);
  };

  return (
    <section className="PopularBooks container">
      <div className="container popularbooks-container">
        <TitleTypeOne TitleTop={"Some quality items"} Title={"Popular Books"} className="popularbooks-title" />
        {categoriesLoading ? (
          <>
            <div className="filter-buttons flex">
              {skeletonCategoriesArray.map((i, index) => (
                <div key={index}>
                  <Skeleton.Button active size="default" style={{ width: "70px" }} shape="square" block />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="filter-buttons">
            <button className={activeButton == "all" ? "active" : ""} onClick={() => handleFilterChange("all")}>
              All
            </button>
            {categoriesData
              ? categoriesData.map((category) => (
                  <button
                    key={category.id}
                    className={activeButton === category.name ? "active" : ""}
                    onClick={() => handleFilterChange(category.name)}
                  >
                    {category.name}
                  </button>
                ))
              : null}
          </div>
        )}
        {popularLoading ? (
          <div className="gallery">
            {skeletonPopularArray.map((i, index) => (
              <div className="gallery-items relative" key={index}>
                <Skeleton.Image
                  style={{ width: "100%", height: "100%" }}
                  active
                  className="relative overflow-hidden w-72 h-72 bg-white border rounded-md"
                />
                <div className="popularbook-info">
                  <Skeleton active paragraph={{ rows: 2 }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="gallery">
            {popularBooksData ? (
              popularBooksData.map(({ id, title, categories, average_rate, discount, price, image }) => {
                const discountedPrice = discount ? (price - price * (discount.amount / 100)).toFixed(2) : null;
                return (
                  <div className="gallery-items relative" key={id}>
                    <div className="relative overflow-hidden w-72 h-72 bg-white border rounded-md">
                      <div className="absolute right-0 top-0 h-16 w-16 z-10">
                        {" "}
                        {discountedPrice ? (
                          <div className="absolute transform rotate-45 bg-red-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
                            {`${discount?.amount}% Off`}
                          </div>
                        ) : null}
                      </div>
                      <div className="group relative">
                        <Link to={`/book/${id}`}>
                          <div className="featurebook-blur rounded-md"></div>
                          <img
                            src={image}
                            alt={title}
                            className="featurebook w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:opacity-75"
                          />
                        </Link>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Link to={`/book/${id}`} className="m-2">
                            <Button
                              type="primary"
                              shape="circle"
                              icon={<EyeOutlined style={{ fontSize: "32px" }} />}
                              className="bg-white text-black opacity-75 hover:opacity-100"
                              size="large"
                            />
                          </Link>
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<ShoppingCartOutlined style={{ fontSize: "32px" }} />}
                            className="bg-white text-black opacity-75 hover:opacity-100 m-2"
                            onClick={() => handleAddToCart(id, 1)}
                            size="large"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="popularbook-info">
                      <h4>{title}</h4>
                      <Rating
                        start={0}
                        stop={5}
                        fractions={3}
                        fullSymbol={<StarFilled className="text-yellow-500 text-lg" />}
                        emptySymbol={<StarOutlined className="text-lg" />}
                        initialRating={average_rate}
                        readonly
                      />
                      <div>
                        <small>
                          {" "}
                          <RenderCategories categories={extractPropertyValues(categories, "name")} />
                        </small>
                      </div>
                      <div className="mt-2">
                        {discountedPrice ? (
                          <span className="text-lg text-red-500 font-semibold">$ {discountedPrice}</span>
                        ) : null}
                        <span
                          className={`  ${
                            discountedPrice ? "line-through text-gray-500 text-md" : "text-red-500 text-lg"
                          } ml-3`}
                        >
                          $ {price}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-books-found-container">
                <img
                  src={BookNotFound}
                  alt="Book error image"
                  className="rounded-lg w-1/2  transition-transform duration-300 transform hover:scale-110"
                />
              </div>
            )}
          </div>
        )}
        <div className="mt-12">
          <Link to="/books" className=" btn-popular feature-btn">
            View all books <BsArrowReturnRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
