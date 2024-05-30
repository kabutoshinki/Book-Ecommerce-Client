import { useState } from "react";
import { Form, Input, Button, Rate } from "antd";
import PropTypes from "prop-types";

const AddReviewForm = ({ onAddReview }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0); // State for star rating

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !content || !rating) return;
    onAddReview({ author, content, rating }); // Pass rating to onAddReview
    setAuthor("");
    setContent("");
    setRating(0);
  };

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Form.Item label="Rating">
        <Rate value={rating} onChange={(value) => setRating(value)} />
      </Form.Item>
      <Form.Item label="Review">
        <Input.TextArea rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Review
        </Button>
      </Form.Item>
    </Form>
  );
};

AddReviewForm.propTypes = {
  onAddReview: PropTypes.func.isRequired,
};

export default AddReviewForm;
