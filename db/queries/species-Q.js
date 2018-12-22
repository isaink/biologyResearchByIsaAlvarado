const { db } = require('./connection.js');

// GET /species: Get all species.
const getSpecies = (req, res, next) => {
  db.any('SELECT * FROM species')
  .then((species) => {
    res.status(200).json({
      status: 'Success',
      message: 'Retrieving all Species',
      body: species
    })
  }).catch(err => {
    console.log("Error retrieving species: ", err)
    return next(err)
  })
};
// GET /species/:id: Get single species.
const getSingleSpecies = (req, res, next) => {
  const sId = Number(req.params.id)
  db.one('SELECT * FROM species WHERE id=$1', [sId])
  .then((species) => {
    res.status(200).json({
      status: 'Success',
      message: 'Got a single Species',
      body: species
    })
  }).catch(err => {
    console.log("Error retrieving Specie: ", err)
    return next(err)
  })
};
// POST /species: Add new species.
const addSpecies = (req, res, next) => {
  db.any('SELECT * FROM species WHERE id=${id}', {
    id: Number(req.body.id),
    // mammal: req.body.mammal
  }).then((species) => {
    res.status(200).json({
      status: 'Success',
      message: 'Species added',
    })
  }).catch(err => {
    console.log("Error adding Species: ", err)
    return next(err)
  })
};
module.exports =  { getSpecies, getSingleSpecies, addSpecies }
