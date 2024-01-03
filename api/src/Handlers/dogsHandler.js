const {
  getAllDogs,
  getDogByIdFromApi,
  getDogByIdFromDb,
  createDogDB,
} = require("../Controllers/dogController");

const getDogsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const allDogs = await getAllDogs();
    if (name) {
      if (name.length >= 3) {
        const dogsFound = allDogs.filter((dog) =>
          dog.name.toLowerCase().includes(name.toLowerCase())
        );
        if (dogsFound.length > 0) {
          return res.status(200).json(dogsFound);
        } else {
          return res
            .status(404)
            .json(`We couldn't find breeds with the name '${name}'`);
        }
      } else {
        return res.status(400).send("The name must have at least 3 letters");
      }
    } else {
      return res.status(200).json(allDogs);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getDogByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    let result;
    if (!isNaN(id)) {
      result = await getDogByIdFromApi(id);
      if (result) {
        return res.status(200).json([result]);
      } else {
        return res
          .status(400)
          .send(`We couldn't find breeds with the ID '${id}'`);
      }
    } else {
      result = await getDogByIdFromDb(id);
      if (!result) {
        return res
          .status(404)
          .send(`We couldn't find breeds with the ID '${id}'`);
      }
      res.status(200).json([result]);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postDogHandler = async (req, res) => {
  const {
    reference_image_id,
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_span,
    temperaments,
  } = req.body;

  try {
    const response = await createDogDB({
      reference_image_id,
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      temperaments,
    });
    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDogsHandler,
  getDogByIdHandler,
  postDogHandler,
};
