import { useState } from "react";
import { AutoComplete, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../../services/book-api";
import useDebounce from "../../utils/useDebound";

const SuggestBooks = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(searchValue, 300);
  const { data, isLoading } = useQuery({
    queryKey: ["searchBook", debouncedSearch],
    queryFn: () => bookApi.searchBooks(10, searchValue),
    enabled: isSearchFocused,
  });
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };
  const handleSelect = (value) => {
    const book = data.find((book) => book.title === value);
    if (book) {
      setSearchValue("");
      navigate(`/book/${book.id}`);
    }
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const options = isLoading
    ? [{ value: "", label: <Spin key="loading" /> }] // Show Spin component while loading
    : data
    ? data.map((book) => ({
        value: book.title,
        label: (
          <div
            key={book.id}
            className="flex items-center relative w-full overflow-hidden rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 p-2"
          >
            <img alt="related book cover" src={book.image} className="w-16 h-16 object-contain rounded-lg" />
            <div className="ml-4">
              <h6 className="text-base md:text-lg font-semibold">{book.title}</h6>
              <div className="text-sm text-red-600">${book.price}</div>
            </div>
          </div>
        ),
      }))
    : [];

  return (
    <div className="search-suggest">
      <AutoComplete
        options={options}
        onSelect={handleSelect}
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        value={searchValue}
        style={{ width: "130%" }}
      >
        <Input.Search placeholder="Search books..." size="large" />
      </AutoComplete>
    </div>
  );
};

export default SuggestBooks;
