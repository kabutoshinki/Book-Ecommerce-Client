import { useQuery } from "@tanstack/react-query";
import { aboutApi } from "../../services/about-api";
import parse from "html-react-parser";
export default function About() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["about page"],
    queryFn: () => aboutApi.getAbout(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return <div className="container mx-auto py-16 px-4">{parse(data)}</div>;
}
