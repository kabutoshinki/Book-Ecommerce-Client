import { Checkbox, Collapse, Input, Slider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
import PropTypes from "prop-types";
export default function FilterPanel({ onFilterChange, filterData }) {
  const categories = ["Adventure", "Racing", "Drama", "Science Fiction"];
  const authors = ["Author #1", "Author #2", "Author #3"];
  const ratings = [
    { label: "1 Star", range: [0, 1.9] },
    { label: "2 Stars", range: [2, 2.9] },
    { label: "3 Stars", range: [3, 3.9] },
    { label: "4 Stars", range: [4, 4.9] },
    { label: "5 Stars", range: [5, 5.9] },
  ];
  const handleFilterChange = (newFilterData) => {
    onFilterChange(newFilterData);
  };
  return (
    <div className="p-4 sticky top-24">
      {" "}
      {/* Adjust top-24 based on your header's height */}
      <Input
        placeholder="Search books"
        prefix={<SearchOutlined />}
        className="mb-4"
        onChange={(e) => handleFilterChange({ ...filterData, searchQuery: e.target.value })}
      />
      <Collapse defaultActiveKey={["1", "2", "3", "4"]} className="bg-white">
        <Panel header="Category" key="1">
          <Checkbox.Group
            className="flex flex-col space-y-2"
            value={filterData.selectedCategories}
            onChange={(values) => handleFilterChange({ ...filterData, selectedCategories: values })}
          >
            {categories.map((category) => (
              <Checkbox key={category} value={category}>
                {category}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Panel>
        <Panel header="Author" key="2">
          <Checkbox.Group
            className="flex flex-col space-y-2"
            value={filterData.selectedAuthors}
            onChange={(values) => handleFilterChange({ ...filterData, selectedAuthors: values })}
          >
            {authors.map((author) => (
              <Checkbox key={author} value={author}>
                {author}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Panel>
        <Panel header="Rating Review" key="3">
          <Checkbox.Group
            className="flex flex-col space-y-2"
            value={filterData.selectedRatings}
            onChange={(values) => handleFilterChange({ ...filterData, selectedRatings: values })}
          >
            {ratings.map((rating) => (
              <Checkbox key={rating.label} value={rating.label}>
                {rating.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Panel>
        <Panel header="Price Range" key="4">
          <div className="flex justify-between mb-2">
            <span>Price Range:</span>
            <span>{`${filterData.priceRange[0]} - ${filterData.priceRange[1]}`}</span>
          </div>
          <Slider
            range
            defaultValue={filterData.priceRange}
            min={0}
            max={100}
            onChange={(value) => handleFilterChange({ ...filterData, priceRange: value })}
          />
        </Panel>
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
