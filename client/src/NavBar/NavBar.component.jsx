import "./NavBar.style.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { getAllDogs } from "../../src/Redux/Actions";

function NavBar({handleChange, handleSubmit}) {

  const history = useHistory();
  const dispatch = useDispatch();

  const handleButtonGoToForm = () => {
    history.push("/form");
  }

  const handleInputFocus = () => {
    dispatch(getAllDogs());
  };

  //* -----------------------FILTROS ------------------------------

  return (
    <div className="NavBar">
      <form className="SearchBar"onSubmit={(e) => handleSubmit(e)} >
        <input
          type="search"
          placeholder="  Search Breeds"
          className="NavBarInput"
          onFocus={handleInputFocus}
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
