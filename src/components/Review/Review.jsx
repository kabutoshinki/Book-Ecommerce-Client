import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import useQuery hook
import { reviewApi } from "../../services/review-api";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AddReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { getUserInfo } from "../../utils/getUserInfo";
import { Card } from "antd";
export default function Review({ bookId }) {
  const queryClient = useQueryClient();
  const userInfo = getUserInfo();
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
      await reviewApi.createReview(userInfo.sub, bookId, newReview.content, newReview.rating);
      // Refetch reviews after adding the new one
      refetch();
      queryClient.invalidateQueries({ queryKey: [`book-${bookId}`] });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card>
      {/* Add Review Form */}
      {userInfo ? (
        <AddReviewForm onAddReview={handleAddReview} userInfo={userInfo} />
      ) : (
        <Card className="my-2">
          You need to login first before review{" "}
          <Link to={"/login"} className="underline text-blue-400">
            Login Here
          </Link>
        </Card>
      )}
      {/* Review List */}
      <ReviewList reviews={reviews} />
    </Card>
  );
}
Review.propTypes = {
  bookId: PropTypes.string.isRequired,
};
