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

  const errorsFromBack = useSelector((state) => state.errorsBack);
  const temperaments = useSelector((state) => state.allTemperaments);
  const [localErrors, setLocalErrors] = useState({});
  const [temperamentsList, setTemperamentsList] = useState(false);
  const formFields = [
    { label: "Name", name: "name", type: "text", placeholder: "Name" },
    { label: "Weight Min", name: "weightMin", type: "text", placeholder: "0" },
    { label: "Weight Max", name: "weightMax", type: "text", placeholder: "0" },
    { label: "Height Min", name: "heightMin", type: "text", placeholder: "0cm"},
    { label: "Height Max", name: "heightMax", type: "text", placeholder: "0cm"},
    { label: "Life span", name: "life_span", type: "text", placeholder: "1 - 6"},
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
    setInputs((prevInputs) => ({
      ...prevInputs,
      temperaments: prevInputs.temperaments.filter(
        (temp) => temp !== deleteTemp
      ),
    }));
  };

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
    let value = event.target.value.trim();
    setInputs({ ...inputs, [property]: value });
    validation({ ...inputs, [property]: value }, localErrors, setLocalErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = Object.values(localErrors).some((error) => error !== "");

    if (hasErrors) {
      alert("Please fill in all the required fields correctly.");
    } else {
      dispatch(postDogs(inputs))
        .then(() => {
          alert("The Breed was successfully created");
        })
        .then(() => {
          window.location.reload();;
        })
        .catch((error) => {
          console.log(error.error);
          if (error.error) {
            alert(error.error);
          } else {
            alert("It wasn't possible to create the new Breed");
          }
          console.error("Error creating dog:", error);
        });
    }
  };

  return (
    <div className="background">
      <form className="Form" onSubmit={handleSubmit}>
        <div className="DivButtonTittle">
          <button
            type="button"
            className="DetailButtonForm"
            onClick={() => window.history.back()}
          ></button>
          <button
            type="button"
            className="ReloadButton"
            onClick={() => window.location.reload()}
          ></button>
          <h1 className="DetailTittle">Create your Breed</h1>
        </div>
        <div className="ContainerDivInput">
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
              <div className="ErrorMessage">{localErrors[field.name]}</div>
            </div>
          ))}


          <div
            className="FormDivInputTemp"
            onMouseLeave={handleMouseLeave}
          >
            <label className="FormLavelTemp">Temperament</label>
            <input
              className="InputsTemp"
              type="text"
              name="temperaments"
              value={inputs.temperaments}
              onChange={handleSelect}
              onBlur={() => handleDeleteTemps()}
              placeholder="Select temperaments"
              onMouseEnter={handleMouseEnter}
            
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
            <div className="ErrorMessage">{localErrors.temperaments}
            </div>
          </div>
        </div>
        {Object.values(localErrors).every((error) => error === "") &&
          Object.values(inputs).some((value) => value === "") && (
            <button className="ButtonFomr"  type="submit">
              Send
            </button>
          )}
      </form>
    </div>
  );
}

export default Form;
