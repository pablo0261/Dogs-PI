import "./Cards.style.css"
import Card from "../Card/Card.component";

function Cards({AllDogs}) {

  return (
    <div className="CardsList">
      {Array.isArray(AllDogs) ? (
  AllDogs.map((dog) => <Card key={dog.id} dog={dog} />)
) : (
  <p className="CardsError">No dog breeds found with that name</p>
)}
    </div>
  );
}

export default Cards;

