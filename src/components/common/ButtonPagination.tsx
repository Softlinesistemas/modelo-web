interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
 
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleSelectedPage = (page: number) => {
    onPageChange(page);
  };

  const renderPages = () => {
    const pages = [];
  
    // Previous page button
    pages.push(
      <li key="previous-page">
        <button
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white-medium border border-e-0 border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
        </button>
      </li>
    );
  
    // Cálculo da faixa de páginas (máx. 5)
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
  
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <li key={page}>
          <div
            className={`select-none cursor-pointer flex items-center justify-center px-3 h-8 leading-tight ${page === currentPage ? 'text-blue-600 border border-blue-300 bg-blue-50' : 'text-gray-500 border border-gray-300 bg-white'} hover:bg-gray-100 hover:text-gray-700`}
            onClick={() => handleSelectedPage(page)}
          >
            {page}
          </div>
        </li>
      );
    }
  
    // Next page button
    pages.push(
      <li key="next-page">
        <button
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white-medium border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Next</span>
          <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
        </button>
      </li>
    );
  
    return pages;
  };  

  return (
    <nav aria-label="Page navigation example" className="mb-3 mt-3">
      <ul className={`flex items-center ${totalPages > 5 ? '-space-x-px h-10 text-base' : '-space-x-px h-8 text-sm'}`}>
        {renderPages()}
      </ul>
    </nav>
  );
}

export default Pagination;
