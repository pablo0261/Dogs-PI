import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Dogs.style.css";


const Dogs = ({
  handleOrder,
  handlerFilterW,
  handlerFilterOrigin,
  handlerFilterTemp,
  temperaments,
  handleRemoveTemperament,
  selectedTemperaments,
  resetAll,
}) => {
  const errorsFront = useSelector((state) => state.errorsFront);
  const [localErrors, setLocalErrors] = useState({});
  const flagOrderAZ = useSelector((state) => state.flagOrderAZ);
  const flagOrderWeight = useSelector((state) => state.flagOrderWeight);
  const flagFilterByOrigin = useSelector((state) => state.flagFilterByOrigin);
  const flagFilterByTemp = useSelector((state) => state.flagFilterByTemp);

  useEffect(() => {
    setLocalErrors(errorsFront)
  },[errorsFront])
  return (
    <div className="DivfilterButton">
      {flagOrderAZ && <img src="/image/filtro.jpg" alt="Filtered" className="filtered"/>}
      <select className="OrderButton"  value="Order A-Z" onChange={(event) => handleOrder(event)}>
        <option disabled>Order A-Z</option>
        <option key={1} value="A-Z">
          A-Z
        </option>
        <option key={2} value="Z-A">
          Z-A
        </option>
      </select>
      
      {flagOrderWeight && <img src="/image/filtro.jpg" alt="Filtered" className="filtered"/>}
      <select className="OrderButton" value="Order by Weight" onChange={(e) => handlerFilterW(e)}>
        <option disabled>Order by Weight</option>
        <option key={1} value="weightMax">
          Max
        </option>
        <option key={2} value="weightMin">
          Min
        </option>
      </select>

      {flagFilterByOrigin && <img src="/image/filtro.jpg" alt="Filtered" className="filtered"/>}
      <select className="OrderButton" value="Filter by Origin" onBlur={resetAll} onChange={(e) => handlerFilterOrigin(e)}>
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

      {flagFilterByTemp && <img src="/image/filtro.jpg" alt="Filtered" className="filtered"/>}
      <select
        className="OrderButton" value="Filter by Temperament"
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
      {/* <div className="ErrorMessage">{localErrors.temperaments}</div>//!terminar el manejo de errores aca */}
      <div className="SelectedTemperamentsContainer">
        {selectedTemperaments.map((temp) => (
          <div key={temp} value={temp} className="SelectedTemperament">
            {temp}
            <button className="XButton" onClick={() => handleRemoveTemperament(temp)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dogs;
