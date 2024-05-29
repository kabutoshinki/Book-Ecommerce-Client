import { Button, Checkbox, Collapse, Input, Slider } from "antd";
import { SearchOutlined, StarOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../../services/category-api";
import { authorApi } from "../../services/author-api";
import { PuffLoader } from "react-spinners";
import { useState } from "react";
export default function FilterPanel({ onFilterChange, filterData }) {
  const [localFilterData, setLocalFilterData] = useState(filterData);
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getCategories(),
  });
  const { data: authorsData, isLoading: authorsLoading } = useQuery({
    queryKey: ["authors"],
    queryFn: () => authorApi.getAuthors(),
  });

  const handleFilterChange = () => {
    onFilterChange(localFilterData);
  };

  const handleReset = () => {
    setLocalFilterData({
      searchQuery: "",
      selectedCategories: [],
      selectedAuthors: [],
      selectedRatings: [0, 5],
      priceRange: [0, 1000],
    });
  };
  return (
    <div className="p-4 sticky top-24">
      <Input
        placeholder="Search books"
        prefix={<SearchOutlined />}
        className="mb-4"
        value={localFilterData.searchQuery}
        onChange={(e) => setLocalFilterData({ ...localFilterData, searchQuery: e.target.value })}
      />
      <Collapse defaultActiveKey={["1", "2", "3", "4"]} className="bg-white">
        <Panel header="Category" key="1">
          <Checkbox.Group
            className="flex flex-col space-y-2"
            value={localFilterData.selectedCategories}
            onChange={(values) => setLocalFilterData({ ...localFilterData, selectedCategories: values })}
          >
            {categoriesLoading ? (
              <PuffLoader size={100} color="blue" />
            ) : (
              categoriesData.map((category, index) => (
                <Checkbox key={index} value={category.id}>
                  {category.name}
                </Checkbox>
              ))
            )}
          </Checkbox.Group>
        </Panel>
        <Panel header="Author" key="2">
          <Checkbox.Group
            className="flex flex-col space-y-2"
            value={localFilterData.selectedAuthors}
            onChange={(values) => setLocalFilterData({ ...localFilterData, selectedAuthors: values })}
          >
            {authorsLoading ? (
              <PuffLoader size={100} color="blue" />
            ) : (
              authorsData.map((author, index) => (
                <Checkbox key={index} value={author.id}>
                  {author.name}
                </Checkbox>
              ))
            )}
          </Checkbox.Group>
        </Panel>
        <Panel header="Rating Review" key="3">
          <div className="flex justify-between mb-2">
            <span>Rate Range:</span>
            <span>
              {`${localFilterData.selectedRatings[0]} `}
              <StarOutlined /> - {`${localFilterData.selectedRatings[1]} `}
              <StarOutlined />
            </span>
          </div>
          <Slider
            range
            defaultValue={localFilterData.selectedRatings}
            min={0}
            max={5}
            marks={{ 0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5" }}
            step={1}
            onChange={(value) => setLocalFilterData({ ...localFilterData, selectedRatings: value })}
          />
        </Panel>
        <Panel header="Price Range" key="4">
          <div className="flex justify-between mb-2">
            <span>Price Range:</span>
            <span>{`${localFilterData.priceRange[0]} - ${localFilterData.priceRange[1]}`}</span>
          </div>
          <Slider
            range
            defaultValue={localFilterData.priceRange}
            min={0}
            max={1000}
            onChange={(value) => setLocalFilterData({ ...localFilterData, priceRange: value })}
          />
        </Panel>
        <div className="mt-4 w-[90%] mx-auto my-10">
          <Button icon={<SearchOutlined />} type="primary" className="mb-2" onClick={handleFilterChange} block>
            Filter
          </Button>
          <Button onClick={handleReset} block>
            Reset
          </Button>
        </div>
      </Collapse>
    </div>
  );
}
FilterPanel.propTypes = {
  filterData: PropTypes.shape({
    searchQuery: PropTypes.string.isRequired,
    selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedAuthors: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedRatings: PropTypes.arrayOf(PropTypes.string).isRequired,
    priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
