import  { Search } from 'lucide-react';

function HeroSection() {
  return (
    <div className="relative bg-primary-700 text-white rounded-lg overflow-hidden mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-700 opacity-90"></div>
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-xl text-primary-100 max-w-xl mb-8">
            Explore our vast collection of books across various categories. From thrilling mysteries to heartwarming classics, we have something for everyone.
          </p>
          <div className="max-w-lg flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-gray-900 py-3"
                placeholder="Search by title, author, or category..."
              />
            </div>
            <button
              type="button"
              className="relative inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
 