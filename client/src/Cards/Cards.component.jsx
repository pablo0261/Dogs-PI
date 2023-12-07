import "./Cards.style.css"
import Card from "../Card/Card.component";

function Cards({AllDogs}) {//recibo por props de Home

  return (
    <div className="CardsList">
      {AllDogs?.map((dog) => {
      return <Card key={dog.id} dog={dog}/>
      })}
    </div>
  );
}

export default Cards;

