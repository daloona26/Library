import  { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Book, LogOut, Menu, User, X } from 'lucide-react';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Book className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">PageTurner</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({isActive}) => 
              `text-sm font-medium ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600'}`
            }>
              Home
            </NavLink>
            <NavLink to="/categories" className={({isActive}) => 
              `text-sm font-medium ${isActive ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 hover:text-primary-600'}`
            }>
              Categories
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
            <div className="flex items-center px-3 py-1 bg-primary-100 rounded-full">
              <User className="h-4 w-4 text-primary-600 mr-1" />
              <span className="text-sm font-medium text-primary-800">{user?.username}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary-100 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink to="/categories" 
              className={({isActive}) => 
                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary-100 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </NavLink>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
            <div className="flex items-center px-3 py-2">
              <User className="h-4 w-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-primary-800">{user?.username}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
 