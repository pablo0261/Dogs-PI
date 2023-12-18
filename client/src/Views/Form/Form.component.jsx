import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTemperaments, postDogs } from "../../Redux/Actions";
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
  const temperaments = useSelector((state) => state.allTemperaments);
  const [temperamentsList, setTemperamentsList] = useState(false);
  const formFields = [
    { label: "Name", name: "name", type: "text", placeholder: "Name" },
    { label: "weightMin", name: "weightMin", type: "text", placeholder: "0" },
    { label: "weightMax", name: "weightMax", type: "text", placeholder: "0" },
    { label: "heightMin", name: "heightMin", type: "text", placeholder: "0cm" },
    { label: "heightMax", name: "heightMax", type: "text", placeholder: "0cm" },
    { label: "life_span", name: "life_span", type: "text", placeholder: "1 - 6" },
  ];

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

  const handleDeleteTemps = (deleteTemp) => {
    const newTemperament = temperaments.filter(temp => temp !== deleteTemp)  
    setInputs((newTemperament) => ({
      ...inputs,
      temperaments: newTemperament,
    }));
    }

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handleSelect = (e) => {
    if (!inputs.temperaments.includes(e.target.value)) {
      setInputs({
        ...inputs,
        temperaments: [...inputs.temperaments, e.target.value],
      });
    }
  };

  const handleChange = (event) => {
    let property = event.target.name;
    let value = event.target.value;
    // console.log(property, value);
    setInputs({ ...inputs, [property]: value });
    validation({ ...inputs, [property]: value }, errors, setErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postDogs(inputs));
    alert("The dog was created");
  };

  return (
    <div>
      <button
        className="DetailButton"
        onClick={() => window.history.back()}
      ></button>
      <form onSubmit={handleSubmit}>
        <h1>Esta es la Form Page</h1>
        {formFields.map((field) => (
          <div key={field.name} className="FormDivInput">
            <label className="FormLavel">{field.label}</label>
            <input
              className="Inputs"
              type={field.type}
              name={field.name}
              value={inputs[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
            <div className="ErrorMessage">{errors[field.name]}</div>
          </div>
        ))}

        {/* -----  TEMPERAMENTS ------- */}

        <div
          className="FormDivInput"
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
            onBlur={handleDeleteTemps}
            placeholder="Select temperaments"
          />
          {temperamentsList && (
            <div className="TemperamentsList">
              {temperaments.map((temp) => (
                <span key={temp} onClick={() => handleTemperamentClick(temp)}>
                  {temp}
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
