import React from 'react';
import { Calendar, Flame, Target, TrendingUp } from 'lucide-react';

const ReadingStreakTracker = ({ books }) => {
  const calculateReadingStreak = () => {
    const finishedBooks = books
      .filter(book => book.status === 'finished' && book.readingProgress?.startDate)
      .sort((a, b) => new Date(b.readingProgress.lastUpdated) - new Date(a.readingProgress.lastUpdated));

    if (finishedBooks.length === 0) return { current: 0, longest: 0, lastRead: null };

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let lastDate = null;

    const today = new Date();
    const oneDayMs = 24 * 60 * 60 * 1000;

    finishedBooks.forEach((book, index) => {
      const bookDate = new Date(book.readingProgress.lastUpdated);
      
      if (index === 0) {
        // Check if the most recent book was finished within the last 7 days
        const daysSinceLastRead = Math.floor((today - bookDate) / oneDayMs);
        if (daysSinceLastRead <= 7) {
          currentStreak = 1;
          tempStreak = 1;
        }
        lastDate = bookDate;
      } else {
        const daysBetween = Math.floor((lastDate - bookDate) / oneDayMs);
        
        if (daysBetween <= 7) {
          tempStreak++;
          if (index === 1 || currentStreak > 0) {
            currentStreak = tempStreak;
          }
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
          currentStreak = 0;
        }
        lastDate = bookDate;
      }
    });

    longestStreak = Math.max(longestStreak, tempStreak);

    return {
      current: currentStreak,
      longest: longestStreak,
      lastRead: finishedBooks[0]?.readingProgress?.lastUpdated
    };
  };

  const getWeeklyReadingData = () => {
    const weeks = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (i * 7));
      weekStart.setHours(0, 0, 0, 0);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      
      const booksThisWeek = books.filter(book => {
        if (!book.readingProgress?.lastUpdated || book.status !== 'finished') return false;
        const finishDate = new Date(book.readingProgress.lastUpdated);
        return finishDate >= weekStart && finishDate <= weekEnd;
      }).length;
      
      weeks.push({
        week: `${weekStart.getMonth() + 1}/${weekStart.getDate()}`,
        books: booksThisWeek,
        isCurrentWeek: i === 0
      });
    }
    
    return weeks;
  };

  const streak = calculateReadingStreak();
  const weeklyData = getWeeklyReadingData();
  const maxWeeklyBooks = Math.max(...weeklyData.map(w => w.books), 1);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Flame className="w-6 h-6 text-orange-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Reading Streak</h3>
        </div>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-orange-600">{streak.current}</p>
              <p className="text-xs text-gray-500">books</p>
            </div>
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Longest Streak</p>
              <p className="text-2xl font-bold text-blue-600">{streak.longest}</p>
              <p className="text-xs text-gray-500">books</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          Weekly Reading Activity
        </h4>
        <div className="flex items-end space-x-1 h-20">
          {weeklyData.map((week, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full rounded-t transition-all duration-300 ${
                  week.isCurrentWeek 
                    ? 'bg-blue-500' 
                    : week.books > 0 
                      ? 'bg-green-400' 
                      : 'bg-gray-200'
                }`}
                style={{ 
                  height: `${Math.max((week.books / maxWeeklyBooks) * 60, week.books > 0 ? 8 : 4)}px` 
                }}
                title={`${week.week}: ${week.books} books`}
              />
              <span className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-center">
                {week.week}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Last Read */}
      {streak.lastRead && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Last book finished: {new Date(streak.lastRead).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReadingStreakTracker;