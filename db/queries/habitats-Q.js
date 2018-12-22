const { db } = require('./connection.js');  //connecting to the database

// GET /habitats: Get all habitats.
const getAllHabitats = (req, res, next) => {
  db.any('SELECT * FROM habitats')
  .then((habitats) => {
    res.status(200).json({
      status: 'Success',
      message: 'Retrieving all habitats',
      body: habitats
    })
  }).catch(err => {
    console.log("Error retrieving animals: ", err)
    return next(err)
  })
};
// GET /habitats/:id: Get single habitat.
const getSingleHabitats = (req, res, next) => {
  db.one('SELECT * FROM habitats WHERE id=${id}', {
    id: req.params.id
  }).then((habitat) => {
    res.status(200).json({
      status: 'Success',
      message: 'Got one habitat',
      body: habitat
    })
  }).catch(err => {
    console.log("Error retrieving one animal: ", err)
    return next(err)
  })
};
// POST /habitats: Add new habitat.
const addHabitat = (req, res, next) => {
  db.none('INSERT INTO habitats(id, category) VALUES(${id}, ${category})', req.body)
  .then(() => {
    res.status(200).json({
      status: 'Success',
      message: 'New Habitat Added'
    })
  }).catch(err => {
    console.log("Error retrieving one animal: ", err)
    return next(err)
  })
};

module.exports = { getAllHabitats, getSingleHabitats, addHabitat }
