import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { axiosInstance } from "../../lib/axios";
import { UserType } from "../../types/user";
import toast from "react-hot-toast";
import { Review } from "../../types/review";
import { format } from "date-fns";

interface CreateReview {
  rating: number;
  comment: string;
}

const LaptopReviews = ({ laptopId }: { laptopId?: number }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: user } = useQuery<UserType>({ queryKey: ["authUser"] });

  const { data: reviews, refetch } = useQuery<Review[]>({
    queryKey: ["reviews", laptopId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/review/${laptopId}`);
      return res.data;
    },
  });

  const { mutate: createReview, isPending } = useMutation({
    mutationFn: async (reviewData: CreateReview) => {
      await axiosInstance.post(`/review/${laptopId}`, reviewData);
    },
    onSuccess: () => {
      refetch();
      setSelectedRating(0);
      setComment("");
      toast.success("Review submitted successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit review. Please try again.";

      toast.error(errorMessage);
    },
  });

  const handleSubmit = () => {
    if (!selectedRating || !comment) return;
    createReview({ rating: selectedRating, comment });
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      {user && (
        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="font-semibold">Write a Review</h3>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant="ghost"
                size="sm"
                className="p-0 hover:bg-transparent"
                onClick={() => setSelectedRating(rating)}
              >
                <StarIcon
                  className={`size-5 ${
                    rating <= selectedRating ? "fill-primary text-primary" : "text-muted-foreground"
                  }`}
                />
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Share your thoughts about this laptop..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={isPending || !selectedRating || !comment}>
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      )}

      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review.review_id} className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={`https://avatar.vercel.sh/${review.user.username}`} />
                <AvatarFallback>{review.user.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{review.user.username}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`size-4 ${
                          rating <= review.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review.created_at)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaptopReviews;
