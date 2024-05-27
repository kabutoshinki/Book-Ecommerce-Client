import "./Header.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import headerShape from "../../assets/header-shape.svg";
import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../../services/book-api";
import { Rate } from "antd";
export default function Header() {
  const { data, isLoading } = useQuery({
    queryKey: ["bestBooks"],
    queryFn: () => bookApi.getBestBooks(3),
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <header>
      <div className="container header-container">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{ prevEl: ".button-prev-slide", nextEl: ".button-next-slide" }}
          autoplay={{ delay: 3000 }}
        >
          {data.map(({ title, description, price, discount, average_rate, sold_quantity, image, id }, index) => {
            const discountedPrice = discount ? (price - price * (discount.amount / 100)).toFixed(2) : null;
            return (
              <SwiperSlide key={index}>
                <div className="header-wrapper container relative">
                  {discount && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white font-semibold py-1 px-3 z-10 transition-transform duration-300 transform hover:scale-110">
                      {`${discount.amount}% Off`}
                    </div>
                  )}
                  <div className="header-left mt-5">
                    <h1>{title}</h1>
                    <div className="flex items-center">
                      <Rate value={average_rate} allowHalf disabled />
                      <h6 className="ms-2">{sold_quantity} Sold</h6>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: description }}></p>
                    <div className="price mb-5 flex items-center">
                      {discountedPrice ? <h2 className="text-red-500 text-3xl">{`$ ${discountedPrice}`}</h2> : null}
                      <h2 className="text-2xl text-gray-500 line-through ml-3">{`$ ${price}`}</h2>
                    </div>
                    <Link className="btn btn-border " to={`book/${id}`}>
                      View Detail
                    </Link>
                  </div>
                  <div className="header-right">
                    <img
                      src={image}
                      alt="book image"
                      className="w-full transition-transform duration-300 transform hover:scale-125"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          <div className="slider-button">
            <div className="button-prev-slide slidebutton">
              <GoArrowLeft />
            </div>
            <div className="button-next-slide slidebutton">
              <GoArrowRight />
            </div>
          </div>
          <div className="container">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
        <div className="header-shape">
          <img src={headerShape} alt="" />
        </div>
      </div>
    </header>
  );
}
