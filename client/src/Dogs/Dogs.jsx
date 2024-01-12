import { useDispatch, useSelector } from "react-redux";
import "./Dogs.style.css";
import { orderDogs, filterByW, filterOriginDog } from "../../src/Redux/Actions";

const Dogs = ({
  temperaments,
  selectedTemperaments,
  setSelectedTemperaments,
  errorsMessage,
}) => {
  const dispatch = useDispatch();
  const flagFilterByOrigin = useSelector((state) => state.flagFilterByOrigin);
  const flagFilterByTemp = useSelector((state) => state.flagFilterByTemp);

  const handleOrder = (e) => {
    dispatch(orderDogs(e.target.value));
  };

  const handlerFilterW = (e) => {
    dispatch(filterByW(e.target.value));
  };

  const handlerFilterOrigin = (e) => {
    dispatch(filterOriginDog(e.target.value));
  };

  const handlerFilterTemp = (e) => {
    e.preventDefault();
    const selectedTemp = e.target.value;
    if (!selectedTemperaments.includes(selectedTemp)) {
      // Actualiza el estado de los temperamentos seleccionados
      setSelectedTemperaments((prevTemperaments) => [
        ...prevTemperaments,
        selectedTemp,
      ]);
    }
  };

  const handleRemoveTemperament = (deleteTemp) => {
    const updatedTemperaments = selectedTemperaments.filter(
      (temp) => temp !== deleteTemp
    );
    setSelectedTemperaments(updatedTemperaments);
  };

  return (
    <div className="DivfilterButton">
      <select
        className="OrderButton custom-selector"
        value="Order A-Z"
        onChange={(event) => handleOrder(event)}
      >
        <option disabled>Order A-Z</option>
        <option key={1} value="A-Z">
          A-Z
        </option>
        <option key={2} value="Z-A">
          Z-A
        </option>
      </select>

      <select
        className="OrderButton custom-selector"
        value="Order by Weight"
        onChange={(e) => handlerFilterW(e)}
      >
        <option disabled>Order by Weight</option>
        <option key={1} value="weightMax">
          Max
        </option>
        <option key={2} value="weightMin">
          Min
        </option>
      </select>

      {flagFilterByOrigin && (
        <img src="/image/filtro.jpg" alt="Filtered" className="filtered" />
      )}
      <select
        className="OrderButton custom-selector"
        value="Filter by Origin"
        onChange={(e) => handlerFilterOrigin(e)}
      >
        <option disabled>Filter by Origin</option>
        <option key={1} value="All">
          All
        </option>
        <option key={2} value="created">
          Created
        </option>
        <option key={3} value="Api">
          Api
        </option>
      </select>

      {flagFilterByTemp && (
        <img src="/image/filtro.jpg" alt="Filtered" className="filtered" />
      )}
      <select
        className="OrderButton custom-selector"
        value="Filter by Temperament"
        onChange={(e) => handlerFilterTemp(e)}
      >
        <option disabled>Filter by Temperament</option>
        <option key={1} value="All">
          All
        </option>
        {temperaments.map((temp) => (
          <option value={temp} key={temp}>
            {temp}
          </option>
        ))}
      </select>
      <div className="SelectedTemperamentsContainer">
        {selectedTemperaments.map((temp) => (
          <div key={temp} value={temp} className="SelectedTemperament">
            {temp}
            <button
              className="XButton"
              onClick={() => handleRemoveTemperament(temp)}
            >
              X
            </button>
          </div>
        ))}
        {<div className="ErrorMessage">{errorsMessage}</div>}
      </div>
    </div>
  );
};

export default Dogs;
