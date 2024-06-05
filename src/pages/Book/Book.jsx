import { useParams } from "react-router-dom";
import ViewBook from "../../components/ViewBook/ViewBook";
import { useQuery } from "@tanstack/react-query";
import { bookApi } from "../../services/book-api";
import { PuffLoader } from "react-spinners";

export default function Book() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: [`book-${id}`, id],
    queryFn: () => bookApi.getBookDetail(id),
  });
  window.scrollTo(0, 0);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="mt-10">
      <ViewBook book={data} />
    </div>
  );
}
