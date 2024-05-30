import "./TitleTypeTwo.css";
import victor from "../../assets/victor.png";
export default function TitleTypeTwo({ ClassName, Title }) {
  return (
    <div className={`titleTypeTwo ${ClassName}`}>
      <h2>{Title}</h2>
      <img src={victor} alt="victor" className="victor" />
    </div>
  );
}
