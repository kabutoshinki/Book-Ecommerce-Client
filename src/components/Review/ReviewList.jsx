import { List, Avatar, Card } from "antd";
import PropTypes from "prop-types";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import Rating from "react-rating";
const ReviewList = ({ reviews }) => {
  return (
    <Card>
      <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
        <List
          itemLayout="vertical"
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item
              key={review.id}
              extra={
                <div>
                  <Rating
                    start={0}
                    stop={5}
                    fractions={3}
                    fullSymbol={<StarFilled className="text-yellow-500 text-lg" />}
                    emptySymbol={<StarOutlined className="text-lg" />}
                    initialRating={review.rating}
                    readonly
                  />
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
      </div>
    </Card>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }),
      content: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ReviewList;
