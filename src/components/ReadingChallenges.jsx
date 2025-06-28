import React, { useState, useEffect } from 'react';
import { Trophy, Target, Users, Calendar, Plus, X } from 'lucide-react';
import { loadChallenges, saveChallenges, generateId } from '../utils/localStorage';

const ReadingChallenges = ({ books, onJoinChallenge }) => {
  const [challenges, setChallenges] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    target: 12,
    endDate: '',
    type: 'books' // 'books' or 'pages'
  });

  useEffect(() => {
    const savedChallenges = loadChallenges();
    setChallenges(savedChallenges);
  }, []);

  const calculateProgress = (challenge) => {
    const currentYear = new Date().getFullYear();
    const challengeYear = new Date(challenge.endDate).getFullYear();
    
    if (challengeYear !== currentYear) return 0;
    
    if (challenge.type === 'books') {
      return books.filter(book => 
        book.status === 'finished' && 
        book.readingProgress?.startDate &&
        new Date(book.readingProgress.startDate).getFullYear() === currentYear
      ).length;
    } else {
      return books.reduce((total, book) => {
        if (book.status === 'finished' && 
            book.readingProgress?.startDate &&
            new Date(book.readingProgress.startDate).getFullYear() === currentYear) {
          return total + (book.pages || 0);
        }
        return total;
      }, 0);
    }
  };

  const handleCreateChallenge = (e) => {
    e.preventDefault();
    
    const challenge = {
      id: generateId(),
      ...newChallenge,
      createdDate: new Date().toISOString(),
      participants: 1,
      isPersonal: true
    };
    
    const updatedChallenges = [...challenges, challenge];
    setChallenges(updatedChallenges);
    saveChallenges(updatedChallenges);
    
    setNewChallenge({
      title: '',
      description: '',
      target: 12,
      endDate: '',
      type: 'books'
    });
    setShowCreateForm(false);
  };

  const defaultChallenges = [
    {
      id: 'default-1',
      title: '2024 Reading Challenge',
      description: 'Read 24 books in 2024',
      target: 24,
      type: 'books',
      endDate: '2024-12-31',
      participants: 1247,
      isPersonal: false
    },
    {
      id: 'default-2',
      title: 'Page Turner Challenge',
      description: 'Read 10,000 pages this year',
      target: 10000,
      type: 'pages',
      endDate: '2024-12-31',
      participants: 892,
      isPersonal: false
    },
    {
      id: 'default-3',
      title: 'Monthly Reader',
      description: 'Read at least one book every month',
      target: 12,
      type: 'books',
      endDate: '2024-12-31',
      participants: 2156,
      isPersonal: false
    }
  ];

  const allChallenges = [...challenges, ...defaultChallenges];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Reading Challenges</h3>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Create Challenge
        </button>
      </div>

      {/* Create Challenge Form */}
      {showCreateForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Create New Challenge</h4>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <form onSubmit={handleCreateChallenge} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Challenge Title
              </label>
              <input
                type="text"
                value={newChallenge.title}
                onChange={(e) => setNewChallenge(prev => ({ ...prev, title: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="My Reading Challenge"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newChallenge.description}
                onChange={(e) => setNewChallenge(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your challenge..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newChallenge.type}
                  onChange={(e) => setNewChallenge(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="books">Books</option>
                  <option value="pages">Pages</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target
                </label>
                <input
                  type="number"
                  value={newChallenge.target}
                  onChange={(e) => setNewChallenge(prev => ({ ...prev, target: parseInt(e.target.value) }))}
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={newChallenge.endDate}
                onChange={(e) => setNewChallenge(prev => ({ ...prev, endDate: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create Challenge
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Challenges List */}
      <div className="space-y-4">
        {allChallenges.map((challenge) => {
          const progress = calculateProgress(challenge);
          const progressPercentage = Math.min((progress / challenge.target) * 100, 100);
          const isCompleted = progress >= challenge.target;
          const daysLeft = Math.ceil((new Date(challenge.endDate) - new Date()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900 flex items-center">
                    {challenge.title}
                    {challenge.isPersonal && (
                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Personal
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600">{challenge.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {progress} / {challenge.target}
                  </p>
                  <p className="text-xs text-gray-500">
                    {challenge.type === 'books' ? 'books' : 'pages'}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCompleted ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              {/* Challenge Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{challenge.participants.toLocaleString()} participants</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Challenge ended'}
                    </span>
                  </div>
                </div>
                
                {isCompleted && (
                  <div className="flex items-center text-green-600">
                    <Trophy className="w-4 h-4 mr-1" />
                    <span className="font-medium">Completed!</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadingChallenges;