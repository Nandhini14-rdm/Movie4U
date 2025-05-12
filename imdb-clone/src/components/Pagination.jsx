import React from "react";

function Pagination({ page, setPage, totalPages }) {
  const goToPrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const goToNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="bg-gray-400 p-4 mt-8 flex justify-center gap-6 items-center rounded">
      <button
        className="px-4 py-2 bg-white rounded hover:bg-gray-200 disabled:opacity-50"
        onClick={goToPrev}
        disabled={page === 1}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <span className="font-bold text-lg">
        {page} / {totalPages}
      </span>

      <button
        className="px-4 py-2 bg-white rounded hover:bg-gray-200 disabled:opacity-50"
        onClick={goToNext}
        disabled={page === totalPages}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
