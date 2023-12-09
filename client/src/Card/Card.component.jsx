import "./Card.style.css";
import defaultDog from "../Utils/DogShadow.jpg";

function Card(props) {
  const { name, reference_image_id, temperament, weightMin, weightMax } =
    props.dog;
  const imageUrl = reference_image_id;

  const handleChange = () =>{

  } 

  return (
    <div className="CardContainer" onClick={handleChange}>
       {/* <Link to={`/detail/${id}`}> */}
      <img
        className="CardImage"
        src={imageUrl}
        alt={name}
        onError={(e) => {
          e.target.src = defaultDog; // Cambia la fuente de la imagen en caso de error
        }}
      />
      <h1 className="CardName">{name}</h1>
      {/* </Link> */}
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
