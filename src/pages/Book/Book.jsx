import { useParams } from "react-router-dom";
import ViewBook from "../../components/ViewBook/ViewBook";
export default function Book() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <ViewBook />
    </>
  );
}
