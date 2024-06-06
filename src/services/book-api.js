import axiosClient from "./axios-client";

export const bookApi = {
  getBooksOptions: ({ type, limit = 5, categoryName, sortBy }) => {
    const params = { type, limit };
    if (categoryName) params.categoryName = categoryName;
    if (sortBy) params.sortBy = sortBy.join(",");

    return axiosClient
      .get("/books/options", { params })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  getBooksOnSale: (limit = 5) => {
    return bookApi.getBooksOptions({ type: "onSale", limit, sortBy: ["book.sold_quantity"] });
  },

  getBestBooks: (limit = 5) => {
    return bookApi.getBooksOptions({ type: "best", limit });
  },
  getBestSellingBooks: (limit = 5) => {
    return bookApi.getBooksOptions({ type: "bestSelling", limit, sortBy: ["book.average_rate"] });
  },
  getPopularBooks: (limit = 8, categoryName) => {
    return bookApi.getBooksOptions({
      type: "popular",
      limit,
      categoryName: categoryName,
      sortBy: ["book.average_rate"],
    });
  },
  searchBooks: (limit = 5, name) => {
    return axiosClient
      .get(`/books/search?limit=${limit}&name=${name}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  getBookDetail: (id) => {
    return axiosClient
      .get(`/books/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  getBooksRelated: (id, limit) => {
    return axiosClient
      .get(`/books/${id}/related?limit=${limit}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  getBooks: (
    page = 1,
    limit = 5,
    sort,
    searchQuery = "",
    selectedCategories = [],
    selectedAuthors = [],
    selectedRatings = [],
    priceRange = [0, 1000]
  ) => {
    // Prepare the parameters object
    const params = {
      page,
      limit,
      sort,
    };

    // Add optional parameters if they are provided
    if (searchQuery) params.search = searchQuery;
    if (selectedCategories.length > 0) params.categories = selectedCategories.join(",");
    if (selectedAuthors.length > 0) params.authors = selectedAuthors.join(",");
    if (selectedRatings.length > 0) {
      params.minRate = selectedRatings[0];
      params.maxRate = selectedRatings[1];
    }
    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      params.minPrice = priceRange[0];
      params.maxPrice = priceRange[1];
    }

    // Make the API call
    return axiosClient
      .get("/books", { params })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
