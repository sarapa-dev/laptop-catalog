export interface Review {
  review_id: number;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    username: string;
  };
}
