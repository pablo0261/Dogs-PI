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
import NavBar from "../../NavBar/NavBar.component";
import Dogs from "../../Dogs/Dogs"
import Paginate from "../../Pagination/Pagination";
import Cards from "../../Cards/Cards.component";

function Home() {
  console.log("Renderizando Home");
  const [filtered, setFiltered] = useState(""); //* contiene el resultado de la busqueda de search
  const [searchString, setSearchString] = useState(""); //*contiene lo que se escribe en el search
  const [selectedTemperaments, setSelectedTemperaments] = useState([]); //*estado para mostrar los temp seleccionados
  // const [originalAllDogs, setOriginalAllDogs] = useState([]);//*para manejar allDogs y no perder su info original

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const createDogs = useSelector((state) => state.createDogs);//! este rcreo que solo lo usa form
  const temperaments = useSelector((state) => state.allTemperaments);
  const dogSelected = useSelector((state) => state.dogSelected);
  let errorMessage = "";//! ver si lo necesito aqui

  //*--- PARA ENVIAR A MODULO DOG --- //
  const dogsResult =
    (filtered.length > 0 && filtered) ||
    (dogSelected.length > 0 && dogSelected) ||
    allDogs;

  //* --- PAGINADO---//
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const [pageLimit, setPageLimit] = useState(1);
  const indexPageFirstDog = currentPage * dogsPerPage;
  const indexFirstDog = indexPageFirstDog - dogsPerPage;
  const currentDogs = dogsResult.slice(indexFirstDog, indexPageFirstDog);
  const pageNumbers = Math.ceil(dogsResult.length / dogsPerPage);

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

  //* --- PAGINADO---//

  useEffect(() => {
    console.log("Obteniendo todos los perros");
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const resetAll = (e) => {
    e.preventDefault();
    console.log("Obteniendo todos los perros");
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
    // console.log("searchString:", e.target.value);
  };

  const handleSubmit = (e) => {
    //*Filtro x nombre
    setCurrentPage(1);
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
      } else {
        setFiltered(filteredDogs);
      }
    } catch (error) {
      console.error(error.message);
      setFiltered("");
    }
  };

  const handleOrder = (e) => {
    //*Orden alfabetico dogs

    dispatch(orderDogs(e.target.value));
    // setOrden(`Ordenado ${e.target.value}`)
    setCurrentPage(1);
  };

  const handlerFilterW = (e) => {
    //*Orden x peso dogs
    dispatch(filterByW(e.target.value));
    // setOrden(`Ordenado ${e.target.value}`)
    setCurrentPage(1);
  };

  const handlerFilterOrigin = (e) => {
    //* Filtro x origen
    dispatch(FilterOriginDog(e.target.value));
    setCurrentPage(1);
  };


  useEffect(() => {
    // Función para manejar el filtrado cuando selectedTemperaments cambia
    const handleFilterByTemp = () => {
      dispatch(FilterByTemp(selectedTemperaments));
    };

    // Ejecutar la función de filtrado cuando selectedTemperaments cambia
    handleFilterByTemp();
  }, [selectedTemperaments, dispatch]);

  const handlerFilterTemp = (e) => {
    e.preventDefault();
    const selectedTemp = e.target.value;
    setCurrentPage(1);
    if (!selectedTemperaments.includes(selectedTemp)) {
      // Actualiza el estado de los temperamentos seleccionados
      setSelectedTemperaments([...selectedTemperaments, selectedTemp]);
    }
    console.log(selectedTemperaments)
    dispatch(FilterByTemp(selectedTemperaments));
  };

  const handleRemoveTemperament = (deleteTemp) => {
    const updatedTemperaments = selectedTemperaments.filter(
      (temp) => temp !== deleteTemp
    );
    setSelectedTemperaments(updatedTemperaments);
    dispatch(FilterByTemp(updatedTemperaments));
  };

  return (
    <div className="Home">
      <div className="HomeContainerTitle">
        <h1 className="HomeTitle">Dog Breeds</h1>
      </div>

      <NavBar
        paginado={paginado}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}
      {allDogs.length ? (
        <div>
          <Dogs
            handleOrder={handleOrder}
            handlerFilterW={handlerFilterW}
            handlerFilterOrigin={handlerFilterOrigin}
            handlerFilterTemp={handlerFilterTemp}
            temperaments={temperaments}
            handleRemoveTemperament={handleRemoveTemperament}
            selectedTemperaments={selectedTemperaments}
            resetAll = {resetAll}
          />
          <Paginate
            pageNumbers={pageNumbers}
            getPages={getPages}
            currentPage={currentPage}
            nextPage={nextPage}
            previousPage={previousPage}
            dogsPerPage={dogsPerPage}
            dogsResult={dogsResult.length}
            paginado={paginado}
          />
          {dogSelected.notFound ? (
            <p className="NotFoundMessage">No dogs were found with those temperaments</p>
          ) : (
            <Cards AllDogs={currentDogs} />
          )}
          <Paginate
            pageNumbers={pageNumbers}
            getPages={getPages}
            currentPage={currentPage}
            nextPage={nextPage}
            previousPage={previousPage}
            dogsPerPage={dogsPerPage}
            dogsResult={dogsResult.length}
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
