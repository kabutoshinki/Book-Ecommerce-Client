import "./PopularBooks.css";
import TitleTypeOne from "../../UI/TitleTypeOne/TitleTypeOne";
import { galleryData } from "../../data/data";
export default function PopularBooks() {
  //   const filterItems = activeButton === "all" ? galleryData : galleryData.fileter((item) => item.category);
  return (
    <section>
      <div className="container popularbooks-container">
        <TitleTypeOne TitleTop={"Some quality items"} Title={"Popular Books"} className="popularbooks-title" />
        <div className="filter-buttons">
          <button>All</button>
          <button>Business</button>
          <button>Technology</button>
          <button>Adventure</button>
          <button>Romantic</button>
          <button>Fictional</button>
        </div>
        <div className="gallery">
          {/* {
                filterItems.map(({name,writer,price,images},index)=>{
                    return(
                        <div className="gallery-items"></div>
                    )
                })
            } */}
        </div>
      </div>
    </section>
  );
}
