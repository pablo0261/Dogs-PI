import { useEffect } from "react"; //*para controlar ciclo de vida (componen mount, component dismount, etc..)
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllDogs } from "../../Redux/Actions";
import { orderDogs } from "../../Redux/Actions";

import "./Home.style.css";
import Cards from "../../Cards/Cards.component";
import NavBar from "../../NavBar/NavBar.component";

function Home() {
  const [filtered, setFiltered] = useState("");
  const [searchString, setSearchString] = useState("");
  // const [orden, setOrden] = useState("")
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs); //* aqui suscribi Home a ese estado global.
  let errorMessage = "";

  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
    // console.log("searchString:", e.target.value);
  };

  const handleSubmit = (e) => {
    // console.log("searchString:", searchString);
    e.preventDefault();
    try {
      // console.log("Datos de perros disponibles:", allDogs);
      const filteredDogs = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(searchString.toLowerCase())
      );
      if (filteredDogs.length === 0) {
        throw new Error("No dog breeds found with that name.");
      }
      // console.log("Perros filtrados:", filteredDogs);
      setFiltered(filteredDogs);
    } catch (error) {
      console.error(error.message);
      setFiltered("");
    }
  };


  const handleOrder = (e) => {
    dispatch(orderDogs(e.target.value));
    // setOrden(`Ordenado ${e.target.value}`)
  };
  

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);


  return (
    <div className="Home">
      <div className="HomeContainerTitle">
        <h1 className="HomeTitle">Dog Breeds</h1>
      </div>
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}

      <div className="DivfilterButton">
        <select className="OrderButton" onChange={(event) => handleOrder(event)}>
          <option >
            Order by name
          </option>
          <option key={1} value="A-Z">
            A-Z
          </option>
          <option key={2} value="Z-A">
            Z-A
          </option>
        </select>
      </div>

      <Cards AllDogs={filtered.length > 0 ? filtered : allDogs} />
    </div>
  );
}

export default Home;
