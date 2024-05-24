import { Link } from "react-router-dom";
import { FootersLinksData } from "../../data/data";
import "./Footer.css";
import CopyRight from "../CopyRight/CopyRight";
export default function Footer() {
  return (
    <footer>
      <div className="container footer-container">
        <div className="">
          <h4>About Us</h4>
          <ul className="about-params param-links">
            {FootersLinksData.Aboutus.map(({ link, linkname }, index) => {
              return (
                <li key={index}>
                  <Link to={link}>{linkname}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="">
          <h4>Discover Us</h4>
          <ul className="discover-params param-links">
            {FootersLinksData.Discover.map(({ link, linkname }, index) => {
              return (
                <li key={index}>
                  <Link to={link}>{linkname}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="">
          <h4>My Account</h4>
          <ul className="myAccount-params param-links">
            {FootersLinksData.Myaccount.map(({ link, linkname }, index) => {
              return (
                <li key={index}>
                  <Link to={link}>{linkname}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="">
          <h4>Help</h4>
          <ul className="help-params param-links">
            {FootersLinksData.Help.map(({ link, linkname }, index) => {
              return (
                <li key={index}>
                  <Link to={link}>{linkname}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <CopyRight />
    </footer>
  );
}
