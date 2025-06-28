import React from 'react';
import { Search, Book, User, Hash } from 'lucide-react';

const SearchSuggestions = ({ suggestions, onSelect, searchTerm }) => {
  if (!suggestions.length || !searchTerm) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'title': return <Book className="w-4 h-4" />;
      case 'author': return <User className="w-4 h-4" />;
      case 'isbn': return <Hash className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-medium">{part}</span>
      ) : part
    );
  };

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
        >
          <div className="text-gray-400">
            {getIcon(suggestion.type)}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {highlightMatch(suggestion.text, searchTerm)}
            </div>
            <div className="text-xs text-gray-500 capitalize">
              {suggestion.type} • {suggestion.category}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SearchSuggestions;