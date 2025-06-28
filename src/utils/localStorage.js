const STORAGE_KEY = 'books';

export const loadBooks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading books from localStorage:', error);
    return [];
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
    coverUrl: "https://m.media-amazon.com/images/I/81cXIf1Q0QL._SL1500_.jpg",
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
    coverUrl: "https://i.pinimg.com/originals/8e/14/43/8e14438380e37a10b3e5e4bb65b76015.jpg",
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
    coverUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b468d093312907.5e6139cf2ab03.png",
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
    coverUrl: "https://tse1.mm.bing.net/th?id=OIP.WIlTXUUOYa6nqscRw9Gx6AHaKn&pid=Api&P=0&h=180",
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
    coverUrl: "https://cdn.kobo.com/book-images/a3fb0737-8700-49ff-a4bf-3af6734ddbbd/1200/1200/False/the-art-of-war-with-an-introduction-by-nigel-cawthorne.jpg",
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
  },
  {
    id: generateId(),
    title: "Educated",
    author: "Tara Westover",
    isbn: "978-0-399-59050-4",
    category: "Memoir",
    description: "A memoir about a woman who grows up in a survivalist family and eventually escapes to learn about the world through education.",
    publishedYear: 2018,
    pages: 334,
    coverUrl: "https://m.media-amazon.com/images/I/81WojUxbbFL._SL1500_.jpg",
    status: "borrowed",
    dateAdded: new Date(Date.now() - 86400000 * 10).toISOString(),
    borrowingHistory: [
      {
        id: generateId(),
        borrowerName: "Ravi Mehta",
        borrowDate: new Date(Date.now() - 86400000 * 3).toISOString(),
        notes: "Inspirational read"
      }
    ]
  },
  {
    id: generateId(),
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    isbn: "978-0-06-245771-4",
    category: "Self-Help",
    description: "A refreshing self-help book that argues that life’s struggles give it meaning.",
    publishedYear: 2016,
    pages: 224,
    coverUrl: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._SL1500_.jpg",
    status: "available",
    dateAdded: new Date(Date.now() - 86400000 * 7).toISOString(),
    borrowingHistory: []
  },
  {
    id: generateId(),
    title: "Brave New World",
    author: "Aldous Huxley",
    isbn: "978-0-06-085052-4",
    category: "Science Fiction",
    description: "A prophetic novel envisioning a future society driven by technology, consumerism, and genetic engineering.",
    publishedYear: 1932,
    pages: 288,
    coverUrl: "https://m.media-amazon.com/images/I/81VStYnDGrL._SL1500_.jpg",
    status: "available",
    dateAdded: new Date(Date.now() - 86400000 * 6).toISOString(),
    borrowingHistory: []
  },
  {
  id: generateId(),
  title: "Astrophysics for People in a Hurry",
  author: "Neil deGrasse Tyson",
  isbn: "978-0-393-60939-4",
  category: "Science",
  description: "A beginner-friendly guide to astrophysics from one of the world's most famous scientists.",
  publishedYear: 2017,
  pages: 224,
  coverUrl: "https://bestbookbits.com/wp-content/uploads/2019/03/Astrophysics-for-People-in-a-Hurry.-800x450.png",
  status: "available",
  dateAdded: new Date(Date.now() - 86400000 * 4).toISOString(),
  borrowingHistory: []
},
{
  id: generateId(),
  title: "The Design of Everyday Things",
  author: "Don Norman",
  isbn: "978-0-465-06710-7",
  category: "Design",
  description: "A classic book on human-centered design that has influenced generations of designers.",
  publishedYear: 1988,
  pages: 368,
  coverUrl: "https://m.media-amazon.com/images/I/81zpLhP1gWL._SL1500_.jpg",
  status: "available",
  dateAdded: new Date(Date.now() - 86400000 * 8).toISOString(),
  borrowingHistory: []
},
{
  id: generateId(),
  title: "The Lean Startup",
  author: "Eric Ries",
  isbn: "978-0-307-88789-4",
  category: "Business",
  description: "A startup guide to creating fast, efficient businesses that can scale sustainably.",
  publishedYear: 2011,
  pages: 336,
  coverUrl: "https://m.media-amazon.com/images/I/81-QB7nDh4L._SL1500_.jpg",
  status: "available",
  dateAdded: new Date(Date.now() - 86400000 * 11).toISOString(),
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Thinking, Fast and Slow",
  author: "Daniel Kahneman",
  isbn: "978-0-374-53355-7",
  category: "Psychology",
  description: "A Nobel laureate explains the dual systems that drive the way we think—fast and intuitive vs slow and rational.",
  publishedYear: 2011,
  pages: 499,
  coverUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1391839047i/20751483._UY630_SR1200,630_.jpg",
  status: "available",
  dateAdded: new Date(Date.now() - 86400000 * 14).toISOString(),
  borrowingHistory: []
},
{
  id: generateId(),
  title: "How to Win Friends and Influence People",
  author: "Dale Carnegie",
  isbn: "978-0-671-02703-2",
  category: "Communication",
  description: "A timeless guide on how to improve social skills and influence others in business and life.",
  publishedYear: 1936,
  pages: 288,
  coverUrl: "https://rukminim1.flixcart.com/image/1408/1408/book/3/4/0/how-to-win-friends-and-influence-people-original-imadhwfcewvduvvh.jpeg?q=90",
  status: "available",
  dateAdded: new Date(Date.now() - 86400000 * 18).toISOString(),
  borrowingHistory: []
},
{
  id: generateId(),
  title: "The Painter's Soul",
  author: "Lena Ross",
  isbn: "978-0-00-348395",
  category: "Art",
  description: "A vibrant exploration of expression through colors, styles, and emotion.",
  publishedYear: 1960,
  pages: 201,
  coverUrl: "https://m.media-amazon.com/images/I/81DhNg0IsQL._SY466_.jpg",
  status: "available",
  dateAdded: "2025-06-04T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Little Wonders",
  author: "Ellie Thompson",
  isbn: "978-0-00-665616",
  category: "Children",
  description: "An enchanting storybook for curious young minds filled with wonder.",
  publishedYear: 2008,
  pages: 494,
  coverUrl: "https://static.wixstatic.com/media/e3fc8d_483a21d3f2b14f23ac56cd140361f798~mv2.png/v1/fill/w_1080,h_1100,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/spiral-notebook-mockup-standing-on-a-transparent-surface-a15060%20(3).png",
  status: "available",
  dateAdded: "2025-06-12T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Curtains Rise",
  author: "Sam Blake",
  isbn: "978-0-00-198348",
  category: "Drama",
  description: "A powerful script about love, betrayal, and redemption on stage and off.",
  publishedYear: 2010,
  pages: 302,
  coverUrl: "https://m.media-amazon.com/images/I/712jDLd2NjL._SY466_.jpg",
  status: "available",
  dateAdded: "2025-06-22T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Echoes of the Past",
  author: "Laura Bennett",
  isbn: "978-0-00-858360",
  category: "History",
  description: "A detailed narrative chronicling pivotal global historical events.",
  publishedYear: 1962,
  pages: 338,
  coverUrl: "https://images.playground.com/0af02752-5787-4f5b-9134-3c7db16c6e80.jpeg",
  status: "available",
  dateAdded: "2025-06-07T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Whispers in the Dark",
  author: "David Clark",
  isbn: "978-0-00-824823",
  category: "Horror",
  description: "A chilling horror tale that lingers in your mind long after it's over.",
  publishedYear: 2005,
  pages: 385,
  coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1404479025i/1069489.jpg",
  status: "available",
  dateAdded: "2025-06-01T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Locked Room",
  author: "Nancy Holt",
  isbn: "978-0-00-307722",
  category: "Mystery",
  description: "A detective unravels an impossible murder case with clever twists.",
  publishedYear: 1974,
  pages: 416,
  coverUrl: "https://d20ohkaloyme4g.cloudfront.net/img/document_thumbnails/97565133e2e2cf160fca276a2d878590/thumb_1200_850.png",
  status: "available",
  dateAdded: "2025-06-16T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Unwritten Paths",
  author: "Mira Voss",
  isbn: "978-0-00-488764",
  category: "Other",
  description: "A unique story that doesn't fit conventional genres, yet deeply resonates.",
  publishedYear: 1990,
  pages: 433,
  coverUrl: "https://m.media-amazon.com/images/I/51HD6U0e8CL._SY466_.jpg",
  status: "available",
  dateAdded: "2025-05-29T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Roses & Letters",
  author: "Olivia Hart",
  isbn: "978-0-00-991102",
  category: "Poetry",
  description: "A heartfelt collection of poems on love, loss, and life’s beauty.",
  publishedYear: 2003,
  pages: 213,
  coverUrl: "https://cdn.pixabay.com/photo/2017/03/29/09/10/book-2184568_1280.jpg",
  status: "available",
  dateAdded: "2025-06-03T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Grounded Hearts",
  author: "Emily Rivers",
  isbn: "978-0-00-399883",
  category: "Romance",
  description: "An emotional journey through love, heartbreak, and second chances.",
  publishedYear: 1999,
  pages: 376,
  coverUrl: "https://m.media-amazon.com/images/I/716-dXtBI2L._SY522_.jpg",
  status: "available",
  dateAdded: "2025-06-10T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Shadow Run",
  author: "Ken Drake",
  isbn: "978-0-00-215784",
  category: "Thriller",
  description: "A fast-paced thriller where a journalist uncovers a deadly secret.",
  publishedYear: 2016,
  pages: 344,
  coverUrl: "https://tse3.mm.bing.net/th?id=OIP.xRagDBKq-R19nMxPZgbV_AHaJd&pid=Api&P=0&h=180",
  status: "available",
  dateAdded: "2025-06-14T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Crimson Moon",
  author: "Sophie King",
  isbn: "978-0-00-815437",
  category: "Young Adult",
  description: "A coming-of-age adventure filled with fantasy and friendship.",
  publishedYear: 2015,
  pages: 312,
  coverUrl: "http://www.silverdaggertours.com/uploads/8/2/5/5/82557464/953862483.jpg",
  status: "available",
  dateAdded: "2025-06-05T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Beyond the Stars",
  author: "Alan Chen",
  isbn: "978-0-00-991888",
  category: "Science",
  description: "An accessible look into space exploration and the cosmos.",
  publishedYear: 2020,
  pages: 298,
  coverUrl: "https://m.media-amazon.com/images/I/9104n88b-7L._SL1500_.jpg",
  status: "available",
  dateAdded: "2025-06-08T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "Wired Minds",
  author: "Greg Sanders",
  isbn: "978-0-00-212345",
  category: "Technology",
  description: "How AI, robotics, and innovation are reshaping the modern world.",
  publishedYear: 2022,
  pages: 362,
  coverUrl: "https://m.media-amazon.com/images/I/61f0P3yOzdL._SY466_.jpg",
  status: "available",
  dateAdded: "2025-06-06T14:08:01.705Z",
  borrowingHistory: []
},
{
  id: generateId(),
  title: "The Bhagavad Gita",
  author: "Anonymous",
  isbn: "978-0-14-044918-1",
  category: "Religion",
  description: "A sacred Hindu scripture that presents a conversation between Prince Arjuna and Lord Krishna on duty, righteousness, and spirituality.",
  publishedYear: -200,
  pages: 240,
  coverUrl: "https://tse3.mm.bing.net/th?id=OIP.E2ndrBfA7QOmFJQOdzst8wHaNI&pid=Api&P=0&h=180",
  status: "available",
  dateAdded: new Date(Date.now() - 86400000 * 9).toISOString(),
  borrowingHistory: []
}


];
