import { useState, useEffect } from 'react';
import { Dropdown, Pagination } from 'react-bootstrap';

const JobOfferPagination = ({ currentPage, changePage, changeSize }) => {

  const loadPage = (newPage) => {
    changePage(newPage)
  }


  return (
    <div>
      <Pagination >
        <Pagination.Prev onClick={() => loadPage((currentPage > 1) ? (currentPage - 1) : 1)} />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={() => loadPage(currentPage + 1)} />
      </Pagination>
    </div>
  )
}

export default JobOfferPagination;