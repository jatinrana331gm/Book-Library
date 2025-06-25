import React from 'react';
import { Clock, User, Calendar, RotateCcw, FileText } from 'lucide-react';

const BorrowingHistory = ({ books }) => {
  const allBorrowingRecords = books.flatMap(book => 
    book.borrowingHistory.map(record => ({
      ...record,
      bookTitle: book.title,
      bookAuthor: book.author
    }))
  ).sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime());

  if (allBorrowingRecords.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Borrowing History</h3>
        <p className="text-gray-500">Start borrowing books to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Borrowing History</h2>
      
      <div className="space-y-3">
        {allBorrowingRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-gray-900 mr-2">{record.bookTitle}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    record.returnDate 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {record.returnDate ? 'Returned' : 'Currently Borrowed'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">by {record.bookAuthor}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>Borrowed by: <span className="font-medium">{record.borrowerName}</span></span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Borrowed: {new Date(record.borrowDate).toLocaleDateString()}</span>
                  </div>
                  
                  {record.returnDate && (
                    <div className="flex items-center text-gray-600">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      <span>Returned: {new Date(record.returnDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {record.returnDate && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Duration: {Math.ceil((new Date(record.returnDate).getTime() - new Date(record.borrowDate).getTime()) / (1000 * 60 * 60 * 24))} days</span>
                    </div>
                  )}
                </div>
                
                {record.notes && (
                  <div className="mt-3 flex items-start text-gray-600 text-sm">
                    <FileText className="w-4 h-4 mr-2 mt-0.5" />
                    <span>{record.notes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowingHistory;