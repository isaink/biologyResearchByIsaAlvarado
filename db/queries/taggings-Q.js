const { db } = require('./connection.js');  //connecting to the database

// GET /taggings: Get all taggings.
const getAllTaggings = (req, res, next) => {
  db.any('SELECT * FROM taggings')
  .then((tag) => {
    res.status(200).json({
      status: 'Success',
      message: 'Retrieving all Taggings',
      body: tag
    })
  }).catch(err => {
    console.log("Error retrieving taggings: ", err)
    return next(err)
  })
};
// GET /taggings/:id: Get single tagging.
const getSingleTagging = (req, res, next) => {
  const tId = parseInt(req.params.id);
  db.one('SELECT * FROM taggings WHERE id=$1', [tId])
  .then((tag) => {
    res.status(200).json({
      status: 'Success',
      message: 'Got one Tag',
      body: tag
    })
  }).catch(err => {
    console.log("Error retrieving taggings: ", err)
    return next(err)
  })
};
// AS tag_performed_by
// GET /taggings/researchers/:id: Get all taggings performed by a specific researcher.
const getTagResearcher = (req, res, next) => {

  //This works in PSequel but not here ATOM... is to show the animals values too...
        // SELECT name AS researcher, job_title AS job_role, animal_id, nickname AS animal_Nickname,
        // COUNT (taggings.researcher_id) AS total_Performed
        // FROM taggings
        // JOIN researchers
        // ON taggings.researcher_id  = researchers.id
        // JOIN animals
        // ON taggings.animal_id = animals.id
        // WHERE researcher_id= 2
        // GROUP BY researchers.name, researchers.job_title, taggings.animal_id, animals.nickname

  db.any('SELECT name AS researcher, job_title AS job_role, animal_id, COUNT (taggings.researcher_id) AS performed_by_Researcher FROM taggings ' +
  ' JOIN researchers ON taggings.researcher_id  = researchers.id WHERE researcher_id=${id} GROUP BY researchers.name, researchers.job_title, taggings.animal_id', {
    id: req.params.id
  }).then((tag) => {
    res.status(200).json({
      status: 'Success',
      message: 'Got all Taggings performed by Researchers',
      body: tag
    })
  }).catch(err => {
    console.log("Error retrieving taggings performed by Researchers: ", err)
    return next(err)
  })
};
// GET /taggings/animals/:id: Get all taggings performed on a specific animal.
const getTagAnimal = (req, res, next) => {
  db.any('SELECT nickname AS animal_Nickname, researcher_id, animal_id, COUNT (animal_id) AS performed_On_This_Animal ' +
  'FROM taggings JOIN animals ON taggings.animal_id  = animals.id WHERE animal_id=${id} GROUP BY animal_Nickname, taggings.researcher_id, taggings.animal_id', {
    id: req.params.id
  })
  .then((tag) => {
    res.status(200).json({
      status: 'Success',
      message: 'Got all taggings performed on Animals',
      boby: tag
    })
  }).catch(err => {
    console.log("Error retrieving taggings performed on Animals: ", err)
    return next(err)
  })
};
// POST /taggings: Add new tagging.
const addTag = (req, res, next) => {
  db.none('INSERT INTO taggings(id, animal_id, researcher_id) VALUES(${id}, ${animal_id}, ${researcher_id})', req.body)
  .then(() => {
    res.status(200).json({
      status: 'Success',
      message: 'New Tagging added',
    })
  }).catch(err => {
    console.log("Error retrieving a new tagging: ", err)
    return next(err)
  })
}

module.exports = { getAllTaggings, getSingleTagging, getTagResearcher, getTagAnimal, addTag  }
