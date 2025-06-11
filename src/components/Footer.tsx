import  { Book, Mail, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Book className="h-6 w-6 text-primary-400" />
              <span className="ml-2 text-lg font-bold">PageTurner Library</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your gateway to knowledge and imagination. Explore our vast collection of books across various genres.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-primary-400">Home</a></li>
              <li><a href="/categories" className="hover:text-primary-400">Categories</a></li>
              <li><a href="#" className="hover:text-primary-400">About Us</a></li>
              <li><a href="#" className="hover:text-primary-400">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span>123 Library Street, Book City, BC 12345</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 mr-2" />
                <span>contact@pageturner.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} PageTurner Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
 