import "./Pagination.style.css";

const Paginate = ({
  paginado,
  nextPage,
  previousPage,
  currentPage,
  pageNumbers,
}) => {
  const pagesToDisplay = Array.from({ length: pageNumbers }, (_, index) => index + 1)
  .filter(page => page >= Math.max(currentPage - 2, 1) && page <= Math.min(currentPage + 2, pageNumbers));

  return (
    <nav className="navPaginate">
      <ul className="ulPaginate">
        {currentPage > 1 && <button className="ButtonToEnd" onClick={() => paginado(1)}>first</button>}
        {currentPage > 1 && <button className="ButtonToEnd" onClick={previousPage}>prev</button>}

        {pagesToDisplay.map((number) => {
          return (
            <li className="liPaginate" key={number}>
              <button
                className={`paginateButton ${
                  number === currentPage ? "activePage" : ""
                }`}
                onClick={() => paginado(number)}
              >
                {number }
              </button>
            </li>
          );
        })}
        {pageNumbers > currentPage && <button className="ButtonToEnd" onClick={nextPage}>next</button>}
        {pageNumbers > currentPage && (
          <button className="ButtonToEnd"  onClick={() => paginado(pageNumbers)}>last</button>
        )}
      </ul>
    </nav>
  );
};

export default Paginate;
