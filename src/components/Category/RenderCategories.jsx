import PropTypes from "prop-types";
import { Tag } from "antd";
import { getRandomColor } from "../../utils/randomColor";

const RenderCategories = ({ categories }) => {
  const MAX_CATEGORIES_DISPLAY = 4;

  if (categories.length <= MAX_CATEGORIES_DISPLAY) {
    // If the number of categories is within the limit, display all categories
    return categories.map((category, catIndex) => (
      <Tag key={catIndex} color={getRandomColor()} className="my-1">
        {category}
      </Tag>
    ));
  } else {
    // If the number of categories exceeds the limit, display only the first few categories and add "..." at the end
    const displayedCategories = categories.slice(0, MAX_CATEGORIES_DISPLAY);
    return (
      <>
        {displayedCategories.map((category, catIndex) => (
          <Tag key={catIndex} color={getRandomColor()} className="my-1">
            {category}
          </Tag>
        ))}
        <Tag color="default">...</Tag>
      </>
    );
  }
};

// Prop type validation
RenderCategories.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default RenderCategories;
