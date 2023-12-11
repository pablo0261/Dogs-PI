import "./NavBar.style.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function NavBar({handleChange, handleSubmit}) {

  const history = useHistory();
  

  const handleButtonGo = () => {
    history.push("/form");
  }

  //* -----------------------FILTROS ------------------------------

  

  // const handleFilter = (e) => {
  //   dispatch(filterCards(e.target.value));
  // };

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
        <button className="FilterButton">Filtro</button>
        <button type="submit" className="CreateDog" onClick={handleButtonGo}>
          Add Breeds
        </button>
      <div></div>
    </div>
  );
}

export default NavBar;
