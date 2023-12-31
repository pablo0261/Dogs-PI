import { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getDogById } from "../../Redux/Actions";
import defaultDog from "../../Utils/DogShadow.jpg";
import "./Detail.style.css";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDogById(id));
  }, []);

  const handleGoBack = () => {
    history.goBack();
  };
  
  const dogById = useSelector((state) => state.dogSelected);
  if (!dogById || Object.keys(dogById).length === 0) {
    return <p>Loading...</p>;
  }


  return (
    <div className="Background">
      <div className="DetailCard">
        <div className="ButtonTittle">
          <button className="DetailButton" onClick={handleGoBack}></button>
          <h2 className="ContainernameDetail">{dogById[0].name}</h2>
        </div>
        <div className="DivDetail">
          <div className="ImageDetail">
            {dogById[0].reference_image_id && (
              <img
                className="Image"
                src={dogById[0].reference_image_id}
                alt={dogById[0].name}
                onError={(e) => {
                  e.target.src = defaultDog;
                }}
              />
            )}
          </div>
          <div className="DatosDetail">
            <div className="DivInfo">
              <p> ID:</p>
              <p className="DatoBox">{dogById[0].id}</p>
            </div>
            <div className="DivInfo">
              <p> Weight Min:</p>
              <p className="DatoBox">{dogById[0].weightMin}</p>
            </div>
            <div className="DivInfo">
              <p> Weight Max:</p>
              <p className="DatoBox">{dogById[0].weightMax}</p>
            </div>
            <div className="DivInfo">
              <p> Height Min:</p>
              <p className="DatoBox"> {dogById[0].heightMin}</p>
            </div>
            <div className="DivInfo">
              <p> Height Max: </p>
              <p className="DatoBox">{dogById[0].heightMax}</p>
            </div>
            <div className="DivInfo">
              <p> Life span: </p>
              <p className="DatoBox"> {dogById[0].life_span}</p>
            </div>
            <div className="DivInfoDown">
              <p className="TittleInfoDown"> Temperamento </p>
              <p className="DatoBox"> {dogById[0].temperament}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
