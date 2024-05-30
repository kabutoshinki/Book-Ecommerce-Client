import { List, Avatar, Rate } from "antd";
import PropTypes from "prop-types";

const ReviewList = ({ reviews }) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={reviews}
      renderItem={(review) => (
        <List.Item
          key={review.id} // Make sure each review has a unique identifier
          extra={
            <div>
              <Rate disabled value={review.rating} />
            </div>
          }
        >
          <List.Item.Meta
            avatar={<Avatar>{review.user?.avatar}</Avatar>}
            title={<strong>{review.user.firstName + " " + review.user.lastName}</strong>}
            description={review.content}
          />
        </List.Item>
      )}
    />
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ReviewList;
