import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Book as BookIcon, X } from 'lucide-react';
import { RootState } from '../store';
import { fetchBooksSuccess } from '../store/slices/booksSlice';
import { Book } from '../types';

interface CreateBookFormProps {
  onClose: () => void;
}

function CreateBookForm({ onClose }: CreateBookFormProps) {
  const dispatch = useDispatch();
  const { list: books } = useSelector((state: RootState) => state.books);
  const { list: categories } = useSelector((state: RootState) => state.categories);
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.1.0&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80');
  const [publishYear, setPublishYear] = useState<number>(new Date().getFullYear());
  const [pages, setPages] = useState<number>(200);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!author.trim()) {
      setError('Author is required');
      return;
    }
    
    if (!categoryId) {
      setError('Please select a category');
      return;
    }
    
    // Create new book
    const newBook: Book = {
      id: (books.length + 1).toString(),
      title: title.trim(),
      author: author.trim(),
      description: description.trim() || 'No description available.',
      categoryId,
      image,
      publishYear,
      pages,
      rating: 0, // New books start with no rating
    };
    
    // Add book to list
    dispatch(fetchBooksSuccess([...books, newBook]));
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <BookIcon className="h-6 w-6 text-primary-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Add New Book</h2>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              placeholder="Book title"
              required
            />
          </div>
          
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author*
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input"
              placeholder="Author name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="input"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL
            </label>
            <input
              type="url"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700 mb-1">
              Publish Year
            </label>
            <input
              type="number"
              id="publishYear"
              value={publishYear}
              onChange={(e) => setPublishYear(parseInt(e.target.value))}
              className="input"
              min="1000"
              max={new Date().getFullYear()}
            />
          </div>
          
          <div>
            <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Pages
            </label>
            <input
              type="number"
              id="pages"
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value))}
              className="input"
              min="1"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
            rows={4}
            placeholder="Book description"
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBookForm;
 