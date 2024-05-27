import "./FeaturesBooks.css";
import TitleTypeOne from "../../UI/TitleTypeOne/TitleTypeOne";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowReturnRight } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../../services/book-api";
import RenderCategories from "../Category/RenderCategories";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
const breakpoints = {
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  480: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
};

export default function OnSalesBooks() {
  const { data, isLoading } = useQuery({
    queryKey: ["booksSale"],
    queryFn: () => bookApi.getBooksOnSale(),
  });
  if (isLoading) return <div>Loading...</div>;
  const extractCategoryNames = (categories) => {
    return categories.map((category) => category.name);
  };
  return (
    <section className="Featured">
      <div className="container features-book-container">
        <TitleTypeOne TitleTop={"Some quality items"} Title={"OnSale Books"} />
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          loop={true}
          modules={[Pagination, Autoplay]}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          breakpoints={breakpoints}
          autoplay={{ delay: 3000 }}
        >
          {data.map(({ id, image, title, categories, price, discount }, index) => {
            const discountedPrice = discount ? (price - price * (discount.amount / 100)).toFixed(2) : null;
            return (
              <SwiperSlide key={index}>
                <div className="featurebook-box relative group flex flex-col items-center justify-center">
                  <div className="relative overflow-hidden w-72 h-72 bg-white border rounded-md">
                    <div className="absolute right-0 top-0 h-16 w-16 z-10">
                      {" "}
                      <div className="absolute transform rotate-45 bg-red-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
                        {`${discount.amount}% Off`}
                      </div>
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
                          size="large"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="featurebook-info p-2 mt-4">
                    <Link to={`/book/${id}`} className="text-lg font-semibold block mb-2">
                      {title}
                    </Link>
                    <RenderCategories categories={extractCategoryNames(categories)} />
                    <div className="mt-2">
                      {discountedPrice ? (
                        <span className="text-lg text-red-500 font-semibold">$ {discountedPrice}</span>
                      ) : null}
                      <span className="text-sm text-gray-500 line-through ml-2">$ {price}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          <div className="feature-border container"></div>
          <div className="swiper-pagination"></div>
          <Link to="/books" className="btn feature-btn">
            View all books <BsArrowReturnRight />
          </Link>
        </Swiper>
      </div>
    </section>
  );
}
