import "./Books.css";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import List from "../../components/List/List";
import { Layout } from "antd";
import { useState } from "react";
const { Sider } = Layout;

export default function Books() {
  const [filterData, setFilterData] = useState({
    searchQuery: "",
    selectedCategories: [],
    selectedAuthors: [],
    selectedRatings: [0, 5],
    priceRange: [0, 1000], // Default price range
  });
  const handleFilterChange = (newFilterData) => {
    setFilterData(newFilterData);
  };

  return (
    <Layout className="min-h-screen bg-white container">
      <Sider width={250} style={{ background: "white" }} className="bg-white border-r border-gray-200">
        <FilterPanel onFilterChange={handleFilterChange} filterData={filterData} />
      </Sider>
      <List filterData={filterData} />
    </Layout>
  );
}
