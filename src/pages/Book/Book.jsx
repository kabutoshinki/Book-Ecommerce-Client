import { useParams } from "react-router-dom";
import ViewBook from "../../components/ViewBook/ViewBook";
const bookDetail = {
  id: "abcd",
  title: "Book Detail ABCD",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  summary:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  price: 14,
  discount: 10,
  image: "https://thaihabooks.com/wp-content/uploads/2021/06/Bia-Think-and-grow-rich-bia-cung-1.jpg",
  publisher: {
    id: "4785",
    name: "ABC Publisher",
  },
  authors: [
    {
      name: "author A",
      image: "https://th.bing.com/th/id/OIP.Z1l9Gss-32l1u3laA3mAAAHaGC?rs=1&pid=ImgDetMain",
    },
    {
      name: "author B",
      image: "https://th.bing.com/th/id/OIP.5LZobyKtnZWDYQmSWfFrxQAAAA?rs=1&pid=ImgDetMain",
    },
  ],
  categories: [
    {
      name: "Fiction",
    },
    {
      name: "Action",
    },
  ],
};

export default function Book() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="mt-10">
      <ViewBook book={bookDetail} />
    </div>
  );
}
