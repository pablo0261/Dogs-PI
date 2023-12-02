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

const { URL_IMG } = process.env;

const dogObj = (dog) => {
  const imageUrl = `${URL_IMG}/${dog.reference_image_id}.jpg`;

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
//req imagen api ==> https://cdn2.thedogapi.com/images/
//imagen modelo vacio ==> https://www.shutterstock.com/image-vector/dog-silhouette-vector-on-white-260nw-2383086853.jpg

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
    temperament: dog? dog.Temperaments.map((temp) => temp.name).join(', ') : "",
    reference_image_id: imageUrl,
  };
}


module.exports = {
  dogObj,
  dogObjDb,
};
