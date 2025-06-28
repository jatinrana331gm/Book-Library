// src/components/BookLibrary.jsx

import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import BookForm from './BookForm';
import BorrowForm from './BorrowForm';
import SearchBar from './SearchBar';
import { loadBooks, saveBooks } from '../utils/localStorage';

const BookLibrary = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [borrowingBook, setBorrowingBook] = useState(null);

  useEffect(() => {
    const storedBooks = loadBooks();
    console.log("📦 Loaded from localStorage:", storedBooks);
    setBooks(storedBooks);
  }, []);

  useEffect(() => {
    saveBooks(books);
  }, [books]);

  const handleAddBook = (newBook) => {
    const newEntry = {
      ...newBook,
      id: Date.now(),
      borrowingHistory: [],
      status: 'available',
    };
    setBooks([...books, newEntry]);
    setShowAddModal(false);
  };

  const handleEditBook = (updatedBook) => {
    setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    setShowEditModal(false);
    setEditingBook(null);
  };

  const handleBorrow = (book) => {
    setBorrowingBook(book);
    setShowBorrowForm(true);
  };

  const handleConfirmBorrow = (bookId, borrowerName) => {
    const updatedBooks = books.map((book) =>
      book.id === bookId
        ? {
            ...book,
            status: 'borrowed',
            borrowingHistory: [
              ...book.borrowingHistory,
              {
                borrowerName,
                borrowDate: new Date().toISOString(),
                returnDate: null,
              },
            ],
          }
        : book
    );
    setBooks(updatedBooks);
    setShowBorrowForm(false);
    setBorrowingBook(null);
  };

  const handleReturnBook = (book) => {
    const updatedBooks = books.map((b) =>
      b.id === book.id
        ? {
            ...b,
            status: 'available',
            borrowingHistory: b.borrowingHistory.map((entry) =>
              !entry.returnDate
                ? { ...entry, returnDate: new Date().toISOString() }
                : entry
            ),
          }
        : b
    );
    setBooks(updatedBooks);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = [book.title, book.author, book.category]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      book.category?.toLowerCase().trim() === selectedCategory.toLowerCase().trim();

    return matchesSearch && matchesCategory;
  });

  const categories = [
    'All',
    'Fiction',
    'Non-Fiction',
    'Science',
    'Technology',
    'Biography',
    'History',
    'Philosophy',
    'Art',
    'Religion',
    'Self-Help',
    'Romance',
    'Mystery',
    'Fantasy',
    'Science Fiction',
    'Horror',
    'Thriller',
    'Children',
    'Young Adult',
    'Poetry',
    'Drama',
    'Other',
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-60 p-4 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-3 py-1.5 rounded transition ${
                selectedCategory === cat
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">📚 Book Library</h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => setShowAddModal(true)}
          >
            + Add New Book
          </button>
        </div>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Modals */}
        <div className="my-6">
          {showAddModal && (
            <BookForm onAddBook={handleAddBook} onCancel={() => setShowAddModal(false)} />
          )}
          {showEditModal && editingBook && (
            <BookForm
              book={editingBook}
              onEditBook={handleEditBook}
              onCancel={() => {
                setShowEditModal(false);
                setEditingBook(null);
              }}
            />
          )}
          {showBorrowForm && borrowingBook && (
            <BorrowForm
              book={borrowingBook}
              onBorrow={handleConfirmBorrow}
              onCancel={() => {
                setShowBorrowForm(false);
                setBorrowingBook(null);
              }}
            />
          )}
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={(book) => {
                setEditingBook(book);
                setShowEditModal(true);
              }}
              onBorrow={handleBorrow}
              onReturn={handleReturnBook}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookLibrary;
