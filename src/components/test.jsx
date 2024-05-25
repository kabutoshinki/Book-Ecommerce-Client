import { Card, Rate, Button, Tabs } from "antd";
import {
  ShoppingCartOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import { relatedBooks } from "../data/data";

const { TabPane } = Tabs;

const BookDetails = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <Card hoverable cover={<img alt="book cover" src="https://via.placeholder.com/300x400" />}>
            <Card.Meta title="THINK and GROW RICH" description="Napoleon Hill" />
          </Card>
        </div>
        <div className="col-span-2">
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
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
                    <td className="border px-4 py-2">Napoleon Rich</td>
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
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">RELATED BOOKS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedBooks.map((book, index) => (
            <Card key={index} hoverable cover={<img alt="related book cover" src={book.image} />} className="mt-4">
              <Card.Meta title={book.title} description={book.description} />
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xl text-red-600">${book.price}</div>
                <Button type="primary" icon={<ShoppingCartOutlined />}>
                  Add To Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
