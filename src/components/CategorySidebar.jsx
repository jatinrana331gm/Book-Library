const categories = [
  'All', 'Fiction', 'Non-Fiction', 'Science', 'Technology',
  'Biography', 'History', 'Philosophy', 'Art', 'Religion',
  'Self-Help', 'Romance', 'Mystery', 'Fantasy', 'Science Fiction',
  'Horror', 'Thriller', 'Children', 'Young Adult', 'Poetry', 'Drama', 'Other'
];

export default function CategorySidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex flex-col gap-1 mt-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded transition
            ${selectedCategory === cat ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
