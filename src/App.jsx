import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

import Login from './pages/Login';
import Signup from './pages/Signup';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import Statistics from './components/Statistics';
import BorrowingHistory from './components/BorrowingHistory';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import BorrowForm from './components/BorrowForm';
import AdvancedSearchFilters from './components/AdvancedSearchFilters';
import ReadingProgressModal from './components/ReadingProgressModal';
import ReadingGoalsModal from './components/ReadingGoalsModal';
import BookRatingModal from './components/BookRatingModal';

import { loadBooks, saveBooks, loadReadingGoals, saveReadingGoals } from './utils/localStorage';
import { filterBooks, sortBooks, getReadingStats } from './utils/bookUtils';

import { BookOpen, BarChart3, History, Menu, X, Target, TrendingUp } from 'lucide-react';

import './App.css';

function AppContent() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showBookForm, setShowBookForm] = useState(false);
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [editingBook, setEditingBook] = useState(undefined);
  const [borrowingBook, setBorrowingBook] = useState(undefined);
  const [progressBook, setProgressBook] = useState(undefined);
  const [ratingBook, setRatingBook] = useState(undefined);
  const [currentView, setCurrentView] = useState('library');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readingGoals, setReadingGoals] = useState({});

  // Advanced filters state
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    yearRange: { min: '', max: '' },
    pageRange: { min: '', max: '' },
    rating: '',
    sortBy: 'title-asc'
  });

  const { currentUser } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    if (currentUser) {
      const storedBooks = loadBooks();
      const storedGoals = loadReadingGoals();
      setBooks(storedBooks);
      setReadingGoals(storedGoals);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && books.length > 0) {
      saveBooks(books);
    }
  }, [books, currentUser]);

  // Apply filters and sorting
  const filteredAndSortedBooks = React.useMemo(() => {
    let result = filterBooks(books, searchTerm, {
      ...filters,
      category: selectedCategory || filters.category
    });
    return sortBooks(result, filters.sortBy);
  }, [books, searchTerm, selectedCategory, filters]);

  const stats = getReadingStats(books);

  const handleSaveBook = (book) => {
    if (editingBook) {
      setBooks((prev) => prev.map((b) => (b.id === book.id ? book : b)));
    } else {
      setBooks((prev) => [...prev, book]);
    }
    setShowBookForm(false);
    setEditingBook(undefined);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowBookForm(true);
  };

  const handleBorrowBook = (book) => {
    setBorrowingBook(book);
    setShowBorrowForm(true);
  };

  const handleConfirmBorrow = (record) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === borrowingBook.id
          ? {
              ...book,
              status: 'borrowed',
              borrowingHistory: [...book.borrowingHistory, record],
            }
          : book
      )
    );
    setShowBorrowForm(false);
    setBorrowingBook(undefined);
  };

  const handleReturnBook = (book) => {
    const record = book.borrowingHistory.find((r) => !r.returnDate);
    if (record) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === book.id
            ? {
                ...b,
                status: 'available',
                borrowingHistory: b.borrowingHistory.map((r) =>
                  r.id === record.id ? { ...r, returnDate: new Date().toISOString() } : r
                ),
              }
            : b
        )
      );
    }
  };

  const handleUpdateProgress = (book) => {
    setProgressBook(book);
    setShowProgressModal(true);
  };

  const handleSaveProgress = (updatedBook) => {
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    setShowProgressModal(false);
    setProgressBook(undefined);
  };

  const handleRateBook = (book) => {
    setRatingBook(book);
    setShowRatingModal(true);
  };

  const handleSaveRating = (updatedBook) => {
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    setShowRatingModal(false);
    setRatingBook(undefined);
  };

  const handleSaveGoals = (goals) => {
    setReadingGoals(goals);
    saveReadingGoals(goals);
    setShowGoalsModal(false);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'statistics':
        return <Statistics books={books} goals={readingGoals} />;
      case 'history':
        return <BorrowingHistory books={books} />;
      default:
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
                <p className="text-gray-600 mt-1">
                  {filteredAndSortedBooks.length} of {books.length} books
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowGoalsModal(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center shadow-sm"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Goals
                </button>
                <button
                  onClick={() => setShowBookForm(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-sm"
                >
                  ➕ Add Book
                </button>
              </div>
            </div>

            {/* Reading Goals Progress */}
            {readingGoals.yearlyTarget && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    {new Date().getFullYear()} Reading Progress
                  </h3>
                  <button
                    onClick={() => setShowGoalsModal(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit Goals
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700">Books Read</span>
                      <span className="text-sm font-medium">{stats.finishedThisYear} / {readingGoals.yearlyTarget}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((stats.finishedThisYear / readingGoals.yearlyTarget) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700">Pages Read</span>
                      <span className="text-sm font-medium">{stats.pagesThisYear.toLocaleString()} / {readingGoals.pagesTarget?.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((stats.pagesThisYear / (readingGoals.pagesTarget || 1)) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm}
              onFiltersClick={() => setShowAdvancedFilters(true)}
              books={books}
            />

            {filteredAndSortedBooks.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {books.length === 0 ? 'Welcome to Your Library!' : 'No Books Found'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {books.length === 0
                    ? 'Start building your personal library by adding your first book!'
                    : 'Try adjusting your search or filter criteria.'}
                </p>
                {books.length === 0 && (
                  <button
                    onClick={() => setShowBookForm(true)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    ➕ Add Your First Book
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEdit={handleEditBook}
                    onBorrow={handleBorrowBook}
                    onReturn={handleReturnBook}
                    onUpdateProgress={handleUpdateProgress}
                    onRate={handleRateBook}
                  />
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  const menuItems = [
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'history', label: 'Borrowing History', icon: History }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route
          path="/login"
          element={!currentUser ? <Login /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signup"
          element={!currentUser ? <Signup /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                {/* Mobile menu toggle */}
                <div className="lg:hidden fixed top-20 left-4 z-50">
                  <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)} 
                    className="bg-white p-2 rounded-lg shadow-md border border-gray-200"
                  >
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>

                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20`}>
                  <div className="p-6 overflow-y-auto max-h-screen">
                    <nav className="space-y-2">
                      {menuItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setCurrentView(item.id);
                            setSidebarOpen(false);
                          }}
                          className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                            currentView === item.id
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          {item.label}
                        </button>
                      ))}
                    </nav>

                    {currentView === 'library' && (
                      <div className="mt-8">
                        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

                {/* Main Content */}
                <div className="lg:ml-64 pt-20 p-4 lg:p-8">
                  {renderContent()}
                </div>

                {/* Modals */}
                {showBookForm && (
                  <BookForm
                    book={editingBook}
                    onSave={handleSaveBook}
                    onCancel={() => {
                      setShowBookForm(false);
                      setEditingBook(undefined);
                    }}
                  />
                )}
                {showBorrowForm && borrowingBook && (
                  <BorrowForm
                    book={borrowingBook}
                    onBorrow={handleConfirmBorrow}
                    onCancel={() => {
                      setShowBorrowForm(false);
                      setBorrowingBook(undefined);
                    }}
                  />
                )}
                {showAdvancedFilters && (
                  <AdvancedSearchFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClose={() => setShowAdvancedFilters(false)}
                  />
                )}
                {showProgressModal && progressBook && (
                  <ReadingProgressModal
                    book={progressBook}
                    onSave={handleSaveProgress}
                    onCancel={() => {
                      setShowProgressModal(false);
                      setProgressBook(undefined);
                    }}
                  />
                )}
                {showGoalsModal && (
                  <ReadingGoalsModal
                    goals={readingGoals}
                    books={books}
                    onSave={handleSaveGoals}
                    onCancel={() => setShowGoalsModal(false)}
                  />
                )}
                {showRatingModal && ratingBook && (
                  <BookRatingModal
                    book={ratingBook}
                    onSave={handleSaveRating}
                    onCancel={() => {
                      setShowRatingModal(false);
                      setRatingBook(undefined);
                    }}
                  />
                )}
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to={currentUser ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;