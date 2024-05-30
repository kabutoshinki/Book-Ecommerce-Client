import { useParams } from "react-router-dom";
import ViewBook from "../../components/ViewBook/ViewBook";
import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../../services/book-api";

export default function Book() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [`book-${id}`, id],
    queryFn: () => bookApi.getBookDetail(id),
  });
  if (isLoading) return <>...Is loading</>;
  return (
    <div className="mt-10">
      <ViewBook book={data} />
    </div>
  );
}
