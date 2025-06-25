import React from 'react';
import { Book, UserCheck, Calendar, FileText, User, Hash } from 'lucide-react';

const BookCard = ({ book, onEdit, onBorrow, onReturn }) => {
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

  const currentBorrowing = book.borrowingHistory.find(record => !record.returnDate);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        {book.coverUrl ? (
          <img 
            src={book.coverUrl} 
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="w-full h-full flex items-center justify-center" style={{ display: book.coverUrl ? 'none' : 'flex' }}>
          <Book className="w-16 h-16 text-blue-400" />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[book.category] || 'bg-gray-100 text-gray-800'}`}>
            {book.category}
          </span>
          <div className={`w-3 h-3 rounded-full ${book.status === 'available' ? 'bg-green-400' : 'bg-orange-400'}`}></div>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span className="truncate">{book.author}</span>
          </div>
          
          {book.publishedYear && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{book.publishedYear}</span>
            </div>
          )}
          
          {book.pages && (
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              <span>{book.pages} pages</span>
            </div>
          )}
          
          {book.isbn && (
            <div className="flex items-center">
              <Hash className="w-4 h-4 mr-1" />
              <span className="truncate">{book.isbn}</span>
            </div>
          )}
        </div>

        {currentBorrowing && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
            <div className="flex items-center text-orange-800 text-sm">
              <UserCheck className="w-4 h-4 mr-1" />
              <span className="font-medium">Borrowed by:</span>
            </div>
            <p className="text-orange-700 text-sm font-medium">{currentBorrowing.borrowerName}</p>
            <p className="text-orange-600 text-xs">Since {new Date(currentBorrowing.borrowDate).toLocaleDateString()}</p>
          </div>
        )}
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Edit
          </button>
          
          {book.status === 'available' ? (
            <button
              onClick={() => onBorrow(book)}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Borrow
            </button>
          ) : (
            <button
              onClick={() => onReturn(book)}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;