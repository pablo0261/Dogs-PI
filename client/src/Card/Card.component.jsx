import "./Card.style.css";
import { Link } from "react-router-dom";
import defaultDog from "../Utils/DogShadow.jpg";
import {DETAIL} from "../Helper";

function Card(props) {
  const { id, name, reference_image_id, temperament, weightMin, weightMax } =
    props.dog;
  const imageUrl = reference_image_id;

  

  return (
    <div className="CardContainer" >
       <Link to={`dogs/${id}`}>
      <img
        className="CardImage"
        src={imageUrl}
        alt={name}
        onError={(e) => {
          e.target.src = defaultDog; // Cambia la fuente de la imagen en caso de error
        }}
      />
      <h1 className="CardName">{name}</h1>
      </Link>
      <div className="CardWeightContainer">
        <p className="weightTitle">Weight</p>
        <div className="CardWeights">
          <p> Min: {weightMin} kg</p>
          <p> Max: {weightMax} kg</p>
        </div>
        <div className="CardTempContainer">
          <p className="TempTitle">Temperament</p>
          <div className="CardTemperament">
            <p >{temperament}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
