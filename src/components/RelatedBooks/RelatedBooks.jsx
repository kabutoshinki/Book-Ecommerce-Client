import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { relatedBooks } from "../../data/data"; // Import your related books data

const RelatedBooks = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">RELATED BOOKS</h2>
      <div className="grid grid-cols-1 gap-4">
        {relatedBooks.map((book, index) => (
          <div
            key={index}
            className="flex items-center relative w-full overflow-hidden rounded-lg shadow-md bg-white transform hover:scale-105 transition-transform duration-300"
          >
            <img alt="related book cover" src={book.image} className="w-32 h-32 object-contain rounded-lg shadow-md" />

            <div className="ml-4">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm">{book.description}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xl text-red-600">${book.price}</div>
                <Button type="primary" icon={<ShoppingCartOutlined />}>
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
