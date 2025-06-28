import React from 'react';
import {
  Book,
  UserCheck,
  Calendar,
  FileText,
  User,
  Hash,
  Star,
  BookOpen,
  Target,
  MoreVertical
} from 'lucide-react';

const BookCard = ({ book, onEdit, onBorrow, onReturn, onUpdateProgress, onRate }) => {
  const categoryColors = {
    'Fiction': 'bg-purple-100 text-purple-800',
    'Non-Fiction': 'bg-blue-100 text-blue-800',
    'Science': 'bg-green-100 text-green-800',
    'Technology': 'bg-gray-100 text-gray-800',
    'Biography': 'bg-yellow-100 text-yellow-800',
    'History': 'bg-yellow-200 text-yellow-900',
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

  const statusColors = {
    'want-to-read': 'bg-blue-100 text-blue-800',
    'currently-reading': 'bg-orange-100 text-orange-800',
    'finished': 'bg-green-100 text-green-800',
    'available': 'bg-gray-100 text-gray-800',
    'borrowed': 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    'want-to-read': 'Want to Read',
    'currently-reading': 'Reading',
    'finished': 'Finished',
    'available': 'Available',
    'borrowed': 'Borrowed'
  };

  const currentBorrowing = book.borrowingHistory?.find(
    (record) => !record.returnDate
  );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getProgressPercentage = () => {
    if (!book.readingProgress || !book.readingProgress.currentPage || !book.pages) {
      return 0;
    }
    return Math.round((book.readingProgress.currentPage / book.pages) * 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
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
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ display: book.coverUrl ? 'none' : 'flex' }}
        >
          <Book className="w-16 h-16 text-blue-400" />
        </div>

        {/* Reading Progress Overlay */}
        {book.status === 'currently-reading' && book.readingProgress && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
            <div className="flex items-center justify-between text-xs">
              <span>{getProgressPercentage()}% complete</span>
              <span>{book.readingProgress.currentPage || 0} / {book.pages || 0}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
              <div 
                className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Category and Status */}
        <div className="flex items-start justify-between mb-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[book.category] || 'bg-gray-100 text-gray-800'}`}
          >
            {book.category || 'Unknown'}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[book.status] || 'bg-gray-100 text-gray-800'}`}
          >
            {statusLabels[book.status] || book.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>

        {/* Rating */}
        {book.rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {renderStars(book.rating)}
            </div>
            <span className="text-xs text-gray-600">({book.rating}/5)</span>
          </div>
        )}

        {/* Info */}
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

        {/* Reading Progress Info */}
        {book.status === 'currently-reading' && book.readingProgress && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
            <div className="flex items-center justify-between text-blue-800 text-sm">
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>Reading Progress</span>
              </div>
              <button
                onClick={() => onUpdateProgress(book)}
                className="text-blue-600 hover:text-blue-800 text-xs"
              >
                Update
              </button>
            </div>
            <p className="text-blue-700 text-xs mt-1">
              Page {book.readingProgress.currentPage || 0} of {book.pages || 0}
            </p>
          </div>
        )}

        {/* Borrowing Info */}
        {currentBorrowing && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
            <div className="flex items-center text-orange-800 text-sm">
              <UserCheck className="w-4 h-4 mr-1" />
              <span className="font-medium">Borrowed by:</span>
            </div>
            <p className="text-orange-700 text-sm font-medium">{currentBorrowing.borrowerName}</p>
            <p className="text-orange-600 text-xs">
              Since {new Date(currentBorrowing.borrowDate).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Buttons */}
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
          ) : book.status === 'borrowed' ? (
            <button
              onClick={() => onReturn(book)}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              Return
            </button>
          ) : book.status === 'currently-reading' ? (
            <button
              onClick={() => onUpdateProgress(book)}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Progress
            </button>
          ) : (
            <button
              onClick={() => onRate(book)}
              className="flex-1 px-3 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Rate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;