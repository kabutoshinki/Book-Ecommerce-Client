import Header from "../components/Header/Header";
import OnSalesBooks from "../components/OnSalesBooks/OnSalesBooks";
import BestSellingBooks from "../components/BestSellingBooks/BestSellingBooks";
import PopularBooks from "../components/PopularBooks/PopularBooks";

export default function Home() {
  return (
    <div>
      <Header />
      <OnSalesBooks />
      <BestSellingBooks />
      <PopularBooks />
    </div>
  );
}
