import axiosClient from "./axios-client";

export const bookApi = {
  getBooksOnSale: (limit = 5) =>
    axiosClient
      .get(`/books/on-sale?limit=${limit}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),

  getBestBooks: (limit = 5) => {
    return axiosClient
      .get(`/books/best-books?limit=${limit}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  getBestSellingBooks: (limit = 5) => {
    return axiosClient
      .get(`/books/best-sales?limit=${limit}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
  getPopularBooks: (limit = 5, categoryName) => {
    return axiosClient
      .get(`/books/popular?limit=${limit}&categoryName=${categoryName}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
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
