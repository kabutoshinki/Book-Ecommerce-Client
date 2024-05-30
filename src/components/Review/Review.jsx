import { useQuery } from "@tanstack/react-query"; // Import useQuery hook
import { reviewApi } from "../../services/review-api";

import PropTypes from "prop-types";
import AddReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
export default function Review({ bookId }) {
  // Fetch reviews using useQuery hook
  const {
    data: reviews,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [`reviews-${bookId}`, bookId],
    queryFn: () => reviewApi.getReviewByBookId(bookId),
  });

  const handleAddReview = async (newReview) => {
    try {
      // Create a new review
      await reviewApi.createBook(newReview.userId, bookId, newReview.content, newReview.rate);
      // Refetch reviews after adding the new one
      refetch();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  console.log(reviews);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Add Review Form */}
      <AddReviewForm onAddReview={handleAddReview} />
      {/* Review List */}
      <ReviewList reviews={reviews} />
    </div>
  );
}
Review.propTypes = {
  bookId: PropTypes.string.isRequired,
};
