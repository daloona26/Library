import  { useState } from 'react';
import { useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { RootState } from '../store';
import CategoryCard from '../components/CategoryCard';
import CreateBookForm from '../components/CreateBookForm';

function CategoriesPage() {
  const { list: categories, loading, error } = useSelector((state: RootState) => state.categories);
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (loading) {
    return <div className="text-center py-12">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Categories</h1>
          <p className="text-gray-600 max-w-4xl">
            Explore our wide range of book categories. Each category contains a curated collection of books 
            for you to discover and enjoy.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-screen overflow-y-auto">
            <CreateBookForm onClose={() => setShowCreateForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
 