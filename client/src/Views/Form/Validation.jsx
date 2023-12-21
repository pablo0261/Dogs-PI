const regexlife_span = /^\d{1,2}\s*-\s*\d{1,2}$/;

const validation = (inputs, errors, setErrors) => {
  let newErrors = {...errors};

  const {
    name,
    weightMin,
    weightMax,
    heightMin,
    heightMax,
    life_span,
  } = inputs;

  if (!name) {
    newErrors.name = "Name is required.";
  } else if (name.length > 20) {
    newErrors.name = "Name exceeds the allowed character limit.";
  } else {
    newErrors.name = "";
  }

  if (weightMin.trim() === "") {
    newErrors.weightMin = ""; 
  } else if (!Number(weightMin)) {
    newErrors.weightMin = "WeightMin must be a number.";
  } else if (!Number.isInteger(parseFloat(weightMin))) {
    newErrors.weightMin = "WeightMin must be an integer.";
  } else if (parseFloat(weightMin) < 1 || parseFloat(weightMin) > 50) {
    newErrors.weightMin = "WeightMin is invalid, it must be between 1kg and 50kg.";
  } else {
    newErrors.weightMin = "";
  }


  if (weightMax.trim() === "") {
    newErrors.weightMax = ""; 
  } else if (!Number(weightMax)) {
    newErrors.weightMax = "WeightMax must be a number.";
  } else if (!Number.isInteger(parseFloat(weightMax))) {
    newErrors.weightMax = "WeightMax must be an integer.";
  } else if (parseFloat(weightMax) < 2 || parseFloat(weightMax) > 80) {
    newErrors.weightMax = "WeightMax is invalid, it must be between 2kg and 80kg.";
  } else if (weightMin >= weightMax){
    newErrors.weightMax = "WeightMax cannot be less than WeightMin.";
  } else {
    newErrors.weightMax = "";
  }

  if (heightMin.trim() === "") {
    newErrors.heightMin = ""; 
  } else if (!Number(heightMin)) {
    newErrors.heightMin = "HeightMin must be a number.";
  } else if (!Number.isInteger(parseFloat(heightMin))) {
    newErrors.heightMin = "HeightMin must be an integer.";
  } else if (parseFloat(heightMin) > 90 || parseFloat(heightMin) < 20) {
    newErrors.heightMin = "HeightMin must be between 20cm and 90cm";
  } else {
    newErrors.heightMin = "";
  }


  if (heightMax.trim() === "") {
    newErrors.heightMax = ""; 
  } else if (!Number(heightMax)) {
    newErrors.heightMax = "HeightMax must be a number.";
  } else if (!Number.isInteger(parseFloat(heightMax))) {
    newErrors.heightMax = "HeightMax must be an integer.";
  } else if (parseFloat(heightMax) > 150 || parseFloat(heightMax) < 1) {
    newErrors.heightMax = "HeightMax must be between 1cm and 150cm";
  } else if (heightMin >= heightMax) {
    newErrors.heightMax = "HeightMax cannot be less than HeightMin.";
  } else {
    newErrors.heightMax = "";
  }

  if (life_span.trim() === "") {
    newErrors.life_span = ""; 
  } else if (life_span && !regexlife_span.test(life_span)) {
    newErrors.life_span = "Life span is invalid, it must have the format '5 - 40'.";
  } else {
    newErrors.life_span = "";
  }

  setErrors({ ...errors, ...newErrors });
};
export default validation;
