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
import { Skeleton } from "antd";
import { createSkeletonArray } from "../../utils/createSkeletonArray";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import BookNotFound from "../../assets/book-error-3.png";
import Rating from "react-rating";
export default function Header() {
  const { data, isLoading } = useQuery({
    queryKey: ["bestBooks"],
    queryFn: () => bookApi.getBestBooks(3),
  });
  const skeletonHeaderArray = createSkeletonArray(3);

  return (
    <header>
      <div className="container header-container">
        {isLoading ? (
          <>
            <Swiper spaceBetween={50} slidesPerView={1} loop={true} modules={[Navigation, Pagination]}>
              {skeletonHeaderArray.map((i, index) => (
                <SwiperSlide key={index}>
                  <div className="header-wrapper container relative">
                    <div className="header-left mt-5  ">
                      <Skeleton active title={true} paragraph={{ width: "40%" }} />
                      <Skeleton.Button active title={true} paragraph={{ width: "80%" }} className="mt-4 w-60 h-20" />
                    </div>
                    <div className="header-right  mx-auto">
                      <Skeleton.Image
                        active
                        style={{ width: "350px", height: "500px" }}
                        className=" object-center w-full transition-transform duration-300 transform hover:scale-125"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{ prevEl: ".button-prev-slide", nextEl: ".button-next-slide" }}
            autoplay={{ delay: 3000 }}
          >
            {data ? (
              data?.map(({ title, description, price, discount, average_rate, sold_quantity, image, id }, index) => {
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
                        <div className="">
                          <Rating
                            start={0}
                            stop={5}
                            fractions={3}
                            fullSymbol={<StarFilled className="text-yellow-500 text-2xl" />}
                            emptySymbol={<StarOutlined className="text-2xl" />}
                            initialRating={average_rate}
                            readonly
                          />
                          <h6 className="ms-2">{sold_quantity} Sold</h6>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: description }}></p>
                        <div className="price mb-5 flex items-center">
                          {discountedPrice ? <h2 className="text-red-500 text-3xl">{`$ ${discountedPrice}`}</h2> : null}
                          <h2
                            className={`  ${
                              discountedPrice ? "line-through text-gray-500 text-2xl" : "text-red-500 text-3xl"
                            } ml-3`}
                          >{`$ ${price}`}</h2>
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
              })
            ) : (
              <div className="flex justify-center items-center">
                <img
                  src={BookNotFound}
                  alt="Book error image"
                  className=" w-96 h-96 mt-10  rounded-lg transition-transform duration-300 transform hover::scale-110"
                />
              </div>
            )}
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
        )}
        <div className="header-shape">
          <img src={headerShape} alt="shape" />
        </div>
      </div>
    </header>
  );
}
