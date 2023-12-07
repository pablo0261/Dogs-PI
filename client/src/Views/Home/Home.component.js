import { useEffect } from "react";//*para controlar ciclo de vida (componen mount, component dismount, etc..)
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../Redux/Actions";

import "./Home.style.css"
import Cards from "../../Cards/Cards.component";
import NavBar from "../../NavBar/NavBar.component";


function Home() {

  const dispatch = useDispatch()
  const AllDogs = useSelector((state) => state.allDogs) //* aqui suscribi Home a ese estado global.
  console.log("State:", useSelector((state) => state));
useEffect(() => {// useEffet toma un cb y un arr de dependencias que indica en que momento quiero que se veuelva a ejecutar
  dispatch(getAllDogs())},[dispatch]
  // return (() => { //este return es para definir que quiero que suceda cuando se desmonta.
  //   clearDetail()//por ejemplo limpiar el estado cuando se pasa al page detail
  // })
)
console.log("AllDogs:", AllDogs); 

const imageUrl = "client/public/image/DogShadow.jpg"
  return (
    <div className="Home">
      <div className="HomeContainerTitle">
      <h1 className="HomeTitle">Dog Breeds</h1>
      </div>
      <NavBar/>
      <Cards AllDogs={AllDogs}/>
    </div>
  );
}

export default Home;
