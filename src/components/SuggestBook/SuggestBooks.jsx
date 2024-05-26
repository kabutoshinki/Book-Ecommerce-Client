import { useState } from "react";
import { AutoComplete, Input } from "antd";
import { useNavigate } from "react-router-dom";

const suggestBooks = [
  {
    id: 0,
    title: "Terrible Madness",
    categories: ["Sports", "Game"],
    rating: 4.8,
    price: 24.99,
    discount: 10,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/pile-of-books-with-pages-open-by-wind-royalty-free-image-1600785994.jpg?crop=0.79555xw:1xh;center,top&resize=2048:*",
  },
  {
    id: 1,
    title: "Such Fun Age",
    categories: ["Adventure"],
    rating: 4.7,
    price: 22.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8q_yk7kO4xC_cHxahxXdnyecdMfBgqA1G9Sqa6jF4iA&s",
  },
  {
    id: 2,
    title: "Pushing Clouds",
    categories: ["Adventure"],
    rating: 4.6,
    price: 27.99,
    discount: 15,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8q_yk7kO4xC_cHxahxXdnyecdMfBgqA1G9Sqa6jF4iA&s",
  },
  {
    id: 3,
    title: "Homie",
    categories: ["Horror", "Drama"],
    rating: 4.3,
    price: 18.99,
    discount: 10,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8q_yk7kO4xC_cHxahxXdnyecdMfBgqA1G9Sqa6jF4iA&s",
  },
];

const SuggestBooks = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSelect = (value) => {
    const bookId = suggestBooks.find((book) => book.title === value)?.id;
    if (bookId) {
      setSearchValue("");
      navigate(`/book/${bookId}`);
    }
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  const filteredBooks = suggestBooks.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase()));
  return (
    <div className="search-suggest">
      <AutoComplete
        options={filteredBooks.map((book) => ({
          value: book.title,
          label: (
            <div className="flex items-center relative w-full overflow-hidden rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 p-2">
              <img alt="related book cover" src={book.image} className="w-16 h-16 object-contain rounded-lg" />
              <div className="ml-4">
                <h6 className="text-base md:text-lg font-semibold">{book.title}</h6>
                <div className="text-sm text-red-600">${book.price}</div>
              </div>
            </div>
          ),
        }))}
        onSelect={handleSelect}
        onChange={handleSearchChange}
        value={searchValue}
        style={{ width: "130%" }} // Set width of the search input
      >
        <Input.Search placeholder="Search books..." size="large" />
      </AutoComplete>
    </div>
  );
};

export default SuggestBooks;
