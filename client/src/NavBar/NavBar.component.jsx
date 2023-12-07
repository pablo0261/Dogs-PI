import "./NavBar.style.css"

function NavBar() {
  return (
    <div className="NavBar">
      <form className="SearchBar">
        <button className="NavBarButton">Search</button>
        <input type="text" placeholder="  Search Breeds" className="NavBarInput"/>
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

