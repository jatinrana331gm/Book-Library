import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import SearchSuggestions from './SearchSuggestions';

const SearchBar = ({ 
  value, 
  onChange, 
  onFiltersClick,
  books = [],
  placeholder = "Search books by title, author, or ISBN..." 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (value.length > 1) {
      const searchTerm = value.toLowerCase();
      const bookSuggestions = [];

      books.forEach(book => {
        // Title suggestions
        if (book.title.toLowerCase().includes(searchTerm)) {
          bookSuggestions.push({
            text: book.title,
            type: 'title',
            category: book.category,
            book
          });
        }

        // Author suggestions
        if (book.author.toLowerCase().includes(searchTerm)) {
          bookSuggestions.push({
            text: book.author,
            type: 'author',
            category: book.category,
            book
          });
        }

        // ISBN suggestions
        if (book.isbn && book.isbn.toLowerCase().includes(searchTerm)) {
          bookSuggestions.push({
            text: book.isbn,
            type: 'isbn',
            category: book.category,
            book
          });
        }
      });

      // Remove duplicates and limit to 5 suggestions
      const uniqueSuggestions = bookSuggestions
        .filter((suggestion, index, self) => 
          index === self.findIndex(s => s.text === suggestion.text && s.type === suggestion.type)
        )
        .slice(0, 5);

      setSuggestions(uniqueSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value, books]);

  const handleSuggestionSelect = (suggestion) => {
    onChange(suggestion.text);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => value.length > 1 && setShowSuggestions(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
          />
          
          {showSuggestions && (
            <SearchSuggestions
              suggestions={suggestions}
              onSelect={handleSuggestionSelect}
              searchTerm={value}
            />
          )}
        </div>

        <button
          onClick={onFiltersClick}
          className="px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center"
          title="Advanced Filters"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;