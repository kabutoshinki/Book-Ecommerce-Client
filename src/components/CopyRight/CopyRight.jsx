import "./CopyRight.css";
import { FootersLinksData } from "../../data/data";

export default function CopyRight() {
  return (
    <div className="footer-copyright">
      <div className="container copyright-container">
        <p>2024 Kabutoshinki</p>
        <div className="footer-socials">
          {FootersLinksData.socials.map((item, index) => {
            return (
              <a href={item.link} key={index}>
                <item.icon />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
