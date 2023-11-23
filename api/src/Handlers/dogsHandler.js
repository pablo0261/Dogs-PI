const getDogsHandler = (req, res) => {
  const { name } = req.query;

  name
    ? res.status(200).send(`Aqui obtengo las razas que coinciden con el ${nameQuery} enviado por query`)
    : res.status(200).send("Aqui obtengo el arr de obj con todas las razas de perros");
};

const getDogByIdHandler = (req, res) => {
  const { idRaza } = req.params;
  res.status(200).send(`Aqui obtengo el obj con la
    raza de perro con id ${idRaza}`);
};

const postDogHandler = (req, res) => {
  const { ID, Imagen, Nombre, Altura, Peso, AnosDeVida } = req.body; //!verificar si es el contenido que quiero enviar
  res
    .status(200)
    .send("Esta ruta recibirá los datos necesarios para crear un nuevo perro");
};

module.exports = {
  getDogsHandler,
  getDogByIdHandler,
  postDogHandler,
};
