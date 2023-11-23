

const getAllDogsHandler = (req, res) => {
    res.status(200).send("Aqui obtengo el arr de obj con las razas de perros")
}

const getDogByIdHandler = (req, res) => {
    const {idRaza} = req.params;
    res.status(200).send(`Aqui obtengo el obj con la
    raza de perro con id ${idRaza}`)
}

const getDogsByNameHandler = (req, res) => {
    const nameQuery = req.query.name || '';
    res.status(200).send("Aqui obtengo las razas que coinciden con el nombre enviado por query")
}

const postDogHandler = (req, res) => {
    const {name, breed, age} = req.body;//!verificar si es el contenido que quiero enviar
    res.status(200).send("Esta ruta recibirá los datos necesarios para crear un nuevo perro")
}

module.exports= {
    getAllDogsHandler,
    getDogByIdHandler,
    getDogsByNameHandler,
    postDogHandler
}