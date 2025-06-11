import  { useState } from 'react';
import { Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../store/slices/reviewsSlice';
import { RootState } from '../store';
import { Review } from '../types';

interface ReviewFormProps {
  bookId: string;
  onReviewSubmitted: () => void;
}

function ReviewForm({ bookId, onReviewSubmitted }: ReviewFormProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to leave a review');
      return;
    }
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (comment.trim().length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }
    
    const newReview: Review = {
      id: Date.now().toString(),
      bookId,
      userId: user.id,
      username: user.username,
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
    };
    
    dispatch(addReview(newReview));
    setRating(0);
    setComment('');
    setError(null);
    onReviewSubmitted();
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-8 w-8 ${
                    (hoverRating || rating) >= star
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Share your thoughts about this book..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
 