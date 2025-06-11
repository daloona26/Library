import  { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Calendar, Star, User, FileText } from 'lucide-react';
import { RootState } from '../store';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

function BookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { list: books } = useSelector((state: RootState) => state.books);
  const { list: categories } = useSelector((state: RootState) => state.categories);
  const { list: reviews } = useSelector((state: RootState) => state.reviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const book = books.find(b => b.id === id);
  
  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h2>
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Go Back
        </button>
      </div>
    );
  }

  const category = categories.find(c => c.id === book.categoryId);
  const bookReviews = reviews.filter(review => review.bookId === book.id);
  
  return (
    <div>
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={book.image} 
              alt={book.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
          
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-700 font-medium">{book.author}</span>
          </div>
          
          <div className="flex items-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-2 text-gray-700">{book.rating.toFixed(1)} rating</span>
            <span className="ml-2 text-gray-500">({bookReviews.length} reviews)</span>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Category</div>
                <Link 
                  to={`/categories/${category?.id}`}
                  className="text-primary-600 hover:text-primary-800 font-medium"
                >
                  {category?.name}
                </Link>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Published</div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                  <span>{book.publishYear}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Pages</div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-1" />
                  <span>{book.pages}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
          
          <div className="flex space-x-4">
            <button className="btn btn-primary">Add to Reading List</button>
            <button className="btn btn-secondary">Share</button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-8 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          {!showReviewForm && (
            <button 
              onClick={() => setShowReviewForm(true)} 
              className="btn btn-primary"
            >
              Write a Review
            </button>
          )}
        </div>
        
        {showReviewForm && (
          <ReviewForm 
            bookId={book.id} 
            onReviewSubmitted={() => setShowReviewForm(false)} 
          />
        )}
        
        <ReviewList reviews={bookReviews} />
      </div>
    </div>
  );
}

export default BookPage;
 