import "./NavBar.style.css"

function NavBar() {
  return (
    <div className="NavBar">
      <form className="SearchBar">
        <input type="text" placeholder="Search by ID" className="NavBarInput"/>
        <button className="NavBarButton">Search</button>
      </form>
      <div className="DivfilterButton">
        <button className="FilterButton">Filtro</button>
        <button className="FilterButton">Filtro</button>
        <button className="FilterButton">Filtro</button>
        <button className="FilterButton">Filtro</button>
      </div>
      <div>

      </div>
      
    </div>
  );
}

export default NavBar;

