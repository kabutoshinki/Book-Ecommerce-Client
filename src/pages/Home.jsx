import Header from "../components/Header/Header";
import FeaturesBooks from "../components/FeaturesBooks/FeaturesBooks";
import BestSellingBooks from "../components/BestSellingBooks/BestSellingBooks";
import PopularBooks from "../components/PopularBooks/PopularBooks";

export default function Home() {
  return (
    <div>
      <Header />
      <FeaturesBooks />
      <BestSellingBooks />
      <PopularBooks />
    </div>
  );
}
