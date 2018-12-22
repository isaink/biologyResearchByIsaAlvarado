const { db } = require('./connection.js');  //connecting to the database

// GET /animals: Get all animals.
const getAnimals = (req, res, next) => {
  db.any('SELECT * FROM animals')
  .then((animals) => {
    res.status(200).json({
      status: 'Success',
      message: 'Retrieving all animals',
      body: animals
    })
  }).catch(err => {
    console.log("Error retrieving animals: ", err)
    return next(err)
  })
};
// GET /animals/:id: Get single animal.
const getSingleAnimal = (req, res, next) => {
  const aId = Number(req.params.id);
  db.one('SELECT * FROM animals WHERE id=$1', [aId])
  .then((animals) => {
    res.status(200).json({
      status: 'Success',
      message: 'Got a single Animal',
      body: animals
    })
  }).catch(err => {
    console.log("Error retrieving a single animal: ", err)
    return next(err)
  })
};
// POST /animals: Add new animal.
const addAnimal = (req, res, next) => {
  db.none('INSERT INTO animals(id, species_id, nickname) VALUES(${id}, ${species_id}, ${nickname})', req.body)
  .then(() => {
    res.status(200).json({
      status: 'Success',
      message: 'New animal added'
    })
  }).catch(err => {
    console.log("Error adding a new animal: ", err)
    return next(err)
  })
};
// PATCH /animals/:id: Update single animal.
const updateAnimal = (req, res, next) => {
  db.none('UPDATE animals SET species_id=${species_id}, nickname=${nickname} WHERE id=${id}', {
    species_id: Number(req.body.species_id),
    nickname: req.body.nickname,
    id: Number(req.params.id)
  })
  .then(() => {
    res.status(200).json({
      status: 'Success',
      message: 'Animal Updated'
    })
  }).catch(err => {
    console.log("Error updating a new animal: ", err)
    return next(err)
  })
};
// DELETE /animals/:id: Delete single animal.
const deleteAnimal = (req, res, next) => {
  let aId = parseInt(req.params.id);
  db.result('DELETE FROM animals WHERE id=$1', aId)
  .then(() => {
    res.status(200).json({
      status: 'Success',
      message: 'Animal Deleted'
    })
  }).catch(err => {
    console.log("Error deleting researcher: ", err)
    return next(err);
  })
};

module.exports = { getAnimals, getSingleAnimal, addAnimal, updateAnimal, deleteAnimal }
