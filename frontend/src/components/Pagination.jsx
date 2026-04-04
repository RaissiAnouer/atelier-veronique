const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 px-6 py-5 border-t border-gray-100">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 rounded-sm transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded-sm transition-colors ${
            currentPage === page
              ? "bg-black text-white"
              : "text-gray-400 hover:text-black hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 rounded-sm transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
