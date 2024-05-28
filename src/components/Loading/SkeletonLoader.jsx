import { Skeleton } from "antd";
import PropTypes from "prop-types";
const SkeletonLoader = ({ count = 1 }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="featurebook-box relative group flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md m-4 w-72 h-72"
        >
          <Skeleton.Image className="w-72 h-72 bg-gray-200 border rounded-md mb-4" />
          <Skeleton active title={{ width: "80%" }} paragraph={{ rows: 2, width: "100%" }} />
        </div>
      ))}
    </div>
  );
};
SkeletonLoader.propTypes = {
  count: PropTypes.number,
};
export default SkeletonLoader;
