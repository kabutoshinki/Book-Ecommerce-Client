import "./BestSellingBooks.css";
import TitleTypeTwo from "../../UI/TitleTypeTwo/TitleTypeTwo";
import TreeShape from "../../assets/treeShape.png";
// import { sellingBooksData } from "../../data/data";
import { Link } from "react-router-dom";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { BsArrowRight } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../../services/book-api";
import { Skeleton } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { createSkeletonArray } from "../../utils/createSkeletonArray";
import BookNotFound from "../../assets/book-error-3.png";
import Rating from "react-rating";
export default function BestSellingBooks() {
  const { data, isLoading } = useQuery({
    queryKey: ["BestSellingBooks"],
    queryFn: () => bookApi.getBestSellingBooks(),
  });

  const skeletonBestSellingArray = createSkeletonArray(1);
  return (
    <section className="BestSellingBook">
      <div className="treeShape">
        <img src={TreeShape} alt="tree" />
      </div>

      {isLoading ? (
        <>
          {skeletonBestSellingArray.map((_, index) => (
            // ....

            <div key={index} className="container bestselling-container">
              <div className="selling-book-left">
                <Skeleton.Image
                  style={{ width: "400px", height: "500px" }}
                  active
                  className="w-96 h-96 rounded-lg drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="selling-book-right">
                <TitleTypeTwo Title={"Best Selling Book"} className="sellingBookTitle" />
                <Skeleton active title={true} paragraph={{ rows: 1, width: "40%" }} />
                <Skeleton active title={true} paragraph={{ rows: 3, width: "80%" }} />
                <Skeleton active title={{ width: "40%" }} paragraph={false} />

                <Skeleton.Button shape="square" active style={{ width: "80px" }} className="mt-4 w-60 h-20" />
              </div>
            </div>
          ))}
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
            data.map(
              ({ id, image, description, discount, title, average_rate, sold_quantity, price, authors }, index) => {
                const discountedPrice = discount ? (price - price * (discount.amount / 100))?.toFixed(2) : null;
                return (
                  <SwiperSlide key={index}>
                    <div className="container bestselling-container">
                      <div className="selling-book-left">
                        <img
                          src={image}
                          alt="image"
                          className="rounded-lg drop-shadow-xl hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="selling-book-right">
                        <TitleTypeTwo Title={"Best Selling Book"} className="sellingBookTitle" />
                        <small>
                          {"BY " +
                            authors
                              .map((author, i) => (i === authors.length - 1 ? author.name : author.name + " | "))
                              .join("")}
                        </small>
                        <h3>{title}</h3>
                        <div className="flex items-center justify-center md:justify-start">
                          <Rating
                            start={0}
                            stop={5}
                            fractions={3}
                            fullSymbol={<StarFilled className="text-yellow-500 text-lg" />}
                            emptySymbol={<StarOutlined className="text-lg" />}
                            initialRating={average_rate}
                            readonly
                          />
                          <h6 className="mx-2">{sold_quantity} Sold </h6>
                          {discount && (
                            <div className="discount-ribbon bg-red-500 text-white px-2 py-1 text-xs font-bold hover:scale-105 transition-transform duration-300">
                              {discount.name}
                            </div>
                          )}
                        </div>
                        <p>{description}</p>
                        <div className="price mb-5 flex items-center justify-center md:justify-start">
                          {discountedPrice ? <h2 className="text-red-500 text-3xl">$ {discountedPrice}</h2> : null}
                          <h2
                            className={`  ${
                              discountedPrice ? "line-through text-gray-500 text-2xl" : "text-red-500 text-3xl"
                            } ml-3`}
                          >
                            $ {price}
                          </h2>
                        </div>
                        <Link to={`book/${id}`} className="btn">
                          <small>Shop it now</small>
                          <BsArrowRight />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
            )
          ) : (
            <div className="grid justify-center items-center">
              <TitleTypeTwo Title={"Best Selling Book"} className="sellingBookTitle " />
              <img
                src={BookNotFound}
                alt="Book error image"
                className=" w-96 h-96 mt-10  rounded-lg transition-transform duration-300 transform group-hover::scale-110"
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
    </section>
  );
}
