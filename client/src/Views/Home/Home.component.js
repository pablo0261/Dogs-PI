import "./Home.style.css"
import Cards from "../../Cards/Cards.component";
import NavBar from "../../NavBar/NavBar.component";


function Home() {
  return (
    <div className="Home">
      <h1 className="HomeTitle">Home</h1>
      <NavBar/>
      <Cards/>

    </div>
  );
}

export default Home;
