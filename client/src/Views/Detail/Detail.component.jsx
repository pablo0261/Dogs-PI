import { useEffect, useState } from "react"; 
import { useParams, useHistory } from "react-router-dom";
import defaultDog from "../../Utils/DogShadow.jpg";
import axios from "axios";
import "./Detail.style.css";

function Detail() {
  const { id } = useParams();
  const history = useHistory();
  const [DogDataId, setDogDataId] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);
        setDogDataId(response.data);
      } catch (error) {
      }
    };
    fetchData(); 
  }, [id]);

  const handleGoBack = () => {
    history.goBack();
  };
  
  if (!DogDataId || Object.keys(DogDataId).length === 0) {
    return <p>Loading...</p>;
  }


  return (
    <div className="Background">
      <div className="DetailCard">
        <div className="ButtonTittle">
          <button className="DetailButton" onClick={handleGoBack}></button>
          <h2 className="ContainernameDetail">{DogDataId.name}</h2>
        </div>
        <div className="DivDetail">
          <div className="ImageDetail">
            {DogDataId.reference_image_id && (
              <img
                className="Image"
                src={DogDataId.reference_image_id}
                alt={DogDataId.name}
                onError={(e) => {
                  e.target.src = defaultDog;
                }}
              />
            )}
          </div>
          <div className="DatosDetail">
            <div className="DivInfo">
              <p> ID:</p>
              <p className="DatoBox">{DogDataId.id}</p>
            </div>
            <div className="DivInfo">
              <p> Weight Min:</p>
              <p className="DatoBox">{DogDataId.weightMin}</p>
            </div>
            <div className="DivInfo">
              <p> Weight Max:</p>
              <p className="DatoBox">{DogDataId.weightMax}</p>
            </div>
            <div className="DivInfo">
              <p> Height Min:</p>
              <p className="DatoBox"> {DogDataId.heightMin}</p>
            </div>
            <div className="DivInfo">
              <p> Height Max: </p>
              <p className="DatoBox">{DogDataId.heightMax}</p>
            </div>
            <div className="DivInfo">
              <p> Life span: </p>
              <p className="DatoBox"> {DogDataId.life_span}</p>
            </div>
            <div className="DivInfoDown">
              <p className="TittleInfoDown"> Temperamento </p>
              <p className="DatoBox"> {DogDataId.temperament}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
