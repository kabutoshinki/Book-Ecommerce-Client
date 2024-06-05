import { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import PropTypes from "prop-types";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import Rating from "react-rating";
const AddReviewForm = ({ onAddReview, userInfo }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const handleSubmit = () => {
    if (!userInfo) {
      message.error("You need to login before leaving a review.");
      return;
    }
    if (!content || !rating) {
      message.error("Please provide both content and a rating.");
      return;
    }

    onAddReview({ content, rating });
    setContent("");
    setRating(0);
  };

  return (
    <Card className="my-4">
      <h3 className="font-bold text-lg text-slate-800 uppercase">Your Review</h3>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Rating
          start={0}
          stop={5}
          fractions={1}
          fullSymbol={<StarFilled className="text-yellow-500 text-3xl" />}
          emptySymbol={<StarOutlined className="text-3xl" />}
          initialRating={0}
          onChange={setRating}
        />
        <Input.TextArea rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
        <div className="flex justify-end">
          <Button
            className="mt-4"
            disabled={!content}
            onClick={handleSubmit}
            size="large"
            color={content === "" ? "default" : "primary"}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
};

AddReviewForm.propTypes = {
  onAddReview: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    sub: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default AddReviewForm;
