const regexlife_span = /^\d{1,2}\s*-\s*\d{1,2}$/;
const regexTemperaments = /^(?:\b\w{3}\b(?:, )?)+$/;

const validation = (inputs, errors, setErrors) => {
  let newErrors = errors;

  const { name, weightMin, weightMax, heightMin, heightMax, life_span, temperaments } = inputs;

  if (!name) {
    newErrors.name = "Name is required.";
  } else if (name.length > 20) {
    newErrors.name = "Name exceeds the allowed character limit.";
  } else {
    newErrors.name = "";
  }

  if (!Number(weightMin) || !Number.isInteger(weightMin)) {
    newErrors.weightMin = "WeightMin must be an integer.";
  } else if (weightMin < 1 || weightMin > 50) {
    newErrors.weightMin = "WeightMin is invalid, it must be between 1 and 50.";
  } else {
    newErrors.weightMin = "";
  }

  if (!Number(weightMax) || !Number.isInteger(weightMax)) {
    newErrors.weightMax = "WeightMax must be an integer.";
  } else if (weightMax < 2 || weightMax > 80) {
    newErrors.weightMax = "WeightMax is invalid, it must be between 2 and 80.";
  } else {
    newErrors.weightMax = "";
  }

  if (!Number(heightMin) || !Number.isInteger(heightMin)) {
    newErrors.heightMin = "HeightMin must be an integer.";
  } else if (heightMin > 90 || heightMin < 20)
    newErrors.heightMin = "HeightMin is invalid.";
  else newErrors.heightMin = "";

  if (!Number(heightMax) || !Number.isInteger(heightMax)) {
    newErrors.weightMax = "HeightMax must be an integer.";
  } else if  (heightMax > 150 || heightMax < 1)
    newErrors.heightMax = "HeightMax is invalid.";
  else newErrors.heightMax = "";

  if (life_span && !regexlife_span.test(life_span))
    newErrors.life_span =
    "Life span is invalid, it must have the format '5 - 40'.";
  else newErrors.life_span = "";

  if (temperaments && !regexTemperaments.test(temperaments))
    newErrors.temperaments =
    "Temperaments are invalid, it must have the format 'temperament' or 'temperament1, temperament2, temperament3'.";
  else newErrors.life_span = "";

  setErrors(newErrors);
};
export default validation;
