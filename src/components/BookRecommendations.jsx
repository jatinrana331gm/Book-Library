import React, { useState, useEffect } from 'react';
import { BookOpen, Star, TrendingUp, Users, Sparkles } from 'lucide-react';

const BookRecommendations = ({ books, currentBook, onBookSelect }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (currentBook) {
      const recs = generateRecommendations(books, currentBook);
      setRecommendations(recs);
    }
  }, [books, currentBook]);

  const generateRecommendations = (allBooks, book) => {
    const recommendations = [];
    
    // Same category books
    const sameCategory = allBooks.filter(b => 
      b.id !== book.id && 
      b.category === book.category &&
      b.status !== 'finished'
    ).slice(0, 3);
    
    // Same author books
    const sameAuthor = allBooks.filter(b => 
      b.id !== book.id && 
      b.author === book.author
    ).slice(0, 2);
    
    // Highly rated books
    const highlyRated = allBooks.filter(b => 
      b.id !== book.id && 
      b.rating >= 4 &&
      b.status !== 'finished'
    ).slice(0, 3);
    
    // Same series books
    const sameSeries = allBooks.filter(b => 
      b.id !== book.id && 
      b.series === book.series &&
      book.series
    ).slice(0, 2);

    return [
      ...sameSeries.map(b => ({ ...b, reason: 'Same Series' })),
      ...sameAuthor.map(b => ({ ...b, reason: 'Same Author' })),
      ...sameCategory.map(b => ({ ...b, reason: 'Similar Genre' })),
      ...highlyRated.map(b => ({ ...b, reason: 'Highly Rated' }))
    ].slice(0, 6);
  };

  if (!currentBook || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((book) => (
          <div 
            key={book.id}
            onClick={() => onBookSelect(book)}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm truncate">{book.title}</h4>
                <p className="text-xs text-gray-600 truncate">{book.author}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {book.reason}
                  </span>
                </div>
                {book.rating && (
                  <div className="flex items-center mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{book.rating}/5</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRecommendations;