import "./Home.style.css"
import Cards from "../../Cards/Cards.component";
import SearchBar from "../../SearchBar/SearchBar.component";


function Home() {
  return (
    <div className="Home">
      <h1>Esta es la Home Page</h1>
      <SearchBar/>
      <Cards/>

    </div>
  );
}

export default Home;
