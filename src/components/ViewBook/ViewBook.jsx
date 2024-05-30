import { Rate, Button, Tabs, Image, InputNumber } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import PropTypes from "prop-types";
import RelatedBooks from "../RelatedBooks/RelatedBooks";
import RenderCategories from "../Category/RenderCategories";
import { extractPropertyValues } from "../../utils/extractData";
import { useState } from "react";
import { handleAddToCart } from "../../utils/handleAddToCart";
import Review from "../Review/Review";
export default function ViewBook({ book }) {
  const discountedPrice = book?.discount?.amount
    ? (book.price - book.price * (book.discount.amount / 100)).toFixed(2)
    : null;
  const [bookQuantity, setBookQuantity] = useState(1);
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-10 gap-4 mt-8">
      <div className="col-span-1 w-full md:col-span-3  mx-2">
        <div className="w-full">
          <Image
            src={book.image}
            className="max-h-full w-full rounded-md transform hover:scale-110 transition-transform duration-300"
            style={{ width: 1000 }}
            preview={{
              imageRender: () => (
                <img
                  src={book.image}
                  alt="book"
                  style={{ width: 1000, objectFit: "cover" }}
                  className="object-contain max-h-full w-full rounded-md transform hover:scale-110 transition-transform duration-300"
                />
              ),
              toolbarRender: () => null,
            }}
          />
        </div>

        {/* <img
          alt="book cover"
          src={book.image} // Use the image from the authors array for demonstration
          className="object-contain max-h-full w-full rounded-md transform hover:scale-110 transition-transform duration-300"
        /> */}
        <div className="col-span-1 md:col-span-10 order-3 mt-8">
          <h2 className="text-2xl font-bold">Authors</h2>
          <div className="flex flex-wrap">
            {book.authors.map((author, index) => (
              <div
                key={index}
                className="flex items-center mr-4 mt-4 hover:scale-125 transition-transform duration-300"
              >
                <img src={author.image} alt={author.name + "as"} className="w-16 h-16 object-cover rounded-full" />
                <span className="ml-2 text-lg font-medium">{author.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="col-span-1 md:col-span-7 mx-5">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <div className="flex items-center justify-center md:justify-start">
          <Rate value={book.average_rate} allowHalf disabled />
          <h6 className="mx-2">{book.sold_quantity} Sold </h6>
          {book.discount && (
            <div className="discount-ribbon bg-red-500 text-white px-2 py-1 text-xs font-bold hover:scale-105 transition-transform duration-300">
              {book.discount.amount} % OFF
            </div>
          )}
        </div>
        <p className="my-2">
          Publisher: <strong>{book.publisher.name}</strong>
        </p>

        <p className="my-4">{book.description}</p>

        <div className="mt-2">
          {discountedPrice ? <span className="text-2xl text-red-500 font-semibold">$ {discountedPrice}</span> : null}
          <span
            className={`  ${discountedPrice ? "line-through text-gray-500 text-xl ml-3" : "text-red-500 text-2xl"}`}
          >
            $ {book.price}
          </span>
        </div>
        <div className="my-4 flex items-center">
          <Button disabled={bookQuantity <= 1} onClick={() => setBookQuantity((prev) => prev - 1)}>
            -
          </Button>
          <InputNumber
            min={1}
            value={bookQuantity}
            disabled
            className="mx-2"
            style={{ background: "white", color: "black" }}
          />
          <Button disabled={bookQuantity >= 10} onClick={() => setBookQuantity((prev) => prev + 1)}>
            +
          </Button>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={() => handleAddToCart(book.id, bookQuantity)}
          className=""
        >
          Add To Cart
        </Button>
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
                {discountedPrice ? (
                  <tr>
                    <td className="border px-4 py-2 font-semibold">Discount</td>
                    <td className="border px-4 py-2">
                      {" "}
                      <div className="discount-ribbon w-32 h-7 rounded-md text-center flex justify-center items-center bg-red-500 text-white px-2 py-1 text-xs font-bold hover:scale-105 transition-transform duration-300">
                        {book.discount.amount} % OFF
                      </div>
                    </td>
                  </tr>
                ) : null}
                <tr>
                  <td className="border px-4 py-2 font-semibold">Categories</td>
                  <td className="border px-4 py-2">
                    <RenderCategories categories={extractPropertyValues(book.categories, "name")} />
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPane>
          <TabPane tab="Customer Reviews" key="2">
            <Review bookId={book.id} />
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
    average_rate: PropTypes.number.isRequired,
    sold_quantity: PropTypes.number.isRequired,
    discount: PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired,
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
