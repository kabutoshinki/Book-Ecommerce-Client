import FilterPanel from "../../components/FilterPanel/FilterPanel";
import List from "../../components/List/List";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Books() {
  return (
    <div>
      <SearchBar />
      <FilterPanel />
      <List />
    </div>
  );
}
