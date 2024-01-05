const regexlife_span = /^\d{1,2}\s*-\s*\d{1,2}$/;
const regexName =  /^[A-Za-z\s]*$/;;

const validation = (inputs, frontErrors, setFrontErrors) => {
  let newfrontErrors = {...frontErrors};

  const {
    name,
    weightMin,
    weightMax,
    heightMin,
    heightMax,
    life_span,
  } = inputs;

  if (!name) {
    newfrontErrors.name = "Name is required";
  } else if (name && !regexName.test(name)) {
    newfrontErrors.name = "Name can´t contain symbols or numbers"; 
  } else if (name.length > 20) {
    newfrontErrors.name = "Name exceeds the allowed character limit";
  } else {
    newfrontErrors.name = "";
  }

  if (weightMin.trim() === "") {
    newfrontErrors.weightMin = ""; 
  } else if (!Number(weightMin)) {
    newfrontErrors.weightMin = "WeightMin must be a number";
  } else if (!Number.isInteger(parseFloat(weightMin))) {
    newfrontErrors.weightMin = "WeightMin must be an integer";
  } else if (parseFloat(weightMin) < 1 || parseFloat(weightMin) > 50) {
    newfrontErrors.weightMin = "WeightMin must be between 1kg and 50kg";
  } else {
    newfrontErrors.weightMin = "";
  }


  if (weightMax.trim() === "") {
    newfrontErrors.weightMax = ""; 
  } else if (!Number(weightMax)) {
    newfrontErrors.weightMax = "WeightMax must be a number";
  } else if (!Number.isInteger(parseFloat(weightMax))) {
    newfrontErrors.weightMax = "WeightMax must be an integer";
  } else if (parseFloat(weightMax) < 2 || parseFloat(weightMax) > 80) {
    newfrontErrors.weightMax = "WeightMax must be between 2kg and 80kg";
  } else if (Number(weightMin) >= Number(weightMax)){
    newfrontErrors.weightMax = "WeightMax can`t be less than WeightMin";
  } else {
    newfrontErrors.weightMax = "";
  }

  if (heightMin.trim() === "") {
    newfrontErrors.heightMin = ""; 
  } else if (!Number(heightMin)) {
    newfrontErrors.heightMin = "HeightMin must be a number";
  } else if (!Number.isInteger(parseFloat(heightMin))) {
    newfrontErrors.heightMin = "HeightMin must be an integer";
  } else if (parseFloat(heightMin) > 90 || parseFloat(heightMin) < 20) {
    newfrontErrors.heightMin = "HeightMin must be between 20cm and 90cm";
  } else {
    newfrontErrors.heightMin = "";
  }


  if (heightMax.trim() === "") {
    newfrontErrors.heightMax = ""; 
  } else if (!Number(heightMax)) {
    newfrontErrors.heightMax = "HeightMax must be a number";
  } else if (!Number.isInteger(parseFloat(heightMax))) {
    newfrontErrors.heightMax = "HeightMax must be an integer";
  } else if (parseFloat(heightMax) > 150 || parseFloat(heightMax) < 1) {
    newfrontErrors.heightMax = "HeightMax must be between 1cm and 150cm";
  } else if (Number(heightMin) >= Number(heightMax)) {
    newfrontErrors.heightMax = "HeightMax cannot be less than HeightMin";
  } else {
    newfrontErrors.heightMax = "";
  }

  if (life_span.trim() === "") {
    newfrontErrors.life_span = ""; 
  } else if (life_span && !regexlife_span.test(life_span)) {
    newfrontErrors.life_span = "Life span must have the format '5 - 40'";
  } else {
    newfrontErrors.life_span = "";
  }

  setFrontErrors({ ...frontErrors, ...newfrontErrors });
};
export default validation;
