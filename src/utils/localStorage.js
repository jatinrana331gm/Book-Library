const STORAGE_KEY = 'books';
const GOALS_STORAGE_KEY = 'reading-goals';

export const loadBooks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const books = data ? JSON.parse(data) : [];
    
    // If no books exist, load sample books for new users
    if (books.length === 0) {
      const sampleBooks = getSampleBooks();
      saveBooks(sampleBooks);
      return sampleBooks;
    }
    
    return books;
  } catch (error) {
    console.error('Error loading books from localStorage:', error);
    return getSampleBooks(); // Return sample books as fallback
  }
};

export const saveBooks = (books) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error('Error saving books to localStorage:', error);
  }
};

export const loadReadingGoals = () => {
  try {
    const data = localStorage.getItem(GOALS_STORAGE_KEY);
    return data ? JSON.parse(data) : {
      yearlyTarget: 12,
      monthlyTarget: 1,
      pagesTarget: 1000,
      currentYear: new Date().getFullYear()
    };
  } catch (error) {
    console.error('Error loading reading goals from localStorage:', error);
    return {
      yearlyTarget: 12,
      monthlyTarget: 1,
      pagesTarget: 1000,
      currentYear: new Date().getFullYear()
    };
  }
};

export const saveReadingGoals = (goals) => {
  try {
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving reading goals to localStorage:', error);
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
    coverUrl: "https://m.media-amazon.com/images/I/81cXIf1Q0QL._SL1500_.jpg",
    status: "finished",
    rating: 5,
    review: "A masterpiece of American literature. Fitzgerald's prose is beautiful and the story is timeless.",
    dateAdded: new Date().toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 180,
      startDate: "2024-01-15",
      targetDate: "2024-02-15",
      notes: "Beautiful writing style",
      dailyGoal: 10,
      percentage: 100,
      lastUpdated: "2024-02-10T10:00:00.000Z"
    }
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
    coverUrl: "https://i.pinimg.com/originals/8e/14/43/8e14438380e37a10b3e5e4bb65b76015.jpg",
    status: "currently-reading",
    dateAdded: new Date(Date.now() - 86400000).toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 150,
      startDate: "2024-12-01",
      targetDate: "2024-12-31",
      notes: "Powerful themes about justice and morality",
      dailyGoal: 15,
      percentage: 46,
      lastUpdated: new Date().toISOString()
    }
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
    coverUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b468d093312907.5e6139cf2ab03.png",
    status: "want-to-read",
    dateAdded: new Date(Date.now() - 172800000).toISOString(),
    borrowingHistory: []
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
    coverUrl: "https://tse1.mm.bing.net/th?id=OIP.WIlTXUUOYa6nqscRw9Gx6AHaKn&pid=Api&P=0&h=180",
    status: "finished",
    rating: 4,
    review: "A compelling coming-of-age story with a unique narrative voice.",
    dateAdded: new Date(Date.now() - 259200000).toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 277,
      startDate: "2024-11-01",
      targetDate: "2024-11-20",
      notes: "Holden's voice is so distinctive",
      dailyGoal: 20,
      percentage: 100,
      lastUpdated: "2024-11-18T15:30:00.000Z"
    }
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
    coverUrl: "https://cdnb.artstation.com/p/assets/images/images/060/840/091/large/munachiso-nweke-edited-text-final-sapiens.jpg?1679427786",
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
    coverUrl: "https://images.thenile.io/r1000/9780007458424.jpg",
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
    coverUrl: "https://www.bookishelf.com/wp-content/uploads/2020/01/41LcuCqSeJL.jpg",
    status: "finished",
    rating: 5,
    review: "Fascinating insight into one of the most influential figures of our time.",
    dateAdded: new Date(Date.now() - 518400000).toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 656,
      startDate: "2024-10-01",
      targetDate: "2024-11-01",
      notes: "Incredible story of innovation and determination",
      dailyGoal: 25,
      percentage: 100,
      lastUpdated: "2024-10-28T20:00:00.000Z"
    }
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
    coverUrl: "https://cdn.kobo.com/book-images/a3fb0737-8700-49ff-a4bf-3af6734ddbbd/1200/1200/False/the-art-of-war-with-an-introduction-by-nigel-cawthorne.jpg",
    status: "want-to-read",
    dateAdded: new Date(Date.now() - 604800000).toISOString(),
    borrowingHistory: []
  }
];