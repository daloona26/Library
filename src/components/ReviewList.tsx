import  { useState } from 'react';
import { Star, User, Calendar, ThumbsUp } from 'lucide-react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
}

function ReviewList({ reviews }: ReviewListProps) {
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.rating - a.rating;
    }
  });

  if (reviews.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-700 mb-4">No reviews yet. Be the first to review this book!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <button
            onClick={() => setSortBy('date')}
            className={`text-sm px-3 py-1 rounded ${
              sortBy === 'date'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy('rating')}
            className={`text-sm px-3 py-1 rounded ${
              sortBy === 'rating'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Highest Rated
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className="bg-primary-100 rounded-full p-2 mr-3">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <div className="font-medium">{review.username}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-3">{review.comment}</p>
            <div className="flex justify-end">
              <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Helpful
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
 