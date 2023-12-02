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



const dogObj = (dog) => {

  return {
    id: dog.id,
    name: dog.name,
    weightMin: Number(dog.weight.metric.split("-")[0]),
    weightMax: Number(dog.weight.metric.split("-")[1]),
    heightMin: Number(dog.height.metric.split("-")[0]),
    heightMax: Number(dog.height.metric.split("-")[1]),
    life_span: dog.life_span,
    reference_image_id: dog.reference_image_id,
    temperament: dog.temperament,
  };
};

const dogObjDb = (dog) => {
  return {
    id: dog.id,
    name: dog.name,
    weightMin: Number(dog.weight.metric.split("-")[0]),
    weightMax: Number(dog.weight.metric.split("-")[1]),
    heightMin: Number(dog.height.metric.split("-")[0]),
    heightMax: Number(dog.height.metric.split("-")[1]),
    life_span: dog.life_span,
    reference_image_id: dog.reference_image_id,
    temperament: dog? dog.Temperaments.map((temp) => temp.name).join(', ') : "",
  };
}


module.exports = {
  dogObj,
  dogObjDb,
};
