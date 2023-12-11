const regexlife_span = /^\d{1,2}\s*-\s*\d{1,2}$/;
const regexTemperaments = /^(?:\b\w{3}\b(?:, )?)+$/;

const validation = (inputs, errors, setErrors) => {
  let newErrors = errors;

  const { name, weightMin, weightMax, heightMin, heightMax, life_span, temperaments } = inputs;

  if (name) newErrors.name = "El name es requerido";

  if (weightMin > 50 || weightMin < 1)
    newErrors.weightMin = "El weightMin es invalido";
  else newErrors.weightMin = "";
  if (weightMax > 80 || weightMax < 2)
    newErrors.weightMax = "El weightMax es invalido";
  else newErrors.weightMax = "";

  if (heightMin > 90 || heightMin < 1)
    newErrors.heightMin = "El heightMin es invalido";
  else newErrors.heightMin = "";
  if (heightMax > 150 || heightMax < 1)
    newErrors.heightMax = "El heightMax es invalido";
  else newErrors.heightMax = "";

  if (life_span && !regexlife_span.test(life_span))
    newErrors.life_span =
      "El life_span es invalido debe tener formato 'xx - xx'";
  else newErrors.life_span = "";

  if (temperaments && !regexTemperaments.test(temperaments))
    newErrors.temperaments =
      "El temperaments es invalido debe tener formato 'xxx' o 'xxxx, xxxx, xxxx'";
  else newErrors.life_span = "";

  setErrors(newErrors);
};
export default validation;
