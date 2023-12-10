import { useEffect } from "react"; //*para controlar ciclo de vida (componen mount, component dismount, etc..)
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogById, removeSelectedDog } from "../../Redux/Actions";
import defaultDog from "../../Utils/DogShadow.jpg";
import "./Detail.style.css";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { name,weightMin, weightMax, heightMin, heightMax, life_span, temperament, reference_image_id  } = useSelector((state) => state.dogSelected);
  // const dogById = useSelector((state) => state.dogById);

  useEffect(() => {
     dispatch(getDogById(id));
        
     return () => {
      //limpiar el store cuando se desmonte
      dispatch(removeSelectedDog())
    }
  }, [id, dispatch]);
console.log(getDogById(id))

  return (
    <div className="DetailCard">
      <button className="DetailButton" onClick={() => window.history.back()}></button>
      
      {Object.keys({ name, weightMin, weightMax, heightMin, heightMax, life_span, temperament, reference_image_id }).length > 0 && (
        <> 
          <h2>{name}</h2>
          <div>
            {reference_image_id && (
              <img
              className="imageDetail"
              src={reference_image_id}
              alt={name}
              onError={(e) => {
                e.target.src = defaultDog; // Cambia la fuente de la imagen en caso de error
              }}
              />
              )}
          </div>
          <div>
            <h2>{id}</h2>
            <p>weightMin: {weightMin}</p>
            <p>weightMax: {weightMax}</p>
            <p>heightMin: {heightMin}</p>
            <p>heightMax: {heightMax}</p>
            <p>life_span: {life_span}</p>
            <p>Temperamento: {temperament}</p>
          </div>
        </>
      )}
        {Object.keys({ name, weightMin, weightMax, heightMin, heightMax, life_span, temperament, reference_image_id }).length === 0 && <p>Loading...</p>}
    </div>
    )
}

export default Detail;
