import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  orderDogs,
  filterByW,
  getAllTemperaments,
  FilterByTemp,
  FilterOriginDog,
  resetAll,
  postDogs,
} from "../../Redux/Actions";
import "./Home.style.css";
import Cards from "../../Cards/Cards.component";
import NavBar from "../../NavBar/NavBar.component";
import { all } from "axios";

function Home() {
  const [filtered, setFiltered] = useState("");//* contiene el resultado de la busqueda de search
  const [searchString, setSearchString] = useState("");//*contiene lo que se escribe en el search
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);//*estado para mostrar los temp seleccionados
  // const [originalAllDogs, setOriginalAllDogs] = useState([]);//*para manejar allDogs y no perder su info original


  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const createDogs = useSelector((state) => state.createDogs);
  const temperaments = useSelector((state) => state.allTemperaments);
  const dogSelected = useSelector((state) => state.dogSelected);
  let errorMessage = "";
  // const [inputs, setInputs] = useState({
  //   Temps: [],
  // });

  // console.log(createDogs);

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
  }, [dispatch]);


  const handleChange = (e) => {
    setSearchString(e.target.value);
    // console.log("searchString:", e.target.value);
  }; 

  const handleSubmit = (e) => {//*Filtro x nombre
    
    // console.log("searchString:", searchString);
    e.preventDefault();
    try {
      const filteredDogs = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(searchString.toLowerCase())
      );
      if (filteredDogs.length === 0) {
        throw new Error("No dog breeds found with that name.");
       } 
       if (searchString.trim() === "") {
        setFiltered("");
      }else{
        setFiltered(filteredDogs);
      }
    } catch (error) {
      console.error(error.message);
      setFiltered("");
    }
  };

  const handleOrder = (e) => { //*Orden alfabetico dogs
   
    dispatch(orderDogs(e.target.value));
    // setOrden(`Ordenado ${e.target.value}`)
  };

  const handlerFilterW = (e) => {//*Orden x peso dogs
    dispatch(filterByW(e.target.value));
    // setOrden(`Ordenado ${e.target.value}`)
  };

  const handlerFilterOrigin = (e) => {//* Filtro x origen
    dispatch(FilterOriginDog(e.target.value));
  };

  const handlerFilterTemp = (e) => {
    e.preventDefault();
    const selectedTemp = e.target.value;
    dispatch(FilterByTemp(e.target.value));
    if (!selectedTemperaments.includes(selectedTemp)) {
      // Actualiza el estado de los temperamentos seleccionados
      setSelectedTemperaments([...selectedTemperaments, selectedTemp]);
    }
  };
  console.log(dogSelected)

  const handleRemoveTemperament = (deleteTemp) => {
    const updatedTemperaments = selectedTemperaments.filter(
      (temp) => temp !== deleteTemp
    );
    setSelectedTemperaments(updatedTemperaments);
  };

  return (
    <div className="Home">
      <div className="HomeContainerTitle">
        <h1 className="HomeTitle">Dog Breeds</h1>
      </div>
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}

      <div className="DivfilterButton">
        <select
          className="OrderButton"
          onChange={(event) => handleOrder(event)}
        >
          <option>Order by Name</option>
          <option key={1} value="A-Z">
            A-Z
          </option>
          <option key={2} value="Z-A">
            Z-A
          </option>
        </select>

        <select className="OrderButton" onChange={(e) => handlerFilterW(e)}>
          <option>Order by Weight</option>
          <option key={1} value="weightMax">
            Max
          </option>
          <option key={2} value="weightMin">
            Min
          </option>
        </select>

        <select
          className="OrderButton"
          onChange={(e) => handlerFilterOrigin(e)}
        >
          <option>Order by Origin</option>
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

        <select className="OrderButton" onChange={(e) => handlerFilterTemp (e)} >
          <option>Temperaments</option>
          <option
            key={1}
            value="All"
          >
            All
          </option>
          {temperaments.map((temp) => (
            <option
              value={temp}
              key={temp}
            >
              {temp}
            </option>
          ))}
        </select>
        <div className="SelectedTemperamentsContainer">
  {selectedTemperaments.map((temp) => (
    <div key={temp} className="SelectedTemperament">
      {temp}
      <button onClick={() => handleRemoveTemperament(temp)}>X</button>
    </div>
  ))}
</div>
      </div>

      <Cards 
  AllDogs={
    (filtered.length > 0 && filtered) ||
    (dogSelected.length > 0 && dogSelected) ||
    allDogs
  }
/>
    </div>
  );
}

export default Home;
