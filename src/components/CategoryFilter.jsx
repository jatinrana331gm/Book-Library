import React from 'react';
import { BOOK_CATEGORIES } from '../types/Book';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categoryColors = {
    'Fiction': 'bg-purple-100 text-purple-800',
    'Non-Fiction': 'bg-blue-100 text-blue-800',
    'Science': 'bg-green-100 text-green-800',
    'Technology': 'bg-gray-100 text-gray-800',
    'Biography': 'bg-yellow-100 text-yellow-800',
    'History': 'bg-brown-100 text-brown-800',
    'Philosophy': 'bg-indigo-100 text-indigo-800',
    'Art': 'bg-pink-100 text-pink-800',
    'Religion': 'bg-orange-100 text-orange-800',
    'Self-Help': 'bg-teal-100 text-teal-800',
    'Romance': 'bg-red-100 text-red-800',
    'Mystery': 'bg-purple-100 text-purple-800',
    'Fantasy': 'bg-violet-100 text-violet-800',
    'Science Fiction': 'bg-cyan-100 text-cyan-800',
    'Horror': 'bg-gray-100 text-gray-800',
    'Thriller': 'bg-red-100 text-red-800',
    'Children': 'bg-yellow-100 text-yellow-800',
    'Young Adult': 'bg-pink-100 text-pink-800',
    'Poetry': 'bg-indigo-100 text-indigo-800',
    'Drama': 'bg-orange-100 text-orange-800',
    'Other': 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900">Categories</h3>
      <div className="space-y-1">
        <button
          onClick={() => onCategoryChange('')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
            selectedCategory === '' 
              ? 'bg-blue-100 text-blue-800 font-medium' 
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          All Books
        </button>
        {BOOK_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
              selectedCategory === category 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${categoryColors[category]?.replace('text-', 'bg-').split(' ')[0] || 'bg-gray-300'}`}></span>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;