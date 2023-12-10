import { useEffect } from "react"; //*para controlar ciclo de vida (componen mount, component dismount, etc..)
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogById, removeSelectedDog } from "../../Redux/Actions";
import defaultDog from "../../Utils/DogShadow.jpg";
import "./Detail.style.css";

function Detail() {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  // const { name,weightMin, weightMax, heightMin, heightMax, life_span, temperament, reference_image_id  } = useSelector((state) => state.dogSelected);
  
  
  useEffect(() => {
    dispatch(getDogById(id));
    return () => {
      //limpiar el store cuando se desmonte
      dispatch(removeSelectedDog())
      console.log("dogById", dogById);
    }
  }, [id, dispatch]);
  
  const dogById = useSelector((state) => state.dogSelected);
  if (!dogById || Object.keys(dogById).length === 0) {
    return <p>Loading...</p>; 
  }

  return (
    
    <div className="DetailCard">
      <button className="DetailButton" onClick={() => window.history.back()}></button>
      
    
          <h2>{dogById.name}</h2>
          <div>
            {dogById.reference_image_id && (
              <img
              className="imageDetail"
              src={dogById.reference_image_id}
              alt={dogById.name}
              onError={(e) => {
                e.target.src = defaultDog; // Cambia la fuente de la imagen en caso de error
              }}
              />
              )}
          </div>
          <div>
            <h2>{dogById.id}</h2>
            <p>weightMin: {dogById.weightMin}</p>
            <p>weightMax: {dogById.weightMax}</p>
            <p>heightMin: {dogById.heightMin}</p>
            <p>heightMax: {dogById.heightMax}</p>
            <p>life_span: {dogById.life_span}</p>
            <p>Temperamento: {dogById.temperament}</p>
          </div>
      
    </div>
    )
  }

export default Detail;
