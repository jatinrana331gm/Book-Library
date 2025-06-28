import React, { useState, useEffect } from 'react';
import { X, BookOpen, Target, Calendar, TrendingUp } from 'lucide-react';

const ReadingProgressModal = ({ book, onSave, onCancel }) => {
  const [progress, setProgress] = useState({
    currentPage: book?.readingProgress?.currentPage || 0,
    totalPages: book?.pages || 0,
    startDate: book?.readingProgress?.startDate || '',
    targetDate: book?.readingProgress?.targetDate || '',
    notes: book?.readingProgress?.notes || '',
    dailyGoal: book?.readingProgress?.dailyGoal || 10
  });

  const progressPercentage = progress.totalPages > 0 
    ? Math.round((progress.currentPage / progress.totalPages) * 100) 
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedBook = {
      ...book,
      readingProgress: {
        ...progress,
        percentage: progressPercentage,
        lastUpdated: new Date().toISOString()
      }
    };

    onSave(updatedBook);
  };

  const calculateEstimatedFinish = () => {
    if (!progress.startDate || !progress.dailyGoal || progress.currentPage >= progress.totalPages) {
      return null;
    }

    const remainingPages = progress.totalPages - progress.currentPage;
    const daysNeeded = Math.ceil(remainingPages / progress.dailyGoal);
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + daysNeeded);
    
    return estimatedDate.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Reading Progress</h2>
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

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Current Page */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Page
              </label>
              <input
                type="number"
                value={progress.currentPage}
                onChange={(e) => setProgress(prev => ({ 
                  ...prev, 
                  currentPage: Math.max(0, parseInt(e.target.value) || 0)
                }))}
                min="0"
                max={progress.totalPages}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Pages
              </label>
              <input
                type="number"
                value={progress.totalPages}
                onChange={(e) => setProgress(prev => ({ 
                  ...prev, 
                  totalPages: Math.max(1, parseInt(e.target.value) || 1)
                }))}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={progress.startDate}
                onChange={(e) => setProgress(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Date
              </label>
              <input
                type="date"
                value={progress.targetDate}
                onChange={(e) => setProgress(prev => ({ ...prev, targetDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Daily Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Reading Goal (pages)
            </label>
            <input
              type="number"
              value={progress.dailyGoal}
              onChange={(e) => setProgress(prev => ({ 
                ...prev, 
                dailyGoal: Math.max(1, parseInt(e.target.value) || 1)
              }))}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Estimated Finish */}
          {calculateEstimatedFinish() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center text-blue-800 text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>Estimated finish date: <strong>{calculateEstimatedFinish()}</strong></span>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reading Notes
            </label>
            <textarea
              value={progress.notes}
              onChange={(e) => setProgress(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              placeholder="Add your thoughts, quotes, or notes..."
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
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save Progress
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReadingProgressModal;