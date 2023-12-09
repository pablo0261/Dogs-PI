import "./Cards.style.css"
import Card from "../Card/Card.component";

function Cards({AllDogs}) {//recibo por props de Home

  return (
    <div className="CardsList">
      {Array.isArray(AllDogs) ? (
  AllDogs.map((dog) => <Card key={dog.id} dog={dog} />)
) : (
  <p className="CardsError">No breed identified</p>
)}
    </div>
  );
}

export default Cards;

