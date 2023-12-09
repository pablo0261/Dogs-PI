import { useEffect } from "react"; //*para controlar ciclo de vida (componen mount, component dismount, etc..)
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllDogs } from "../../Redux/Actions";

import "./Home.style.css";
import Cards from "../../Cards/Cards.component";
import NavBar from "../../NavBar/NavBar.component";

function Home() {
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState("");
  // const [random, serRandom] = useState([])
  const [searchString, setSearchString] = useState("");
  const [initialSearch, setInitialSearch] = useState(false);
  let errorMessage = "";
  const allDogs = useSelector((state) => state.allDogs); //* aqui suscribi Home a ese estado global.
  
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
      setInitialSearch(true);
    } catch (error) {
      console.error(error.message);
      // Set an error message for the user
      // setErrorMessage("No dog breeds found with the specified name");
      setFiltered("")
    }
  };

  const getRandomDogs = () => {
    const shuffledDogs = [...allDogs].sort(() => Math.random() -
    0.5);
    return shuffledDogs.slice(0, 8);
    }
  const randomDogs = initialSearch ? [] : getRandomDogs();

  useEffect(() => {
    dispatch(getAllDogs())
  }, [dispatch]);

  return (
    <div className="Home">
      <div className="HomeContainerTitle">
        <h1 className="HomeTitle">Dog Breeds</h1>
      </div>
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}

      <Cards AllDogs={filtered.length > 0 ? filtered : randomDogs} />
    </div>
  );
  }

export default Home;
