const STORAGE_KEY = 'bookLibrary';

export const loadBooks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getSampleBooks();
  } catch (error) {
    console.error('Error loading books from localStorage:', error);
    return getSampleBooks();
  }
};

export const saveBooks = (books) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Error saving books to localStorage:', error);
  }
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const getSampleBooks = () => [
  {
    id: generateId(),
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Fiction",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    publishedYear: 1925,
    pages: 180,
    coverUrl: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "available",
    dateAdded: new Date().toISOString(),
    borrowingHistory: []
  },
  {
    id: generateId(),
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    publishedYear: 1960,
    pages: 324,
    coverUrl: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "borrowed",
    dateAdded: new Date(Date.now() - 86400000).toISOString(),
    borrowingHistory: [
      {
        id: generateId(),
        borrowerName: "Alice Johnson",
        borrowDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        notes: "Book club reading"
      }
    ]
  },
  {
    id: generateId(),
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    category: "Science Fiction",
    description: "A dystopian social science fiction novel about totalitarian control and surveillance.",
    publishedYear: 1949,
    pages: 328,
    coverUrl: "https://images.pexels.com/photos/1130641/pexels-photo-1130641.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "available",
    dateAdded: new Date(Date.now() - 172800000).toISOString(),
    borrowingHistory: [
      {
        id: generateId(),
        borrowerName: "Bob Smith",
        borrowDate: new Date(Date.now() - 86400000 * 20).toISOString(),
        returnDate: new Date(Date.now() - 86400000 * 10).toISOString(),
        notes: "Great read!"
      }
    ]
  },
  {
    id: generateId(),
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0-316-76948-0",
    category: "Fiction",
    description: "A controversial novel about teenage rebellion and alienation in post-war America.",
    publishedYear: 1951,
    pages: 277,
    coverUrl: "https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "available",
    dateAdded: new Date(Date.now() - 259200000).toISOString(),
    borrowingHistory: []
  },
  {
    id: generateId(),
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn: "978-0-06-231609-7",
    category: "Non-Fiction",
    description: "An exploration of how Homo sapiens came to dominate the world through cognitive, agricultural, and scientific revolutions.",
    publishedYear: 2011,
    pages: 443,
    coverUrl: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "available",
    dateAdded: new Date(Date.now() - 345600000).toISOString(),
    borrowingHistory: []
  },
  {
    id: generateId(),
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0-547-92822-7",
    category: "Fantasy",
    description: "A fantasy adventure about Bilbo Baggins' unexpected journey to help reclaim a dwarf kingdom.",
    publishedYear: 1937,
    pages: 310,
    coverUrl: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "borrowed",
    dateAdded: new Date(Date.now() - 432000000).toISOString(),
    borrowingHistory: [
      {
        id: generateId(),
        borrowerName: "Charlie Brown",
        borrowDate: new Date(Date.now() - 86400000 * 3).toISOString(),
        notes: "Fantasy book club selection"
      }
    ]
  },
  {
    id: generateId(),
    title: "Steve Jobs",
    author: "Walter Isaacson",
    isbn: "978-1-4516-4853-9",
    category: "Biography",
    description: "The exclusive biography of Apple co-founder Steve Jobs, based on extensive interviews.",
    publishedYear: 2011,
    pages: 656,
    coverUrl: "https://images.pexels.com/photos/1130641/pexels-photo-1130641.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "available",
    dateAdded: new Date(Date.now() - 518400000).toISOString(),
    borrowingHistory: []
  },
  {
    id: generateId(),
    title: "The Art of War",
    author: "Sun Tzu",
    isbn: "978-1-59030-963-7",
    category: "Philosophy",
    description: "An ancient Chinese military treatise on strategy, tactics, and philosophy of war.",
    publishedYear: -500,
    pages: 273,
    coverUrl: "https://images.pexels.com/photos/1130623/pexels-photo-1130623.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "available",
    dateAdded: new Date(Date.now() - 604800000).toISOString(),
    borrowingHistory: [
      {
        id: generateId(),
        borrowerName: "Diana Prince",
        borrowDate: new Date(Date.now() - 86400000 * 30).toISOString(),
        returnDate: new Date(Date.now() - 86400000 * 15).toISOString(),
        notes: "Fascinating strategic insights"
      }
    ]
  }
];


