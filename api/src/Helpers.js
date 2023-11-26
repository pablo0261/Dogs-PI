

const dogObj = (dog) => {
  return {
    id: dog.id,
    reference_image_id: dog.reference_image_id,
    name: dog.name,
    height: dog.height.metric,
    weight: dog.weight.metric,
    life_span: dog.life_span,
  };
};


module.exports = {
    dogObj,
}