import React, { useState, useEffect } from 'react';
import {
  Plus,
  BarChart3,
  History,
  BookOpen,
  Menu,
  X
} from 'lucide-react';

import { loadBooks, saveBooks } from './utils/localStorage';


import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import BorrowForm from './components/BorrowForm';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import BorrowingHistory from './components/BorrowingHistory';
import Statistics from './components/Statistics';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showBookForm, setShowBookForm] = useState(false);
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(undefined);
  const [borrowingBook, setBorrowingBook] = useState(undefined);
  const [currentView, setCurrentView] = useState('library');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
  if (books.length > 0) {
    saveBooks(books);
  }
}, [books]);

  // Save to localStorage whenever books change
  useEffect(() => {
    saveBooks(books);
  }, [books]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === '' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSaveBook = (book) => {
    if (editingBook) {
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? book : b))
      );
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

  const handleConfirmBorrow = (borrowingRecord) => {
    if (borrowingBook) {
      setBooks((prev) =>
        prev.map((book) =>
          book.id === borrowingBook.id
            ? {
                ...book,
                status: 'borrowed',
                borrowingHistory: [
                  ...book.borrowingHistory,
                  borrowingRecord
                ]
              }
            : book
        )
      );
    }
    setShowBorrowForm(false);
    setBorrowingBook(undefined);
  };

  const handleReturnBook = (book) => {
    const currentBorrowing = book.borrowingHistory.find(
      (record) => !record.returnDate
    );

    if (currentBorrowing) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === book.id
            ? {
                ...b,
                status: 'available',
                borrowingHistory: b.borrowingHistory.map((record) =>
                  record.id === currentBorrowing.id
                    ? {
                        ...record,
                        returnDate: new Date().toISOString()
                      }
                    : record
                )
              }
            : b
        )
      );
    }
  };

  const menuItems = [
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'statistics', label: 'Statistics', icon: BarChart3 },
    { id: 'history', label: 'Borrowing History', icon: History }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'statistics':
        return <Statistics books={books} />;
      case 'history':
        return <BorrowingHistory books={books} />;
      default:
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Library
                </h1>
                <p className="text-gray-600 mt-1">
                  {filteredBooks.length} books found
                </p>
              </div>
              <button
                onClick={() => setShowBookForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-sm"
              >
                <Plus className="w-5 h-5 mr-2" />
                ➕ Add New Book
              </button>
            </div>

            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
            />

            {filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {books.length === 0
                    ? 'Welcome to Your Library!'
                    : 'No Books Found'}
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
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEdit={handleEditBook}
                    onBorrow={handleBorrowBook}
                    onReturn={handleReturnBook}
                  />
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white p-2 rounded-lg shadow-md"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <div className="flex items-center mb-8">
            <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">
              BookLibrary
            </h1>
          </div>

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
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-64 p-4 lg:p-8">{renderContent()}</div>

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
    </div>
  );
}

export default App;
