const { db } = require('./connection.js'); //connecting to the database

// GET /researchers: Get all researchers
const getResearchers = (req, res, next) => {
  db.any('SELECT * FROM researchers')
  .then((researchers) => {
    res.status(200).json({
        status: 'Success',
        message: 'Retrieving all researchers',
        body: researchers
    })
  })
  .catch((err) => {
    console.log("Error retrieving all researchers: ", err)
    return next(err);
  })
};
// GET /researchers/:id: Get single researcher.
const getSingleResearcher = (req, res, next) => {
  let rId = parseInt(req.params.id);
  db.one('SELECT * FROM researchers WHERE id=$1', [rId])
  .then(researcher => {
    res.status(200).json({
        status: 'Success',
        message: 'Got a single researcher',
        body: researcher
    })
  }).catch(err => {
  console.log("Error retrieving all users: ", err)
  return next(err);
  })
};
// POST /researchers: Add new researcher.
const addResearcher = (req, res, next) => {
  req.body.job_title = req.body.job_title ? req.body.job_title : null; // If the researcher doesn't have job_title...
  db.none('INSERT INTO researchers(id, name, job_title) VALUES(${id}, ${name}, ${job_title})', req.body)
  .then(() => {
    res.status(200)
      .json({
        status: 'success',
        message: "ADDED a new Researcher"
      })
  })
  .catch(err => {
    console.log("Error adding researcher: ", err)
    return next(err);
  })
};
// PATCH /researchers/:id: Update single researcher.
const updateResearcher = (req, res, next) => {
  req.body.job_title = req.body.job_title ? req.body.job_title : null; // If the researcher doesn't have job_title...
  db.none('UPDATE researchers SET name=${name}, job_title=${job_title} WHERE id=${id}', {
    name: req.body.name,
    job_title: req.body.job_title,
    id: Number(req.params.id)
  })
  .then(() => {
    res.status(200).json({
      status: 'Success',
      message: 'Research Updated'
    })
  })
  .catch(err => {
    console.log("Error updating researcher: ", err)
    return next(err);
  })
};
// DELETE /researchers/:id: Delete single researcher.
const deleteResearcher = (req, res, next) => {
  let rId = parseInt(req.params.id);
  db.result('DELETE FROM researchers WHERE id=$1', rId)
  .then((researcher) => {
    res.status(200).json({
      status: 'Success',
      message: 'Researcher Deleted'
    })
  }).catch(err => {
    console.log("Error deleting researcher: ", err)
    return next(err);
  })
};

module.exports = { getResearchers, getSingleResearcher, addResearcher, updateResearcher, deleteResearcher }
