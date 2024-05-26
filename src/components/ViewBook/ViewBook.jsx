import { Rate, Button, Tabs } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import PropTypes from "prop-types";
import RelatedBooks from "../RelatedBooks/RelatedBooks";
export default function ViewBook({ book }) {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-10 gap-4 mt-8">
      {/* Image Section */}
      <div className="col-span-1 md:col-span-3">
        <img
          alt="book cover"
          src={book.image} // Use the image from the authors array for demonstration
          className="object-contain max-h-full w-full rounded-md transform hover:scale-105 transition-transform duration-300"
        />
        <div className="col-span-1 md:col-span-10 order-3 mt-8">
          <h2 className="text-2xl font-bold">Authors</h2>
          <div className="flex flex-wrap">
            {book.authors.map((author, index) => (
              <div key={index} className="flex items-center mr-4 mt-4">
                <img src={author.image} alt={author.name + "as"} className="w-16 h-16 object-cover rounded-full" />
                <span className="ml-2 text-lg font-medium">{author.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="col-span-1 md:col-span-7">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <Rate disabled defaultValue={4} />
        <p className="my-2">
          Publisher <strong>{book.publisher.name}</strong>
        </p>

        <p className="my-4">{book.description}</p>

        <div className="text-2xl text-red-600">
          ${book.price}{" "}
          <span className="line-through text-gray-500">${(book.price * (1 + book.discount / 100)).toFixed(2)}</span>
        </div>
        <div className="my-4 flex items-center">
          <Button>-</Button>
          <input type="text" className="mx-2 w-12 text-center border" defaultValue="1" />
          <Button>+</Button>
          <Button type="primary" icon={<ShoppingCartOutlined />} className="ml-4">
            Add To Cart
          </Button>
        </div>
      </div>

      {/* Details Product Section */}
      <div className="col-span-1 md:col-span-7 order-2 md:order-1">
        <Tabs defaultActiveKey="1" className="mt-4">
          <TabPane tab="Details Product" key="1">
            <table className="table-auto w-full">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Book Title</td>
                  <td className="border px-4 py-2">{book.title}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Description</td>
                  <td className="border px-4 py-2">{book.summary}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Publisher</td>
                  <td className="border px-4 py-2">{book.publisher.name}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Price</td>
                  <td className="border px-4 py-2">${book.price}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Discount</td>
                  <td className="border px-4 py-2">{book.discount}%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Categories</td>
                  <td className="border px-4 py-2">
                    {book.categories.map((category, index) => (
                      <span key={index} className="mr-2 bg-gray-200 rounded-full px-2 py-1">
                        {category.name}
                      </span>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPane>
          <TabPane tab="Customer Reviews" key="2">
            Customer Reviews content here...
          </TabPane>
        </Tabs>
      </div>

      {/* Related Books Section */}
      <div className="col-span-1 md:col-span-3 order-1 md:order-2">
        <RelatedBooks />
      </div>
    </div>
  );
}
ViewBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    publisher: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
