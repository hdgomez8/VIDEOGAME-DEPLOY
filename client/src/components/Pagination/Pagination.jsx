import React, { useEffect, useMemo } from 'react';
import style from "./Pagination.module.css"

const Pagination = ({ totalVideoGames, pageSize, currentPage, onPageChange }) => {
  const totalPages = useMemo(() => Math.ceil(totalVideoGames / pageSize), [totalVideoGames, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [currentPage, totalPages, onPageChange]);

  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [totalPages]);

  return (
    <div className={style.paginationContainer}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${style.pageNumber} ${currentPage === number ? style.active : ''}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
