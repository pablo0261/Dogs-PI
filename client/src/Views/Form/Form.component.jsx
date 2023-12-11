import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllTemperaments, postDogs} from "../../Redux/Actions"
import "./Form.style.css";
import validation from "./Validation";


function Form() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life_span: "",
    temperaments: [],
    image: "",
  });

  const [errors, setErrors] = useState({});
  const temperaments = useSelector((state) => state.allTemperaments)
  const [temperamentsList, setTemperamentsList] = useState(false);

  const handleMouseEnter = () => {
    setTemperamentsList(true);
  };

  const handleMouseLeave = () => {
    setTemperamentsList(false);
  };

  const handleTemperamentClick = (selectedTemperament) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      temperaments: [...prevInputs.temperaments, selectedTemperament],
    }));
  };

useEffect(() => {
  dispatch(getAllTemperaments())
}, [dispatch]);

const handleSelect = (e) => {
      if(!inputs.temperaments.includes(e.target.value)){
          setInputs({
              ...inputs,
              temperaments : [...inputs.temperaments, e.target.value]
          })
      }
}


const handleChange = (event) => {
    let property = event.target.name;
    let value = event.target.value;
    // console.log(property, value);
    setInputs({ ...inputs, [property]: value });
    validation({ ...inputs, [property]: value }, errors, setErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs)
    dispatch(postDogs(inputs))
    alert("The dog was created")
    setInputs({
      name: "",
      weightMin: 0,
      weightMax: 0,
      heightMin: 0,
      heightMax: 0,
      life_span: 0,
      temperaments: [],
    })
  }

  return (
    <div>
      <button
          className="DetailButton"
          onClick={() => window.history.back()}
        ></button>
    <form onSubmit={handleSubmit}>
      <h1>Esta es la Form Page</h1>
      <div className="FormDivInput">
        <label className="FormLavel"> Name</label>
        <input
          className="Inputs"
          type="text"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <div className="ErrorMessage">{errors.name}</div>
      </div>
      <div className="FormDivInput">
        <label className="FormLavel">weightMin</label>
        <input
          className="Inputs"
          type="text"
          name="weightMin"
          value={inputs.weightMin}
          onChange={handleChange}
          placeholder="0"
        />
        <div className="ErrorMessage">{errors.weightMin}</div>
      </div>
      <div className="FormDivInput">
        <label className="FormLavel">weightMax</label>
        <input
          className="Inputs"
          type="text"
          name="weightMax"
          value={inputs.weightMax}
          onChange={handleChange}
          placeholder="0"
        />
        <div className="ErrorMessage">{errors.weightMax}</div>
      </div>
      <div className="FormDivInput">
        <label className="FormLavel">heightMin</label>
        <input
          className="Inputs"
          type="text"
          name="heightMin"
          value={inputs.heightMin}
          onChange={handleChange}
          placeholder="0"
        />
        <div className="ErrorMessage">{errors.heightMin}</div>
      </div>
      <div className="FormDivInput">
        <label className="FormLavel">heightMax</label>
        <input
          className="Inputs"
          type="text"
          name="heightMax"
          value={inputs.heightMax}
          onChange={handleChange}
          placeholder="0"
        />
        <div className="ErrorMessage">{errors.heightMax}</div>
      </div>
      <div className="FormDivInput">
        <label className="FormLavel">life_span</label>
        <input
          className="Inputs"
          type="text"
          name="life_span"
          value={inputs.life_span}
          onChange={handleChange}
          placeholder="1 - 6"
        />
        <div className="ErrorMessage">{errors.life_span}</div>
      </div>

          {/* -----  TEMPERAMENTS ------- */}

          <div className="FormDivInput"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
          >
        <label className="FormLavel">Temperamento</label>
        <input
          className="Inputs"
          type="text"
          name="temperaments"
          value={inputs.temperaments}
          onChange={handleSelect}
          placeholder="Select temperaments"
        />
          {temperamentsList && (
          <div className="TemperamentsList">
            {temperaments.map((temp) => (
              <span key={temp} onClick={() => handleTemperamentClick(temp)} >
                {  temp  }
              </span>
            ))}
          </div>
        )}
        <div className="ErrorMessage">{errors.temperaments}</div>
      </div>

        {/* -----  IMAGEN ------- */}

      <div className="FormDivInput">
        <label className="FormLavelImage">Upload Image</label>
        <input
          className="Inputs"
          type="file"
          name="image"
          value={inputs.image}
          onChange={handleChange}
        />
        <div className="ErrorMessage">{errors.image}</div>
      </div>
      <button className="ButtonFomr" type="submit">
        Send
      </button>
    </form>
  </div>
  );
}

export default Form;
