import { Button } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { bookApi } from "../../services/book-api";
import { useQuery } from "@tanstack/react-query";
import RenderCategories from "../Category/RenderCategories";
import { extractPropertyValues } from "../../utils/extractData";
import { useState } from "react";
import useAddToCart from "../../utils/handleAddToCart";

const RelatedBooks = () => {
  const { id } = useParams();
  const { handleAddToCart } = useAddToCart();
  const { data, isLoading } = useQuery({
    queryKey: [`book_related-${id}`, id],
    queryFn: () => bookApi.getBooksRelated(id, 3),
  });

  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  if (isLoading) return <>isLoading</>;
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">RELATED BOOKS</h2>
      <div className="grid grid-cols-1 gap-4">
        {data
          ? data.map((book, index) => (
              <div
                key={index}
                className="flex items-center  w-full overflow-hidden rounded-lg shadow-md bg-white transform hover:scale-105 transition-transform duration-300"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="m-2">
                  <img
                    alt="related book cover"
                    src={book.image}
                    className="w-56 h-24 object-contain rounded-lg shadow-md"
                  />
                </div>
                <div
                  className={`ml-4 w-full h-full my-auto transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-0 hidden" : "opacity-100"
                  }`}
                >
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm">
                    <RenderCategories categories={extractPropertyValues(book?.categories, "name")} />
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xl text-red-600">${book.price}</div>
                  </div>
                </div>

                <div
                  className={`ml-4 w-full h-full justify-center items-center flex transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  <Button
                    type="primary"
                    shape="circle"
                    className="mr-10"
                    onClick={() => navigate(`/book/${book.id}`)}
                    size="large"
                    icon={<EyeOutlined />}
                  />
                  <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    onClick={() => handleAddToCart(book.id, 1)}
                    icon={<ShoppingCartOutlined />}
                  />
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default RelatedBooks;
