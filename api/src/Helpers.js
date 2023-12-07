// const dogProperties = {
//       id,
//       name,
//       weightMin,
//       weightMax,
//       heightMin,
//       heightMax,
//       life_span,
//       reference_image_id,
//       temperament,
// };

const { URL_IMG, API_KEY } = process.env;

const dogObj = (dog) => {
  const imageUrl = `${URL_IMG}/${dog.reference_image_id}.jpg?api_key=${API_KEY}`;

  return {
    id: dog.id,
    name: dog.name,
    weightMin: Number(dog.weight.metric.split("-")[0]),
    weightMax: Number(dog.weight.metric.split("-")[1]),
    heightMin: Number(dog.height.metric.split("-")[0]),
    heightMax: Number(dog.height.metric.split("-")[1]),
    life_span: dog.life_span,
    temperament: dog.temperament,
    reference_image_id: imageUrl, 
  };
};

const dogObjDb = (dog) => {
  const imageUrl = `${URL_IMG}/${dog.reference_image_id}.jpg`;

  return {
    id: dog.id,
    name: dog.name,
    weightMin: Number(dog.weight.metric.split("-")[0]),
    weightMax: Number(dog.weight.metric.split("-")[1]),
    heightMin: Number(dog.height.metric.split("-")[0]),
    heightMax: Number(dog.height.metric.split("-")[1]),
    life_span: dog.life_span,
    temperament: dog.Temperaments ? dog.Temperaments.map((temp) => temp.name).join(', ') : "",
    reference_image_id: imageUrl,
  };
}


module.exports = {
  dogObj,
  dogObjDb,
};
