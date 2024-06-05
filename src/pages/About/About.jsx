import { useQuery } from "@tanstack/react-query";
import { aboutApi } from "../../services/about-api";
import parse from "html-react-parser";
import { BounceLoader } from "react-spinners";
export default function About() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["about page"],
    queryFn: () => aboutApi.getAbout(),
  });
  window.scrollTo(0, 0);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return <div className="container mx-auto py-16 px-4">{parse(data)}</div>;
}
