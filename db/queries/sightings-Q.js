const { db } = require('./connection.js');  //connecting to the database

// GET /sightings: Get all sightings.
const getAllSightings = (req, res, next) => {
  db.any('SELECT * FROM sightings')
  .then((sight) => {
    res.status(200).json({
      status: 'Success',
      message: 'Retrieving all sightings',
      body: sight
    })
  }).catch(err => {
    console.log("Error retrieving all sightings: ", err)
    return next(err)
  })
};
// GET /sightings/species/:id: Get all sightings of a specific species.
const getSightOnSpecie = (req, res, next) => {
  db.any('SELECT * FROM sightings JOIN species ON sightings.species_id = species.id WHERE species_id=${id}', {
    id: req.params.id
  }).then((sight) => {
    res.status(200).json({
      status: 'Success',
      message: 'Got all sightings On this species',
      body: sight
    })
  }).catch(err => {
    console.log("Error retrieving all sightings on this species: ", err)
    return next(err)
  })
};
// GET /sightings/researchers/:id: Get all sightings for a specific researcher.
const getSightOnResearcher = (req, res, next) => {
  db.any('SELECT * FROM sightings JOIN researchers ON researchers.id = researcher_id WHERE researcher_id=${id}', {
    id: req.params.id
  }).then((sight) => {
    res.status(200).json({
      status: 'Success',
      message: 'Got all sightings On researcher',
      body: sight
    })
  }).catch(err => {
    console.log("Error retrieving all sightings on researcher: ", err)
    return next(err)
  })
};
// GET /sightings/habitats/:id: Get all sightings for a specific habitat.
const getSightOnHabitat = (req, res, next) => {
  db.any('SELECT * FROM sightings JOIN habitats ON habitats.id = sightings.habitat_id WHERE habitat_id=${id}', {
    id: req.params.id
  }).then((sight) => {
    res.status(200).json({
      status: 'Success',
      message: 'Got all sightings On habitat',
      body: sight
    })
  }).catch(err => {
    console.log("Error retrieving all sightings on habitat: ", err)
    return next(err)
  })
}
// POST /sightings: Add new sighting.
const addSightings = (req, res, next) => {
  db.none('INSERT INTO sightings(id, researcher_id, species_id, habitat_id) ' +
  'VALUES (${id}, ${researcher_id}, ${species_id}, ${habitat_id})', req.body)
  .then(() => {
    res.status(200).json({
      status: 'Success',
      message: 'Added new sighting',
      // body: sight
    })
  }).catch(err => {
    console.log("Error adding new sightings: ", err)
    return next(err)
  })
};
// DELETE /sightings/:id: Delete single sighting.
const deleteSightings = (req, res, next) => {
  let sigId = parseInt(req.params.id);
  db.result('DELETE FROM sightings WHERE id=$1', sigId)
  .then(() => {
    res.status(200).json({
      status: 'Success',
      message: 'Sighting Deleted',
    })
  }).catch(err => {
    console.log("Error deleting sighting: ", err)
    return next(err)
  })
};

module.exports = { getAllSightings, getSightOnSpecie, getSightOnResearcher, getSightOnHabitat, addSightings, deleteSightings }
