import  { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, Book } from 'lucide-react';
import { RootState } from '../store';
import BookCard from '../components/BookCard';

function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { list: categories } = useSelector((state: RootState) => state.categories);
  const { list: books } = useSelector((state: RootState) => state.books);
  
  const category = categories.find(c => c.id === id);
  const categoryBooks = books.filter(book => book.categoryId === id);
  
  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h2>
        <Link to="/categories" className="btn btn-primary">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link to="/categories" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Categories
        </Link>
        
        <div className="relative rounded-lg overflow-hidden mb-6 h-64">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
            <p className="text-white/80 max-w-2xl">{category.description}</p>
          </div>
        </div>
      </div>

      {categoryBooks.length > 0 ? (
        <div>
          <div className="flex items-center mb-6">
            <Book className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">
              {categoryBooks.length} {categoryBooks.length === 1 ? 'Book' : 'Books'} in this Category
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium text-gray-700 mb-4">No books found in this category</h2>
          <p className="text-gray-500 mb-6">Check back later for new additions</p>
          <Link to="/" className="btn btn-primary">
            Browse other categories
          </Link>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
 