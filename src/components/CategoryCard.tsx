import  { Link } from 'react-router-dom';
import { ArrowRight, Book } from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="card h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
        <Link 
          to={`/categories/${category.id}`}
          className="btn btn-primary self-start flex items-center"
        >
          <Book className="h-4 w-4 mr-1" />
          View Books
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}

export default CategoryCard;
 