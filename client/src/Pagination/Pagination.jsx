import "./Pagination.style.css";

const Paginate = ({
  paginado,
  nextPage,
  previousPage,
  currentPage,
  getPages,
  pageNumbers,
}) => {
  const pagesToDisplay = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ].filter((page) => page > 1 && page <= pageNumbers);

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
                {number - 1}
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
