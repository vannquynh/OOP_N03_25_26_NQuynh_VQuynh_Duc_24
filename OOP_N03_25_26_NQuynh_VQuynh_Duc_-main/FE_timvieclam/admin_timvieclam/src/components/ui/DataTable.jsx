import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const DataTable = ({
  data = [],
  columns = [],
  resourceName,
  onDelete,
  isLoading = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 5;
  
  // Sort the data if sortField is set
  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' 
      ? aValue - bValue 
      : bValue - aValue;
  });
  
  // Paginate the data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };
  
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No {resourceName} found.</p>
      </div>
    );
  }
  
  return (
    <div className="card animate-fade-in overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table min-w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.field}
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => column.sortable !== false && handleSort(column.field)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {sortField === column.field && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((item) => (
              <tr 
                key={item.id || item.ma_loai_viec} 
                className="transition-colors hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td 
                    key={`${item.id || item.ma_loai_viec}-${column.field}`} 
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.field === 'gioi_thieu' ? (
                      // Render HTML content from CKEditor
                      <div
                        dangerouslySetInnerHTML={{ __html: item[column.field] }}
                        className="text-gray-700 text-sm"
                      />
                    ) : column.render ? (
                      column.render(item)
                    ) : (
                      item[column.field]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      to={`/${resourceName}/edit/${item.id || item.ma_loai_viec || item.ma_viec_lam || item.ma_doanh_nghiep}`}
                      className="text-primary-600 hover:text-primary-800 transition-colors"
                    >
                      <FiEdit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => onDelete(item)}
                      className="text-error-600 hover:text-error-800 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(startIndex + itemsPerPage, data.length)}
              </span>{' '}
              of <span className="font-medium">{data.length}</span> results
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <FiChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
              // Show pages around current page
              let pageNum;
              const middle = 2;
              
              if (totalPages <= 5) {
                pageNum = index + 1;
              } else if (currentPage <= middle + 1) {
                pageNum = index + 1;
              } else if (currentPage >= totalPages - middle) {
                pageNum = totalPages - 4 + index;
              } else {
                pageNum = currentPage - middle + index;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === pageNum
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <FiChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;