import "./NavBar.style.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function NavBar({handleChange, handleSubmit}) {

  const history = useHistory();
  

  const handleButtonGoToForm = () => {
    history.push("/form");
  }

  //* -----------------------FILTROS ------------------------------

  

  // const handleFilter = (e) => {
  //   dispatch(filterCards(e.target.value));
  // };
  
  return (
    <div className="NavBar">
      <form className="SearchBar"onSubmit={(e) => handleSubmit(e)} >
        <input
          type="search"
          placeholder="  Search Breeds"
          className="NavBarInput"
          onChange={(e) => handleChange(e)}
        />
      <button type="submit" className="NavBarButton" >Search</button>
      </form>
        <button type="submit" className="CreateDog" onClick={handleButtonGoToForm}>
        </button>
    </div>
  );
}

export default NavBar;
