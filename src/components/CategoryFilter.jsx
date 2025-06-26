import React from 'react';
import { BOOK_CATEGORIES } from '../types/Book';

const categoryColors = {
  'Fiction': 'bg-purple-400',
  'Non-Fiction': 'bg-blue-400',
  'Science': 'bg-green-400',
  'Technology': 'bg-gray-400',
  'Biography': 'bg-yellow-400',
  'History': 'bg-orange-400',
  'Philosophy': 'bg-indigo-400',
  'Art': 'bg-pink-400',
  'Religion': 'bg-amber-400',
  'Self-Help': 'bg-teal-400',
  'Romance': 'bg-red-400',
  'Mystery': 'bg-purple-600',
  'Fantasy': 'bg-violet-400',
  'Science Fiction': 'bg-cyan-400',
  'Horror': 'bg-zinc-400',
  'Thriller': 'bg-red-600',
  'Children': 'bg-yellow-300',
  'Young Adult': 'bg-pink-300',
  'Poetry': 'bg-indigo-300',
  'Drama': 'bg-orange-300',
  'Other': 'bg-gray-300'
};

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm text-gray-600 uppercase tracking-wide px-2">
        Categories
      </h3>

      {/* ✅ Scrollable category list */}
      <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1 custom-scroll">
        <button
          onClick={() => onCategoryChange('')}
          className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
            selectedCategory === ''
              ? 'bg-blue-100 text-blue-700 font-semibold'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
          All Books
        </button>

        {BOOK_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full mr-3 ${
                categoryColors[category] || 'bg-gray-400'
              }`}
            ></span>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
