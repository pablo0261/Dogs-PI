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
  errorsMessage,
}) => {
  
  const flagFilterByOrigin = useSelector((state) => state.flagFilterByOrigin);
  const flagFilterByTemp = useSelector((state) => state.flagFilterByTemp);

  return (
    <div className="DivfilterButton">
      <select className="OrderButton"  value="Order A-Z" onChange={(event) => handleOrder(event)}>
        <option disabled>Order A-Z</option>
        <option key={1} value="A-Z">
          A-Z
        </option>
        <option key={2} value="Z-A">
          Z-A
        </option>
      </select>
      
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
      <select className="OrderButton" value="Filter by Origin"  onChange={(e) => handlerFilterOrigin(e)}>
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
      <div className="SelectedTemperamentsContainer">
        {selectedTemperaments.map((temp) => (
          <div key={temp} value={temp} className="SelectedTemperament">
            {temp}
            <button className="XButton" onClick={() => handleRemoveTemperament(temp)}>X</button>
          </div>
        ))}
        <div>{errorsMessage}</div>
      </div>
    </div>
  );
};

export default Dogs;
