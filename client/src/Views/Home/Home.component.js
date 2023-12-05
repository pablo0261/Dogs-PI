import "./Home.style.css"
import Cards from "../../Cards/Cards.component";
import NavBar from "../../NavBar/NavBar.component";


function Home() {
  return (
    <div className="Home">
      <div className="HomeContainerTitle">
      <h1 className="HomeTitle">Dog Breeds</h1>
      </div>
      <NavBar/>
      <Cards/>

    </div>
  );
}

export default Home;
