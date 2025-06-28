import React from 'react';
import { BookOpen, ChevronRight, CheckCircle, Clock } from 'lucide-react';

const BookSeriesTracker = ({ books, onBookSelect }) => {
  const getSeriesData = () => {
    const seriesMap = new Map();
    
    books.forEach(book => {
      if (book.series) {
        if (!seriesMap.has(book.series)) {
          seriesMap.set(book.series, []);
        }
        seriesMap.get(book.series).push(book);
      }
    });
    
    // Sort books within each series by series number
    seriesMap.forEach((books, series) => {
      books.sort((a, b) => (a.seriesNumber || 0) - (b.seriesNumber || 0));
    });
    
    return Array.from(seriesMap.entries()).map(([seriesName, seriesBooks]) => {
      const totalBooks = seriesBooks.length;
      const finishedBooks = seriesBooks.filter(book => book.status === 'finished').length;
      const currentlyReading = seriesBooks.find(book => book.status === 'currently-reading');
      const nextToRead = seriesBooks.find(book => 
        book.status === 'want-to-read' && 
        !seriesBooks.some(b => b.seriesNumber > book.seriesNumber && b.status !== 'finished')
      );
      
      return {
        name: seriesName,
        books: seriesBooks,
        totalBooks,
        finishedBooks,
        progress: (finishedBooks / totalBooks) * 100,
        currentlyReading,
        nextToRead,
        author: seriesBooks[0]?.author
      };
    }).sort((a, b) => b.progress - a.progress);
  };

  const seriesData = getSeriesData();

  if (seriesData.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Book Series Progress</h3>
      </div>
      
      <div className="space-y-4">
        {seriesData.map((series) => (
          <div key={series.name} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{series.name}</h4>
                <p className="text-sm text-gray-600">by {series.author}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {series.finishedBooks} / {series.totalBooks}
                </p>
                <p className="text-xs text-gray-500">books completed</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${series.progress}%` }}
              ></div>
            </div>
            
            {/* Current Status */}
            <div className="flex items-center justify-between text-sm">
              {series.currentlyReading && (
                <div className="flex items-center text-orange-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Reading: {series.currentlyReading.title}</span>
                </div>
              )}
              
              {series.nextToRead && !series.currentlyReading && (
                <button
                  onClick={() => onBookSelect(series.nextToRead)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>Next: {series.nextToRead.title}</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              )}
              
              {series.progress === 100 && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Series Complete!</span>
                </div>
              )}
            </div>
            
            {/* Books in Series */}
            <div className="mt-3 flex flex-wrap gap-2">
              {series.books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => onBookSelect(book)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    book.status === 'finished'
                      ? 'bg-green-100 text-green-800'
                      : book.status === 'currently-reading'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={book.title}
                >
                  #{book.seriesNumber || '?'}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSeriesTracker;