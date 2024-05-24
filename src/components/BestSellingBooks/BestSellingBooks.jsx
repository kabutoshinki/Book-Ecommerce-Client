import "./BestSellingBooks.css";
import TitleTypeTwo from "../../UI/TitleTypeTwo/TitleTypeTwo";
import TreeShape from "../../assets/treeShape.png";
import { sellingBooksData } from "../../data/data";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
export default function BestSellingBooks() {
  return (
    <section className="BestSellingBook">
      <div className="treeShape">
        <img src={TreeShape} alt="" />
      </div>

      {sellingBooksData.map(({ img, infoTitle, infoTitleTop, desc, price, shopbtnlink }, index) => {
        return (
          <div className="container bestselling-container" key={index}>
            <div className="selling-book-left">
              <img src={img} alt="" />
            </div>
            <div className="selling-book-right">
              <TitleTypeTwo Title={"Best selling book"} className="sellingBookTitle" />
              <div className="">
                <small>{infoTitleTop}</small>
              </div>
              <h3>{infoTitle}</h3>
              <p>{desc}</p>
              <h5>
                <span>{price}</span>
              </h5>
              <Link to={shopbtnlink} className="btn">
                <small>Shop it now</small>
                <BsArrowRight />
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
}
