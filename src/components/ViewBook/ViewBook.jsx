import { Rate, Button, Tabs } from "antd";
import {
  ShoppingCartOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import { relatedBooks } from "../../data/data";
export default function ViewBook() {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-10 gap-4 mt-8">
      {/* Image Section */}
      <div className="col-span-1 md:col-span-3">
        <img
          alt="book cover"
          src="https://thaihabooks.com/wp-content/uploads/2021/06/Bia-Think-and-grow-rich-bia-cung-1.jpg"
          className="object-contain max-h-full w-full rounded-md transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="col-span-1 md:col-span-7">
        <h1 className="text-3xl font-bold">Think and Grow Rich</h1>
        <Rate disabled defaultValue={4} />
        <p className="my-2">
          Written by <strong>Kevin Smiley</strong> | Publisher <strong>Printarea Studios</strong> | Year{" "}
          <strong>2019</strong>
        </p>
        <div className="my-2 flex space-x-2">
          <FacebookOutlined />
          <TwitterOutlined />
          <LinkedinOutlined />
          <WhatsAppOutlined />
        </div>
        <p className="my-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <div className="text-2xl text-red-600">
          $54.78 <span className="line-through text-gray-500">$70.00</span>
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
                  <td className="border px-4 py-2">Think and Grow Rich</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Author</td>
                  <td className="border px-4 py-2">Napoleon Hill</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">ISBN</td>
                  <td className="border px-4 py-2">121341381648</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Edition Language</td>
                  <td className="border px-4 py-2">English</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Book Format</td>
                  <td className="border px-4 py-2">Paperback, 450 Pages</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Date Published</td>
                  <td className="border px-4 py-2">August 10th 2019</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Publisher</td>
                  <td className="border px-4 py-2">Wepress Inc.</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Pages</td>
                  <td className="border px-4 py-2">520</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Lesson</td>
                  <td className="border px-4 py-2">7</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Topic</td>
                  <td className="border px-4 py-2">360</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Tags</td>
                  <td className="border px-4 py-2">
                    <span className="mr-2 bg-gray-200 rounded-full px-2 py-1">Drama</span>
                    <span className="mr-2 bg-gray-200 rounded-full px-2 py-1">Adventure</span>
                    <span className="mr-2 bg-gray-200 rounded-full px-2 py-1">Survival</span>
                    <span className="mr-2 bg-gray-200 rounded-full px-2 py-1">Biography</span>
                    <span className="mr-2 bg-gray-200 rounded-full px-2 py-1">Trending2022</span>
                    <span className="mr-2 bg-gray-200 rounded-full px-2 py-1">Bestseller</span>
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
        <div className="mt-8">
          <h2 className="text-2xl font-bold">RELATED BOOKS</h2>
          <div className="grid grid-cols-1 gap-4">
            {relatedBooks.map((book, index) => (
              <div
                key={index}
                className="flex items-center relative w-full overflow-hidden rounded-lg shadow-md bg-white transform hover:scale-105 transition-transform duration-300"
              >
                {/* Left Section (Image) */}
                <img
                  alt="related book cover"
                  src={book.image}
                  className="w-32 h-32 object-contain rounded-lg shadow-md"
                />
                {/* Right Section (Content) */}
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
      </div>
    </div>
  );
}
