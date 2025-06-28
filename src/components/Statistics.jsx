import React from 'react';
import { BookOpen, Users, TrendingUp, Clock, Star, Target, Award, Calendar } from 'lucide-react';

const Statistics = ({ books, goals = {} }) => {
  const totalBooks = books.length;
  const borrowedBooks = books.filter(book => book.status === 'borrowed').length;
  const availableBooks = books.filter(book => book.status === 'available').length;
  const currentlyReading = books.filter(book => book.status === 'currently-reading').length;
  const wantToRead = books.filter(book => book.status === 'want-to-read').length;
  const finished = books.filter(book => book.status === 'finished').length;
  
  const totalBorrowings = books.reduce((sum, book) => sum + book.borrowingHistory.length, 0);
  
  const categoryStats = books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {});
  
  const topCategory = Object.entries(categoryStats).sort(([,a], [,b]) => b - a)[0];

  // Reading stats
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

  const averageRating = books.filter(b => b.rating).length > 0 
    ? books.filter(b => b.rating).reduce((sum, b) => sum + b.rating, 0) / books.filter(b => b.rating).length
    : 0;

  const stats = [
    {
      title: 'Total Books',
      value: totalBooks,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Currently Reading',
      value: currentlyReading,
      icon: BookOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Finished This Year',
      value: booksThisYear.length,
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Want to Read',
      value: wantToRead,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Available',
      value: availableBooks,
      icon: BookOpen,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      title: 'Currently Borrowed',
      value: borrowedBooks,
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Pages This Year',
      value: pagesThisYear.toLocaleString(),
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      title: 'Average Rating',
      value: averageRating > 0 ? averageRating.toFixed(1) : 'N/A',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Library Statistics</h2>
      
      {/* Reading Goals Progress */}
      {goals.yearlyTarget && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-blue-600" />
            {currentYear} Reading Goals
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Books Goal</span>
                <span className="text-sm font-bold">{booksThisYear.length} / {goals.yearlyTarget}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((booksThisYear.length / goals.yearlyTarget) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {Math.round((booksThisYear.length / goals.yearlyTarget) * 100)}% complete
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Pages Goal</span>
                <span className="text-sm font-bold">{pagesThisYear.toLocaleString()} / {goals.pagesTarget?.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((pagesThisYear / (goals.pagesTarget || 1)) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {Math.round((pagesThisYear / (goals.pagesTarget || 1)) * 100)}% complete
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      {topCategory && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(categoryStats)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 8)
              .map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{category}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(count / totalBooks) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 min-w-[3rem] text-right">
                      {count} ({Math.round((count / totalBooks) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Reading Status Breakdown */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reading Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Want to Read', count: wantToRead, color: 'bg-blue-500' },
            { label: 'Currently Reading', count: currentlyReading, color: 'bg-orange-500' },
            { label: 'Finished', count: finished, color: 'bg-green-500' },
            { label: 'Available', count: availableBooks, color: 'bg-gray-500' },
            { label: 'Borrowed', count: borrowedBooks, color: 'bg-red-500' }
          ].map((status, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${status.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <span className="text-white font-bold text-lg">{status.count}</span>
              </div>
              <p className="text-sm font-medium text-gray-700">{status.label}</p>
              <p className="text-xs text-gray-500">
                {totalBooks > 0 ? Math.round((status.count / totalBooks) * 100) : 0}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;