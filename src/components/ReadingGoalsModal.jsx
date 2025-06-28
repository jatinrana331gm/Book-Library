import React, { useState, useEffect } from 'react';
import { X, Target, Calendar, TrendingUp, Award } from 'lucide-react';

const ReadingGoalsModal = ({ goals, onSave, onCancel, books }) => {
  const [localGoals, setLocalGoals] = useState({
    yearlyTarget: goals?.yearlyTarget || 12,
    currentYear: new Date().getFullYear(),
    monthlyTarget: goals?.monthlyTarget || 1,
    pagesTarget: goals?.pagesTarget || 1000,
    ...goals
  });

  const currentYear = new Date().getFullYear();
  const booksThisYear = books.filter(book => 
    book.readingProgress?.startDate && 
    new Date(book.readingProgress.startDate).getFullYear() === currentYear &&
    book.status === 'finished'
  );

  const pagesThisYear = books.reduce((total, book) => {
    if (book.readingProgress?.startDate && 
        new Date(book.readingProgress.startDate).getFullYear() === currentYear &&
        book.status === 'finished') {
      return total + (book.pages || 0);
    }
    return total;
  }, 0);

  const yearlyProgress = (booksThisYear.length / localGoals.yearlyTarget) * 100;
  const pagesProgress = (pagesThisYear / localGoals.pagesTarget) * 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(localGoals);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Target className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Reading Goals</h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Progress */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              {currentYear} Progress
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">Books Read</span>
                  <span className="text-sm font-medium">{booksThisYear.length} / {localGoals.yearlyTarget}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(yearlyProgress, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">Pages Read</span>
                  <span className="text-sm font-medium">{pagesThisYear.toLocaleString()} / {localGoals.pagesTarget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(pagesProgress, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Goal Settings */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yearly Book Goal
              </label>
              <input
                type="number"
                value={localGoals.yearlyTarget}
                onChange={(e) => setLocalGoals(prev => ({ 
                  ...prev, 
                  yearlyTarget: Math.max(1, parseInt(e.target.value) || 1)
                }))}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Number of books you want to read this year
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Book Goal
              </label>
              <input
                type="number"
                value={localGoals.monthlyTarget}
                onChange={(e) => setLocalGoals(prev => ({ 
                  ...prev, 
                  monthlyTarget: Math.max(1, parseInt(e.target.value) || 1)
                }))}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Average books per month
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yearly Pages Goal
              </label>
              <input
                type="number"
                value={localGoals.pagesTarget}
                onChange={(e) => setLocalGoals(prev => ({ 
                  ...prev, 
                  pagesTarget: Math.max(100, parseInt(e.target.value) || 100)
                }))}
                min="100"
                step="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total pages you want to read this year
              </p>
            </div>
          </div>

          {/* Motivation */}
          {yearlyProgress >= 100 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center text-green-800">
                <Award className="w-5 h-5 mr-2" />
                <span className="font-medium">Congratulations! You've reached your yearly goal! 🎉</span>
              </div>
            </div>
          )}

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
              Save Goals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReadingGoalsModal;