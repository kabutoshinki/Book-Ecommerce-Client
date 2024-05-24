import "./FeaturesBooks.css";
import TitleTypeOne from "../../UI/TitleTypeOne/TitleTypeOne";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { featuredBooksData } from "../../data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsArrowReturnRight } from "react-icons/bs";

const breakpoints = {
  1024: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
  768: {
    slidesPerView: 3,
    spaceBetweenSlides: 20,
  },
  480: {
    slidesPerView: 2,
    spaceBetweenSlides: 10,
  },
  0: {
    slidesPerView: 1,
    spaceBetweenSlides: 0,
  },
};

export default function OnSalesBooks() {
  return (
    <section className="Featured">
      <div className="container features-book-container">
        <TitleTypeOne TitleTop={"Some quality items"} Title={"OnSale Books"} />
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          loop={true}
          modules={[Pagination]}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          breakpoints={breakpoints}
        >
          {featuredBooksData.map(({ img, imgLink, name, nameLink, writer, price }, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="featurebook-box">
                  <Link to={imgLink}>
                    <img src={img} alt="" className="featurebook" />
                  </Link>
                  <div className="featurebook-info">
                    <Link to={nameLink}>{name}</Link>
                    <div className="">
                      <small>{writer}</small>
                    </div>
                    <h5>
                      <span>{price}</span>
                    </h5>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          <div className="feature-border container"></div>
          <div className="swiper-pagination"></div>
          <Link to="*" className="btn feature-btn">
            View all products <BsArrowReturnRight />
          </Link>
        </Swiper>
      </div>
    </section>
  );
}
