import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

const BookRatingModal = ({ book, onSave, onCancel }) => {
  const [rating, setRating] = useState(book?.rating || 0);
  const [review, setReview] = useState(book?.review || '');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedBook = {
      ...book,
      rating,
      review: review.trim() || undefined,
      status: 'finished'
    };

    onSave(updatedBook);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const isActive = starValue <= (hoveredRating || rating);
      
      return (
        <button
          key={i}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className="p-1 transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              isActive ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Rate Book</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Book Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-1">{book?.title}</h3>
            <p className="text-gray-600 text-sm">by {book?.author}</p>
          </div>

          {/* Rating */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How would you rate this book?
            </label>
            <div className="flex justify-center items-center space-x-1 mb-2">
              {renderStars()}
            </div>
            <p className="text-sm text-gray-600">
              {rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}
            </p>
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Write a Review (Optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              placeholder="Share your thoughts about this book..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Rating
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookRatingModal;