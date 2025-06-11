import  { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, BookOpen, Star } from 'lucide-react';
import { RootState } from '../store';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import BookCard from '../components/BookCard';

function HomePage() {
  const { list: categories } = useSelector((state: RootState) => state.categories);
  const { list: books } = useSelector((state: RootState) => state.books);
  
  // Get featured categories (first 3)
  const featuredCategories = categories.slice(0, 3);
  
  // Get popular books (highest rated, up to 4)
  const popularBooks = [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
    
  // Get newest books (using higher IDs as proxies for newer books, up to 4)
  const newestBooks = [...books]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 4);

  return (
    <div>
      <HeroSection />

      {/* Featured Categories */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Categories</h2>
          <Link to="/categories" className="text-primary-600 hover:text-primary-800 flex items-center font-medium">
            View all categories
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Popular Books */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Books</h2>
          <div className="flex items-center text-primary-600 font-medium">
            <Star className="mr-1 h-5 w-5 fill-primary-500" />
            Top rated selections
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
      
      {/* Newest Books */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
          <div className="flex items-center text-primary-600 font-medium">
            <BookOpen className="mr-1 h-5 w-5" />
            Fresh off the press
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newestBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Library Stats */}
      <section className="bg-gray-100 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Library Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-primary-600 mb-2">{categories.length}</div>
            <div className="text-lg text-gray-700">Categories</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-primary-600 mb-2">{books.length}</div>
            <div className="text-lg text-gray-700">Books</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {(books.reduce((avg, book) => avg + book.rating, 0) / books.length).toFixed(1)}
            </div>
            <div className="text-lg text-gray-700">Average Rating</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
 