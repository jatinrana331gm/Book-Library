import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Share2, MessageCircle, Heart, BookOpen } from 'lucide-react';
import { loadFriends, saveFriends, generateId } from '../utils/localStorage';

const SocialFeatures = ({ books, currentUser }) => {
  const [friends, setFriends] = useState([]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const savedFriends = loadFriends();
    setFriends(savedFriends);
  }, []);

  const addFriend = (e) => {
    e.preventDefault();
    if (!newFriendEmail.trim()) return;

    const newFriend = {
      id: generateId(),
      email: newFriendEmail,
      name: newFriendEmail.split('@')[0],
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg`,
      booksRead: Math.floor(Math.random() * 50) + 10,
      currentlyReading: 'The Great Gatsby',
      joinedDate: new Date().toISOString(),
      isOnline: Math.random() > 0.5
    };

    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    saveFriends(updatedFriends);
    setNewFriendEmail('');
    setShowAddFriend(false);
  };

  const shareBook = (book) => {
    setSelectedBook(book);
    // In a real app, this would open a sharing modal or send to social media
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `I'm reading "${book.title}" by ${book.author}. Great book!`;
      navigator.clipboard.writeText(shareText);
      alert('Book recommendation copied to clipboard!');
    }
  };

  const getRecentActivity = () => {
    const activities = [];
    
    // Generate some mock activities
    friends.forEach(friend => {
      if (Math.random() > 0.7) {
        activities.push({
          id: generateId(),
          type: 'finished',
          user: friend.name,
          book: books[Math.floor(Math.random() * books.length)]?.title || 'Unknown Book',
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      if (Math.random() > 0.8) {
        activities.push({
          id: generateId(),
          type: 'started',
          user: friend.name,
          book: books[Math.floor(Math.random() * books.length)]?.title || 'Unknown Book',
          timestamp: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    });

    return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
  };

  const recentActivity = getRecentActivity();

  return (
    <div className="space-y-6">
      {/* Friends List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Reading Friends</h3>
          </div>
          <button
            onClick={() => setShowAddFriend(true)}
            className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Add Friend
          </button>
        </div>

        {/* Add Friend Form */}
        {showAddFriend && (
          <form onSubmit={addFriend} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex gap-2">
              <input
                type="email"
                value={newFriendEmail}
                onChange={(e) => setNewFriendEmail(e.target.value)}
                placeholder="Enter friend's email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddFriend(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Friends Grid */}
        {friends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <div key={friend.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {friend.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{friend.name}</h4>
                    <p className="text-sm text-gray-600">{friend.booksRead} books read</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Currently reading:</p>
                  <p className="font-medium text-gray-900">{friend.currentlyReading}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No friends added yet</p>
            <p className="text-sm text-gray-500">Add friends to share your reading journey!</p>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <MessageCircle className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>

        {recentActivity.length > 0 ? (
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'finished' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'finished' ? (
                    <Heart className="w-4 h-4 text-green-600" />
                  ) : (
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    {activity.type === 'finished' ? ' finished reading ' : ' started reading '}
                    <span className="font-medium">"{activity.book}"</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No recent activity</p>
            <p className="text-sm text-gray-500">Activity from your friends will appear here</p>
          </div>
        )}
      </div>

      {/* Book Sharing */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Share2 className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Share Your Reads</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.filter(book => book.status === 'finished' && book.rating >= 4).slice(0, 6).map((book) => (
            <div key={book.id} className="border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium text-gray-900 text-sm mb-1">{book.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{book.author}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {Array.from({ length: book.rating }, (_, i) => (
                    <Heart key={i} className="w-3 h-3 text-red-500 fill-current" />
                  ))}
                </div>
                <button
                  onClick={() => shareBook(book)}
                  className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialFeatures;