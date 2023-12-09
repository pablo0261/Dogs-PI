import "./NavBar.style.css";

function NavBar({handleChange, handleSubmit}) {
  return (
    <div className="NavBar">
      <form className="SearchBar"onSubmit={(e) => handleSubmit(e)} >
        <button type="submit" className="NavBarButton" >Search</button>
        <input
          type="search"
          placeholder="  Search Breeds"
          className="NavBarInput"
          onChange={(e) => handleChange(e)}
        />
      </form>
      <div className="DivfilterButton">
        <button className="FilterButton">Filtro</button>
        <button className="FilterButton">Filtro</button>
        <button className="FilterButton">Filtro</button>
        <button className="FilterButton">Filtro</button>
      </div>
      <div></div>
    </div>
  );
}

export default NavBar;
