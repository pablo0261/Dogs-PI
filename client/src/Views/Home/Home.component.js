import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  filterDogsByTemp,
  getAllTemperaments,
} from "../../Redux/Actions";
import "./Home.style.css";
import NavBar from "../../NavBar/NavBar.component";
import Dogs from "../../Dogs/Dogs";
import Paginate from "../../Pagination/Pagination";
import Cards from "../../Cards/Cards.component";
import fondo1 from "../../Utils/TituloBreedFinder.png";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const temperaments = useSelector((state) => state.allTemperaments);
  const dogSelected = useSelector((state) => state.dogSelected);
  const errorsFront = useSelector((state) => state.errorsFront);
  const filterByTemp = useSelector((state) => state.filterByTemp);
  const flagFilterByTemp = useSelector((state) => state.flagFilterByTemp);
  const [filtered, setFiltered] = useState("");
  const [flagFiltered, setFlagFiltered] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("Obteniendo todos los perros");
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterDogsByTemp(selectedTemperaments));
  }, [selectedTemperaments]);

  // //*logica filtro combiando
  let dogSelect;
  const filteredByTemp = flagFilterByTemp
    ? dogSelected.filter((dog) => filterByTemp.includes(dog))
    : dogSelected;

  dogSelect = flagFiltered
    ? filtered
    : filteredByTemp.length > 0
    ? filteredByTemp
    : dogSelected.length === 0
    ? allDogs
    : filterByTemp;

  errorMessage =
    filteredByTemp.length === 0 && selectedTemperaments.length > 0
      ? errorsFront
      : flagFiltered && filtered.length === 0
      ? errorsFront
      : "";

  //* --- PAGINADO---//
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const [pageLimit, setPageLimit] = useState(1);
  const indexPageFirstDog = currentPage * dogsPerPage;
  const indexFirstDog = indexPageFirstDog - dogsPerPage;
  const currentDogs = dogSelect.slice(indexFirstDog, indexPageFirstDog);
  const pageNumbers = Math.ceil(dogSelect.length / dogsPerPage);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const previousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const getPages = () => {
    const start = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
    return new Array(Math.min(pageNumbers, pageLimit))
      .fill()
      .map((_, i) => start + i);
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
    dispatch(getAllDogs());
  };

  const handleSubmit = (e) => {
    setCurrentPage(1);
    e.preventDefault();
    setSelectedTemperaments([]);
    try {
      const filteredDogs = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(searchString.toLowerCase())
      );
      if (searchString.trim() === "") {
        setFlagFiltered(false);
        setFiltered("");
      } else if (filteredDogs.length === 0) {
        setFlagFiltered(true);
        setFiltered("");
        console.log("filteredDogs:", filteredDogs);
      } else {
        setFlagFiltered(true);
        setFiltered(filteredDogs);
      }
    } catch (error) {
      console.error(error.message);
      setFlagFiltered(false);
      setFiltered("");
    }
  };

  return (
    <div className="Home">
      <div className="HomeContainerTitle">
        <div>
          <img src={fondo1} className="HomeTitle" alt="Add Breeds" />
        </div>
      </div>
      <NavBar
        paginado={paginado}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {allDogs.length ? (
        <div>
          <Dogs
            temperaments={temperaments}
            selectedTemperaments={selectedTemperaments}
            setSelectedTemperaments={setSelectedTemperaments}
            setCurrentPage={setCurrentPage}
          />
          {errorsFront.length > 0 && (
            <p className="ErrorMessageHome">{errorsFront}</p>
          )}
          <Cards AllDogs={currentDogs} className="HomeCards" />
          <Paginate
            pageNumbers={pageNumbers}
            getPages={getPages}
            currentPage={currentPage}
            nextPage={nextPage}
            previousPage={previousPage}
            dogsPerPage={dogsPerPage}
            dogsResult={dogSelected.length}
            paginado={paginado}
          />
        </div>
      ) : (
        <div className="divLoading">
          <h1>LOADING...</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
