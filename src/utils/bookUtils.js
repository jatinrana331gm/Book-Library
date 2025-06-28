export const filterBooks = (books, searchTerm, filters) => {
  return books.filter((book) => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category filter
    const matchesCategory = !filters.category || book.category === filters.category;

    // Status filter
    const matchesStatus = !filters.status || book.status === filters.status;

    // Year range filter
    const matchesYear = (!filters.yearRange.min || !book.publishedYear || book.publishedYear >= parseInt(filters.yearRange.min)) &&
                       (!filters.yearRange.max || !book.publishedYear || book.publishedYear <= parseInt(filters.yearRange.max));

    // Page range filter
    const matchesPages = (!filters.pageRange.min || !book.pages || book.pages >= parseInt(filters.pageRange.min)) &&
                        (!filters.pageRange.max || !book.pages || book.pages <= parseInt(filters.pageRange.max));

    // Rating filter
    const matchesRating = !filters.rating || (book.rating && book.rating >= parseInt(filters.rating));

    return matchesSearch && matchesCategory && matchesStatus && matchesYear && matchesPages && matchesRating;
  });
};

export const sortBooks = (books, sortBy) => {
  const sortedBooks = [...books];

  switch (sortBy) {
    case 'title-asc':
      return sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
    case 'author-asc':
      return sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    case 'author-desc':
      return sortedBooks.sort((a, b) => b.author.localeCompare(a.author));
    case 'year-desc':
      return sortedBooks.sort((a, b) => (b.publishedYear || 0) - (a.publishedYear || 0));
    case 'year-asc':
      return sortedBooks.sort((a, b) => (a.publishedYear || 0) - (b.publishedYear || 0));
    case 'pages-desc':
      return sortedBooks.sort((a, b) => (b.pages || 0) - (a.pages || 0));
    case 'pages-asc':
      return sortedBooks.sort((a, b) => (a.pages || 0) - (b.pages || 0));
    case 'date-added-desc':
      return sortedBooks.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    case 'date-added-asc':
      return sortedBooks.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    case 'rating-desc':
      return sortedBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'rating-asc':
      return sortedBooks.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    default:
      return sortedBooks;
  }
};

export const getReadingStats = (books) => {
  const currentYear = new Date().getFullYear();
  
  const stats = {
    total: books.length,
    wantToRead: books.filter(b => b.status === 'want-to-read').length,
    currentlyReading: books.filter(b => b.status === 'currently-reading').length,
    finished: books.filter(b => b.status === 'finished').length,
    available: books.filter(b => b.status === 'available').length,
    borrowed: books.filter(b => b.status === 'borrowed').length,
    
    // This year stats
    finishedThisYear: books.filter(b => 
      b.status === 'finished' && 
      b.readingProgress?.startDate && 
      new Date(b.readingProgress.startDate).getFullYear() === currentYear
    ).length,
    
    pagesThisYear: books.reduce((total, book) => {
      if (book.status === 'finished' && 
          book.readingProgress?.startDate && 
          new Date(book.readingProgress.startDate).getFullYear() === currentYear) {
        return total + (book.pages || 0);
      }
      return total;
    }, 0),
    
    averageRating: books.filter(b => b.rating).length > 0 
      ? books.filter(b => b.rating).reduce((sum, b) => sum + b.rating, 0) / books.filter(b => b.rating).length
      : 0
  };

  return stats;
};