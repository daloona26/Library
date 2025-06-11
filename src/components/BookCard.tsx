import  { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  return (
    <div className="card h-full flex flex-col">
      <div className="h-56 overflow-hidden">
        <img 
          src={book.image} 
          alt={book.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
          <span className="ml-1 text-sm text-gray-600">{book.rating.toFixed(1)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {book.description}
        </p>
        <Link 
          to={`/books/${book.id}`}
          className="btn btn-primary self-start flex items-center"
        >
          View Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
 