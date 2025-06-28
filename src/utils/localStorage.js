const STORAGE_KEY = 'books';
const GOALS_STORAGE_KEY = 'reading-goals';
const FRIENDS_STORAGE_KEY = 'friends';
const CHALLENGES_STORAGE_KEY = 'reading-challenges';

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

export const loadFriends = () => {
  try {
    const data = localStorage.getItem(FRIENDS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading friends from localStorage:', error);
    return [];
  }
};

export const saveFriends = (friends) => {
  try {
    localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(friends));
  } catch (error) {
    console.error('Error saving friends to localStorage:', error);
  }
};

export const loadChallenges = () => {
  try {
    const data = localStorage.getItem(CHALLENGES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading challenges from localStorage:', error);
    return [];
  }
};

export const saveChallenges = (challenges) => {
  try {
    localStorage.setItem(CHALLENGES_STORAGE_KEY, JSON.stringify(challenges));
  } catch (error) {
    console.error('Error saving challenges to localStorage:', error);
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
    coverUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    status: "finished",
    rating: 5,
    review: "A masterpiece of American literature. Fitzgerald's prose is beautiful and the story is timeless.",
    dateAdded: new Date().toISOString(),
    borrowingHistory: [],
    series: "The Great Gatsby Series",
    seriesNumber: 1,
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
    coverUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
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
    coverUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
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
    coverUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
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
    coverUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
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
    coverUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    status: "borrowed",
    dateAdded: new Date(Date.now() - 432000000).toISOString(),
    series: "Middle-earth",
    seriesNumber: 1,
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
    coverUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
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
    coverUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    status: "want-to-read",
    dateAdded: new Date(Date.now() - 604800000).toISOString(),
    borrowingHistory: []
  },
  // Additional books for a richer library
  {
    id: generateId(),
    title: "Dune",
    author: "Frank Herbert",
    isbn: "978-0-441-17271-9",
    category: "Science Fiction",
    description: "A science fiction epic about politics, religion, and ecology on the desert planet Arrakis.",
    publishedYear: 1965,
    pages: 688,
    coverUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
    status: "currently-reading",
    dateAdded: new Date(Date.now() - 691200000).toISOString(),
    series: "Dune Chronicles",
    seriesNumber: 1,
    borrowingHistory: [],
    readingProgress: {
      currentPage: 200,
      startDate: "2024-12-15",
      targetDate: "2025-01-15",
      notes: "Complex world-building",
      dailyGoal: 20,
      percentage: 29,
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: generateId(),
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    isbn: "978-0-547-92832-6",
    category: "Fantasy",
    description: "The first volume of the epic fantasy trilogy following Frodo's quest to destroy the One Ring.",
    publishedYear: 1954,
    pages: 423,
    coverUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    status: "finished",
    rating: 5,
    review: "An absolute masterpiece of fantasy literature. Tolkien's world-building is unparalleled.",
    dateAdded: new Date(Date.now() - 777600000).toISOString(),
    series: "The Lord of the Rings",
    seriesNumber: 1,
    borrowingHistory: [],
    readingProgress: {
      currentPage: 423,
      startDate: "2024-09-01",
      targetDate: "2024-10-01",
      notes: "Beautiful descriptions of Middle-earth",
      dailyGoal: 15,
      percentage: 100,
      lastUpdated: "2024-09-28T18:00:00.000Z"
    }
  },
  {
    id: generateId(),
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    category: "Romance",
    description: "A romantic novel about Elizabeth Bennet and her complex relationship with Mr. Darcy.",
    publishedYear: 1813,
    pages: 279,
    coverUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
    status: "finished",
    rating: 4,
    review: "Witty and charming. Austen's social commentary is brilliant.",
    dateAdded: new Date(Date.now() - 864000000).toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 279,
      startDate: "2024-08-01",
      targetDate: "2024-08-20",
      notes: "Love the character development",
      dailyGoal: 15,
      percentage: 100,
      lastUpdated: "2024-08-18T16:00:00.000Z"
    }
  },
  {
    id: generateId(),
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "978-0-06-231500-7",
    category: "Fiction",
    description: "A philosophical novel about a young shepherd's journey to find treasure and discover his personal legend.",
    publishedYear: 1988,
    pages: 163,
    coverUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    status: "finished",
    rating: 4,
    review: "Inspiring and thought-provoking. A beautiful allegory about following your dreams.",
    dateAdded: new Date(Date.now() - 950400000).toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 163,
      startDate: "2024-07-15",
      targetDate: "2024-07-25",
      notes: "Simple yet profound",
      dailyGoal: 20,
      percentage: 100,
      lastUpdated: "2024-07-23T14:00:00.000Z"
    }
  },
  {
    id: generateId(),
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "978-0-7352-1129-2",
    category: "Self-Help",
    description: "A practical guide to building good habits and breaking bad ones through small, incremental changes.",
    publishedYear: 2018,
    pages: 320,
    coverUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
    status: "currently-reading",
    dateAdded: new Date(Date.now() - 1036800000).toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 180,
      startDate: "2024-12-10",
      targetDate: "2024-12-30",
      notes: "Very practical advice",
      dailyGoal: 16,
      percentage: 56,
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: generateId(),
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    isbn: "978-0-307-45454-1",
    category: "Mystery",
    description: "A gripping thriller about a journalist and a hacker investigating a wealthy family's dark secrets.",
    publishedYear: 2005,
    pages: 590,
    coverUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    status: "want-to-read",
    dateAdded: new Date(Date.now() - 1123200000).toISOString(),
    series: "Millennium",
    seriesNumber: 1,
    borrowingHistory: []
  },
  {
    id: generateId(),
    title: "Educated",
    author: "Tara Westover",
    isbn: "978-0-399-59050-4",
    category: "Biography",
    description: "A memoir about a woman who grows up in a survivalist family and eventually earns a PhD from Cambridge.",
    publishedYear: 2018,
    pages: 334,
    coverUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
    status: "finished",
    rating: 5,
    review: "Powerful and moving. An incredible story of education and self-discovery.",
    dateAdded: new Date(Date.now() - 1209600000).toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 334,
      startDate: "2024-06-01",
      targetDate: "2024-06-20",
      notes: "Incredible resilience",
      dailyGoal: 18,
      percentage: 100,
      lastUpdated: "2024-06-18T20:00:00.000Z"
    }
  },
  {
    id: generateId(),
    title: "The Midnight Library",
    author: "Matt Haig",
    isbn: "978-0-525-55948-1",
    category: "Fiction",
    description: "A novel about a library between life and death where you can experience the lives you could have lived.",
    publishedYear: 2020,
    pages: 288,
    coverUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    status: "want-to-read",
    dateAdded: new Date(Date.now() - 1296000000).toISOString(),
    borrowingHistory: []
  },
  {
    id: generateId(),
    title: "Becoming",
    author: "Michelle Obama",
    isbn: "978-1-5247-6313-8",
    category: "Biography",
    description: "The memoir of former First Lady Michelle Obama, chronicling her life from childhood to the White House.",
    publishedYear: 2018,
    pages: 448,
    coverUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
    status: "finished",
    rating: 5,
    review: "Inspiring and beautifully written. Michelle Obama's story is truly remarkable.",
    dateAdded: new Date(Date.now() - 1382400000).toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 448,
      startDate: "2024-05-01",
      targetDate: "2024-05-25",
      notes: "Inspiring leadership",
      dailyGoal: 20,
      percentage: 100,
      lastUpdated: "2024-05-23T19:00:00.000Z"
    }
  },
  {
    id: generateId(),
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    isbn: "978-1-5011-3981-2",
    category: "Fiction",
    description: "A reclusive Hollywood icon finally decides to give her life story to an unknown journalist.",
    publishedYear: 2017,
    pages: 400,
    coverUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    status: "currently-reading",
    dateAdded: new Date(Date.now() - 1468800000).toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 250,
      startDate: "2024-12-20",
      targetDate: "2025-01-10",
      notes: "Captivating storytelling",
      dailyGoal: 20,
      percentage: 63,
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: generateId(),
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    isbn: "978-0-7352-1909-0",
    category: "Fiction",
    description: "A mystery and coming-of-age story about a girl who raised herself in the marshes of North Carolina.",
    publishedYear: 2018,
    pages: 384,
    coverUrl: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
    status: "finished",
    rating: 4,
    review: "Beautiful nature writing combined with an engaging mystery.",
    dateAdded: new Date(Date.now() - 1555200000).toISOString(),
    borrowingHistory: [],
    readingProgress: {
      currentPage: 384,
      startDate: "2024-04-01",
      targetDate: "2024-04-20",
      notes: "Beautiful descriptions of nature",
      dailyGoal: 20,
      percentage: 100,
      lastUpdated: "2024-04-18T17:00:00.000Z"
    }
  },
  {
    id: generateId(),
    title: "The Silent Patient",
    author: "Alex Michaelides",
    isbn: "978-1-2501-3018-5",
    category: "Thriller",
    description: "A psychological thriller about a woman who refuses to speak after allegedly murdering her husband.",
    publishedYear: 2019,
    pages: 336,
    coverUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg",
    status: "want-to-read",
    dateAdded: new Date(Date.now() - 1641600000).toISOString(),
    borrowingHistory: []
  }
];