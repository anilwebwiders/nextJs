import ReactPaginate from "react-paginate";
import React from "react";

const Paginate = ({ pageCount, fetchData }) => {
  return (
    <div className="d-flex justify-content-center p-5">
      <ReactPaginate
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={5}
        pageRangeDisplayed={12}
        onPageChange={fetchData}
        subContainerClassName="pages pagination"
        disableInitialCallback={true}
        initialPage={0}
      />
    </div>
  );
};

export default Paginate;
