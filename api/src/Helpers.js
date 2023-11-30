

const dogObj = (dog) => {
  const height = dog.height ? dog.height.metric : null;
  const weight = dog.weight ? dog.weight.metric : null;

  return {
    id: dog.id,
    reference_image_id: dog.reference_image_id,
    name: dog.name,
    height: height,
    weight: weight,
    life_span: dog.life_span,
    temperament: dog.temperament,
  };
};


module.exports = {
    dogObj,
}