import React, { useState } from 'react';
import { Download, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const ImportExportBooks = ({ books, onImport }) => {
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const exportToCSV = () => {
    const headers = [
      'Title',
      'Author',
      'ISBN',
      'Category',
      'Description',
      'Published Year',
      'Pages',
      'Status',
      'Rating',
      'Review',
      'Date Added',
      'Series',
      'Series Number'
    ];

    const csvData = books.map(book => [
      book.title || '',
      book.author || '',
      book.isbn || '',
      book.category || '',
      book.description || '',
      book.publishedYear || '',
      book.pages || '',
      book.status || '',
      book.rating || '',
      book.review || '',
      book.dateAdded || '',
      book.series || '',
      book.seriesNumber || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `my-library-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(books, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `my-library-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImporting(true);
    setImportResult(null);

    try {
      const text = await file.text();
      let importedBooks = [];

      if (file.name.endsWith('.json')) {
        importedBooks = JSON.parse(text);
      } else if (file.name.endsWith('.csv')) {
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        
        importedBooks = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',').map(v => v.replace(/"/g, '').trim());
            const book = {};
            
            headers.forEach((header, index) => {
              const value = values[index] || '';
              switch (header.toLowerCase()) {
                case 'title':
                  book.title = value;
                  break;
                case 'author':
                  book.author = value;
                  break;
                case 'isbn':
                  book.isbn = value;
                  break;
                case 'category':
                  book.category = value;
                  break;
                case 'description':
                  book.description = value;
                  break;
                case 'published year':
                  book.publishedYear = value ? parseInt(value) : undefined;
                  break;
                case 'pages':
                  book.pages = value ? parseInt(value) : undefined;
                  break;
                case 'status':
                  book.status = value || 'want-to-read';
                  break;
                case 'rating':
                  book.rating = value ? parseInt(value) : undefined;
                  break;
                case 'review':
                  book.review = value;
                  break;
                case 'series':
                  book.series = value;
                  break;
                case 'series number':
                  book.seriesNumber = value ? parseInt(value) : undefined;
                  break;
              }
            });
            
            // Add required fields
            book.id = Math.random().toString(36).substr(2, 9);
            book.dateAdded = new Date().toISOString();
            book.borrowingHistory = [];
            
            return book;
          });
      }

      // Validate imported books
      const validBooks = importedBooks.filter(book => book.title && book.author);
      
      if (validBooks.length > 0) {
        onImport(validBooks);
        setImportResult({
          success: true,
          message: `Successfully imported ${validBooks.length} books`,
          total: importedBooks.length,
          valid: validBooks.length
        });
      } else {
        setImportResult({
          success: false,
          message: 'No valid books found in the file'
        });
      }
    } catch (error) {
      setImportResult({
        success: false,
        message: `Error importing file: ${error.message}`
      });
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <FileText className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Import & Export</h3>
      </div>

      {/* Export Section */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Export Your Library</h4>
        <div className="flex gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as CSV
          </button>
          <button
            onClick={exportToJSON}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as JSON
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Export your entire library for backup or sharing. CSV format is compatible with spreadsheet applications.
        </p>
      </div>

      {/* Import Section */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Import Books</h4>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 mb-2">
            Import books from CSV or JSON files
          </p>
          <label className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            {importing ? 'Importing...' : 'Choose File'}
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFileImport}
              disabled={importing}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: CSV, JSON
          </p>
        </div>

        {/* Import Result */}
        {importResult && (
          <div className={`mt-4 p-4 rounded-lg ${
            importResult.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              {importResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              )}
              <p className={`text-sm font-medium ${
                importResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {importResult.message}
              </p>
            </div>
            {importResult.success && importResult.total !== importResult.valid && (
              <p className="text-xs text-green-700 mt-1">
                {importResult.total - importResult.valid} books were skipped due to missing required fields (title or author).
              </p>
            )}
          </div>
        )}

        {/* CSV Format Guide */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-2">CSV Format Guide</h5>
          <p className="text-sm text-gray-600 mb-2">
            Your CSV file should include these columns (Title and Author are required):
          </p>
          <div className="text-xs text-gray-600 grid grid-cols-2 gap-1">
            <span>• Title*</span>
            <span>• Author*</span>
            <span>• ISBN</span>
            <span>• Category</span>
            <span>• Description</span>
            <span>• Published Year</span>
            <span>• Pages</span>
            <span>• Status</span>
            <span>• Rating</span>
            <span>• Review</span>
            <span>• Series</span>
            <span>• Series Number</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExportBooks;